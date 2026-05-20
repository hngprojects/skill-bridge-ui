export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

export const usersKeys = {
  all: ["users"] as const,
  lists: () => [...usersKeys.all, "list"] as const,
  list: (params?: { page?: number; limit?: number }) =>
    [...usersKeys.lists(), params ?? {}] as const,
  details: () => [...usersKeys.all, "detail"] as const,
  detail: (id: string) => [...usersKeys.details(), id] as const,
};

export const healthKeys = {
  all: ["health"] as const,
  check: () => [...healthKeys.all, "check"] as const,
};

export const assessmentKeys = {
  all: ["assessment"] as const,
  personalSession: () =>
    [...assessmentKeys.all, "personal", "session"] as const,
};
