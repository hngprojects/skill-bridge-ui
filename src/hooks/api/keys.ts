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

export const employerDashboardKeys = {
  all: ["employer-dashboard"] as const,
  home: () => [...employerDashboardKeys.all, "home"] as const,
};

export const employerDiscoveryKeys = {
  all: ["employer-discovery"] as const,
  savedLists: () => [...employerDiscoveryKeys.all, "saved"] as const,
  // Page/limit folded into the key so paginated requests cache independently.
  savedList: (params?: { page?: number; limit?: number }) =>
    [...employerDiscoveryKeys.savedLists(), params ?? {}] as const,
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
};

export const employerRolesKeys = {
  all: ["employer-roles"] as const,
  lists: () => [...employerRolesKeys.all, "list"] as const,
  catalogue: (params?: { page?: number; limit?: number }) =>
    [...employerRolesKeys.all, "catalogue", params ?? {}] as const,
};

export const notificationsKeys = {
  all: ["notifications"] as const,
  // Role-scoped so talent and employer caches stay isolated
  list: (role: "talent" | "employer") =>
    [...notificationsKeys.all, role, "list"] as const,
  unreadCount: (role: "talent" | "employer") =>
    [...notificationsKeys.all, role, "unread-count"] as const,
};
