import axios, {
  type AxiosError,
  type AxiosInstance,
  type CreateAxiosDefaults,
  type InternalAxiosRequestConfig,
} from "axios";

export class ApiError extends Error {
  constructor(
    public readonly status: number | undefined,
    public readonly data: unknown,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function authFailureMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

export function isServiceUnavailableError(error: unknown): boolean {
  return error instanceof ApiError && error.status === 503;
}

function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.message ??
      "Request failed";
    return new ApiError(
      axiosError.response?.status,
      axiosError.response?.data,
      message,
    );
  }
  if (error instanceof Error) {
    return new ApiError(undefined, undefined, error.message);
  }
  return new ApiError(undefined, undefined, "Unknown error");
}

function attachErrorInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(toApiError(error)),
  );
  return instance;
}

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshRequest: Promise<unknown> | null = null;

function isAuthRefreshRequest(config: InternalAxiosRequestConfig | undefined) {
  return config?.url?.includes("/auth/refresh") ?? false;
}

function normalizeToken(token: string | undefined): string | undefined {
  if (!token || token === "undefined") return undefined;
  return token;
}

async function getAuthToken(): Promise<string | undefined> {
  if (typeof window === "undefined") {
    const { auth } = await import("@/lib/auth");
    const session = await auth();
    return normalizeToken(session?.accessToken);
  }
  const { getSession } = await import("next-auth/react");
  const session = await getSession();
  return normalizeToken(session?.accessToken);
}

const baseConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "",
  /** Send cookies for refresh / logout / cookie-based session with the API. */
  withCredentials: true,
  headers: {
    Accept: "application/json, multipart/form-data",
  },
} satisfies CreateAxiosDefaults;

export const publicApi = attachErrorInterceptor(axios.create(baseConfig));

export const authApi = axios.create(baseConfig);

authApi.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

authApi.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as RetriableRequestConfig | undefined;
    const shouldRefresh =
      error.response?.status === 401 &&
      originalRequest != null &&
      !originalRequest._retry &&
      !isAuthRefreshRequest(originalRequest);

    if (!shouldRefresh) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshRequest ??= publicApi.post("/auth/refresh").finally(() => {
        refreshRequest = null;
      });
      await refreshRequest;
      return authApi(originalRequest);
    } catch (refreshError) {
      if (typeof window !== "undefined") {
        const { signOut } = await import("next-auth/react");
        await signOut({ callbackUrl: "/login" });
      }
      return Promise.reject(refreshError);
    }
  },
);

attachErrorInterceptor(authApi);
