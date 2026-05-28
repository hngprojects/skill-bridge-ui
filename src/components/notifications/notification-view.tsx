"use client";
import { useState, useEffect } from "react";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
} from "@/actions/notifications";
import type { NotificationApiItem } from "@/types/api/notifications";
import { notificationTabs, NotificationTab } from "@/constants/notifications";
import NotificationItem from "./notification-item";
import NotificationTabButton from "./notification-tab-button";
import { appToast } from "@/lib/toast";

const NotificationView = () => {
  const [activeTab, setActiveTab] = useState<NotificationTab>("All");
  const [notifications, setNotifications] = useState<NotificationApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setHasError(false);
        const [res, countRes] = await Promise.all([
          getNotifications(),
          getUnreadCount(),
        ]);
        setNotifications(res.items);
        setUnreadCount(countRes.count);
      } catch {
        setHasError(true);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [retryCount]);

  const handleMarkAsRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
    setUnreadCount((c) => Math.max(0, c - 1));
    try {
      await markAsRead(id);
    } catch {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: false } : n)),
      );
      setUnreadCount((c) => c + 1);
      appToast.error("Failed to mark notification as read.");
    }
  };

  const handleMarkAllAsRead = async () => {
    const previous = notifications;
    const previousCount = unreadCount;
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
    try {
      await markAllAsRead();
    } catch {
      setNotifications(previous);
      setUnreadCount(previousCount);
      appToast.error("Failed to mark all notifications as read.");
    }
  };

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
            onClick={handleMarkAllAsRead}
            className="text-sm font-medium text-[#34A853] underline underline-offset-2 hover:opacity-75 transition-opacity"
          >
            Mark all as read
          </button>
        )}
      </div>

      {loading ? (
        <p className="body text-muted-foreground">Loading notifications...</p>
      ) : hasError ? (
        <div className="flex flex-col gap-y-2">
          <p className="body text-destructive">
            Couldn&apos;t load notifications. Please try again.
          </p>
          <button
            onClick={() => setRetryCount((c) => c + 1)}
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
              onMarkRead={() => handleMarkAsRead(notification.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationView;
