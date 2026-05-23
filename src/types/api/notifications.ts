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
  NotificationsListResponseData,
  UnreadCountResponseData,
};
