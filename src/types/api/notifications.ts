/**
 * Which notifications surface to talk to. Selects the base path
 * ("/talent/notifications" vs "/employer/notifications") and the cache
 * namespace so the two never cross-pollute.
 */
type NotificationRole = "talent" | "employer";

type NotificationApiItem = {
  id: string;
  type: string;
  title: string;
  body: string;
  data: Record<string, unknown>;
  isRead: boolean;
  readAt: Record<string, unknown> | null;
  createdAt: string;
};

type NotificationsListResponseData = {
  items: NotificationApiItem[];
};

type UnreadCountResponseData = {
  count: number;
};

export type {
  NotificationApiItem,
  NotificationRole,
  NotificationsListResponseData,
  UnreadCountResponseData,
};
