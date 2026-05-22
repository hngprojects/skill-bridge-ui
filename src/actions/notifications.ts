import { authApi } from "@/lib/api";
import type { ApiEnvelope } from "@/types/api/common";
import type {
  NotificationsListResponseData,
  UnreadCountResponseData,
} from "@/types/api/notifications";
import { unwrapData } from "./utils";

export async function getNotifications(
  limit = 20,
): Promise<NotificationsListResponseData> {
  const res = await authApi.get<ApiEnvelope<NotificationsListResponseData>>(
    "/talent/notifications",
    { params: { limit } },
  );
  return unwrapData(res);
}

export async function getUnreadCount(): Promise<UnreadCountResponseData> {
  const res = await authApi.get<ApiEnvelope<UnreadCountResponseData>>(
    "/talent/notifications/unread-count",
  );
  return unwrapData(res);
}

export async function markAllAsRead(): Promise<void> {
  await authApi.patch("/talent/notifications/read-all");
}

export async function markAsRead(id: string): Promise<void> {
  await authApi.patch(`/talent/notifications/${encodeURIComponent(id)}/read`);
}
