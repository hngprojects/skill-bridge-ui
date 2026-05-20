"use client";

type GoogleCodeResponse = {
  code?: string;
  error?: string;
  error_description?: string;
};

type GoogleCodeClient = {
  requestCode: () => void;
};

type GoogleCodeClientConfig = {
  client_id: string;
  scope: string;
  ux_mode: "popup";
  redirect_uri: "postmessage";
  callback: (response: GoogleCodeResponse) => void;
  error_callback?: (error: unknown) => void;
};

type GoogleErrorResponse = {
  type?: string;
  message?: string;
};

declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: {
          initCodeClient: (config: GoogleCodeClientConfig) => GoogleCodeClient;
        };
      };
    };
  }
}

const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

let googleScriptPromise: Promise<void> | undefined;
let googleCodeClient: GoogleCodeClient | undefined;
let googleCodeClientPromise: Promise<GoogleCodeClient> | undefined;
let pendingCodeRequest:
  | {
      resolve: (code: string) => void;
      reject: (error: Error) => void;
    }
  | undefined;

function handleGoogleScriptLoadError(
  script: HTMLScriptElement,
  reject: (reason?: unknown) => void,
) {
  script.remove();
  googleScriptPromise = undefined;
  reject(new Error("Could not load Google auth."));
}

function googleAuthErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : undefined;
  const normalizedMessage = message?.toLowerCase();

  if (
    normalizedMessage?.includes("popup") &&
    normalizedMessage.includes("closed")
  ) {
    return "Google sign-in was cancelled. Please try again when you're ready.";
  }

  if (
    normalizedMessage?.includes("popup") &&
    (normalizedMessage.includes("blocked") ||
      normalizedMessage.includes("failed to open"))
  ) {
    return "Google sign-in popup was blocked. Please allow popups and try again.";
  }

  if (message) return message;

  if (typeof error === "object" && error !== null) {
    const googleError = error as GoogleErrorResponse;

    if (
      googleError.type === "popup_closed" ||
      googleError.type === "popup_closed_by_user"
    ) {
      return "Google sign-in was cancelled. Please try again when you're ready.";
    }

    if (googleError.type === "popup_failed_to_open") {
      return "Google sign-in popup was blocked. Please allow popups and try again.";
    }

    if (googleError.message) return googleError.message;
  }

  return "Google sign-in failed. Please try again.";
}

function loadGoogleScript() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google auth must run in the browser."));
  }

  if (window.google?.accounts?.oauth2) {
    return Promise.resolve();
  }

  googleScriptPromise ??= new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${GOOGLE_SCRIPT_SRC}"]`,
    );

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => handleGoogleScriptLoadError(existing, reject),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = GOOGLE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => handleGoogleScriptLoadError(script, reject);
    document.head.appendChild(script);
  });

  return googleScriptPromise;
}

function clientId() {
  const id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!id) {
    throw new Error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured.");
  }
  return id;
}

function googleOAuth2() {
  const oauth2 = window.google?.accounts?.oauth2;
  if (!oauth2) {
    throw new Error("Google auth is not available.");
  }
  return oauth2;
}

export async function prepareGoogleAuth(): Promise<GoogleCodeClient> {
  if (typeof window === "undefined") {
    throw new Error("Google auth must run in the browser.");
  }

  if (googleCodeClient) return googleCodeClient;

  googleCodeClientPromise ??= loadGoogleScript()
    .then(() => {
      const client = googleOAuth2().initCodeClient({
        client_id: clientId(),
        scope: "openid profile email",
        ux_mode: "popup",
        redirect_uri: "postmessage",
        callback: (response) => {
          const request = pendingCodeRequest;
          pendingCodeRequest = undefined;

          if (!request) return;

          if (response.code) {
            request.resolve(response.code);
            return;
          }

          request.reject(
            new Error(
              response.error_description ??
                response.error ??
                "Google sign-in was cancelled.",
            ),
          );
        },
        error_callback: (error) => {
          const request = pendingCodeRequest;
          pendingCodeRequest = undefined;
          request?.reject(new Error(googleAuthErrorMessage(error)));
        },
      });

      googleCodeClient = client;
      return client;
    })
    .catch((error) => {
      googleCodeClientPromise = undefined;
      throw error;
    });

  return googleCodeClientPromise;
}

export function requestGoogleAuthCode(): Promise<string> {
  if (pendingCodeRequest) {
    return Promise.reject(
      new Error("Google sign-in is already in progress. Please wait."),
    );
  }

  const client = googleCodeClient;
  if (!client) {
    void prepareGoogleAuth().catch(() => undefined);
    return Promise.reject(
      new Error("Google sign-in is still loading. Please try again."),
    );
  }

  return new Promise((resolve, reject) => {
    pendingCodeRequest = { resolve, reject };

    try {
      client.requestCode();
    } catch (error) {
      pendingCodeRequest = undefined;
      reject(new Error(googleAuthErrorMessage(error)));
    }
  });
}
