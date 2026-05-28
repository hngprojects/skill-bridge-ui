"use client";
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

const NotificationView = () => {
  const [activeTab, setActiveTab] = useState<NotificationTab>("All");

  const {
    data: notificationsData,
    isLoading,
    isError,
    refetch,
  } = useNotifications();
  const { data: unreadData } = useUnreadCount();
  const { mutate: markAsRead } = useMarkAsRead();
  const { mutate: markAllAsRead } = useMarkAllAsRead();

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
          {filtered.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={{
                boldText: notification.title,
                normalText: notification.body,
                time: notification.createdAt,
              }}
              isRead={notification.isRead}
              onMarkRead={() => markAsRead(notification.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationView;
