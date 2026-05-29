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
  session: (id: string) => [...assessmentKeys.all, "session", id] as const,
};

export const dashboardKeys = {
  all: ["dashboard"] as const,
  home: () => [...dashboardKeys.all, "home"] as const,
};

export const resourcesKeys = {
  all: ["resources"] as const,
  talent: () => [...resourcesKeys.all, "talent"] as const,
};

export const verifiedProfileKeys = {
  all: ["verified-profile"] as const,
  talent: () => [...verifiedProfileKeys.all, "talent"] as const,
};

export const talentSettingsKeys = {
  all: ["talent-settings"] as const,
  detail: () => [...talentSettingsKeys.all, "detail"] as const,
};

export const aiGuidanceReport = {
  all: ["ai-guidance-report"] as const,
export const notificationsKeys = {
  all: ["notifications"] as const,
  list: () => [...notificationsKeys.all, "list"] as const,
  unreadCount: () => [...notificationsKeys.all, "unread-count"] as const,
};
