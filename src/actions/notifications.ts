import { authApi } from "@/lib/api";
import type { ApiEnvelope } from "@/types/api/common";
import type {
  NotificationApiItem,
  NotificationRole,
  NotificationsListResponseData,
  UnreadCountResponseData,
} from "@/types/api/notifications";
import { unwrapData } from "./utils";

const NOTIFICATIONS_BASE_PATH: Record<NotificationRole, string> = {
  talent: "/talent/notifications",
  employer: "/employer/notifications",
};

/**
 * Raw shape returned by the employer notifications endpoint — different from
 * the talent shape
 **/
type RawEmployerNotificationItem = {
  notification_id: string;
  type: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: {
    entity_id: string | null;
    entity_type: string;
  } | null;
};

type RawEmployerNotificationsResponse = {
  items: RawEmployerNotificationItem[];
};

function mapEmployerItem(
  item: RawEmployerNotificationItem,
): NotificationApiItem {
  return {
    id: item.notification_id,
    type: item.type,
    // Employer payloads carry a single `message` field — no separate title.
    // We surface it as the body so the bold prefix on the card stays empty.
    title: "",
    body: item.message,
    data: item.link ? { link: item.link } : {},
    isRead: item.read,
    readAt: null,
    createdAt: item.timestamp,
  };
}

/**
 * Backend hasn't committed to a casing for the talent endpoint, so this
 * accepts either camelCase or snake_case for every field and normalizes to
 * the shape the UI relies on. Without this, fields silently come through as
 * `undefined` (e.g. `isRead`/`createdAt` when the API responds snake_case),
 * which reads as "always unread" and "always just now" in the UI.
 */
type RawTalentNotificationItem = Partial<NotificationApiItem> & {
  id: string;
  is_read?: boolean;
  read_at?: Record<string, unknown> | null;
  created_at?: string;
  message?: string;
};

type RawTalentNotificationsResponse = {
  items: RawTalentNotificationItem[];
};

function mapTalentItem(item: RawTalentNotificationItem): NotificationApiItem {
  return {
    id: item.id,
    type: item.type ?? "",
    title: item.title ?? "",
    body: item.body ?? item.message ?? "",
    data: item.data ?? {},
    isRead: item.isRead ?? item.is_read ?? false,
    readAt: item.readAt ?? item.read_at ?? null,
    createdAt: item.createdAt ?? item.created_at ?? "",
  };
}

export async function getNotifications(
  role: NotificationRole,
  limit = 20,
): Promise<NotificationsListResponseData> {
  const basePath = NOTIFICATIONS_BASE_PATH[role];

  if (role === "employer") {
    const res = await authApi.get<
      ApiEnvelope<RawEmployerNotificationsResponse>
    >(basePath, { params: { limit } });
    const raw = unwrapData(res);
    return { items: (raw.items ?? []).map(mapEmployerItem) };
  }

  const res = await authApi.get<ApiEnvelope<RawTalentNotificationsResponse>>(
    basePath,
    { params: { limit } },
  );
  const raw = unwrapData(res);
  return { items: (raw.items ?? []).map(mapTalentItem) };
}

export async function getUnreadCount(
  role: NotificationRole,
): Promise<UnreadCountResponseData> {
  const res = await authApi.get<ApiEnvelope<{ unread_count: number }>>(
    `${NOTIFICATIONS_BASE_PATH[role]}/unread-count`,
  );
  const raw = unwrapData(res);
  return { count: raw.unread_count ?? 0 };
}

export async function markAllAsRead(role: NotificationRole): Promise<void> {
  await authApi.patch(`${NOTIFICATIONS_BASE_PATH[role]}/read-all`);
}

export async function markAsRead(
  role: NotificationRole,
  id: string,
): Promise<void> {
  await authApi.patch(
    `${NOTIFICATIONS_BASE_PATH[role]}/${encodeURIComponent(id)}/read`,
  );
}
