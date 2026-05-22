/** HNG-style API envelope */
export type ApiEnvelope<T> = {
  status_code: number;
  message: string | null;
  data: T;
  meta?: unknown;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
};

export type HealthResponse = {
  status: string;
};

export type EmptyData = Record<string, never>;
