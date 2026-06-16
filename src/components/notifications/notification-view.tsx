"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { notificationTabs, NotificationTab } from "@/constants/notifications";
import NotificationItem from "./notification-item";
import NotificationTabButton from "./notification-tab-button";
import {
  useNotifications,
  useUnreadCount,
  useMarkAsRead,
  useMarkAllAsRead,
} from "@/hooks/api";
import type {
  NotificationApiItem,
  NotificationRole,
} from "@/types/api/notifications";

type NotificationViewProps = {
  role: NotificationRole;
};

/** Pulls an offer id off the notification's freeform `data` bag. Backend
 *  hasn't committed to a key yet, so we read either `offerId` or `offer_id`
 *  defensively. */
function extractOfferId(data: NotificationApiItem["data"]): string | undefined {
  const candidate = data?.offerId ?? data?.offer_id;
  return typeof candidate === "string" && candidate.length > 0
    ? candidate
    : undefined;
}

/** Best-effort target route per notification. Returns null when there's
 *  nothing useful to navigate to — the item then falls back to just
 *  marking-read on click.
 *
 *  Today this only routes offer-related notifications; broader heuristics
 *  (by `type`) can be added once the backend documents the type vocabulary. */
function notificationHref(
  notification: NotificationApiItem,
  role: NotificationRole,
): string | null {
  const offerId = extractOfferId(notification.data);
  const looksOfferRelated =
    Boolean(offerId) ||
    notification.type?.toLowerCase().includes("offer") === true;

  if (!looksOfferRelated) return null;

  if (role === "talent") {
    // Encode defensively — `offerId` is read from a freeform notification
    // payload, so an unexpected value shouldn't reshape the route.
    return offerId ? `/t/offers/${encodeURIComponent(offerId)}` : "/t/offers";
  }
  // Employer side has no per-offer detail page yet — drop into the offers
  // tab of /e/shortlist so the user can still find what changed.
  return "/e/shortlist";
}

const NotificationView = ({ role }: NotificationViewProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<NotificationTab>("All");

  const {
    data: notificationsData,
    isLoading,
    isError,
    refetch,
  } = useNotifications(role);
  const { data: unreadData } = useUnreadCount(role);
  const { mutate: markAsRead } = useMarkAsRead(role);
  const { mutate: markAllAsRead } = useMarkAllAsRead(role);

  const notifications = notificationsData?.items ?? [];
  const unreadCount = unreadData?.count ?? 0;

  const filtered =
    activeTab === "Unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  return (
    <div className="flex flex-col gap-y-8 rounded-xl border border-[#D9D9D9] bg-[#FAFAFA] p-4 md:rounded-2xl md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-x-3">
          {notificationTabs.map((tab) => (
            <NotificationTabButton
              key={tab}
              tab={tab}
              activeTab={activeTab}
              setTab={setActiveTab}
            />
          ))}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={() => markAllAsRead()}
            className="text-sm font-medium text-[#34A853] underline underline-offset-2 hover:opacity-75 transition-opacity"
          >
            Mark all as read
          </button>
        )}
      </div>

      {isLoading ? (
        <p className="body text-muted-foreground">Loading notifications...</p>
      ) : isError ? (
        <div className="flex flex-col gap-y-2">
          <p className="body text-destructive">
            Couldn&apos;t load notifications. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            className="body text-muted-foreground underline w-fit"
          >
            Retry
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <p className="body text-muted-foreground">No notifications yet.</p>
      ) : (
        <ul className="mb-4 flex flex-col gap-y-3">
          {filtered.map((notification) => {
            const href = notificationHref(notification, role);
            return (
              <NotificationItem
                key={notification.id}
                notification={{
                  boldText: notification.title,
                  normalText: notification.body,
                  time: notification.createdAt,
                }}
                isRead={notification.isRead}
                onMarkRead={() => markAsRead(notification.id)}
                onActivate={href ? () => router.push(href) : undefined}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default NotificationView;
