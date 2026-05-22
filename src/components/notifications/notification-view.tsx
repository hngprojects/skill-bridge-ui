"use client";

import { useState, useEffect } from "react";
import { getNotifications } from "@/actions/notifications";
import type { NotificationApiItem } from "@/types/api/notifications";
import { notificationTabs, NotificationTab } from "@/constants/notifications";
import NotificationItem from "./notification-item";
import NotificationTabButton from "./notification-tab-button";

const NotificationView = () => {
  const [activeTab, setActiveTab] = useState<NotificationTab>("All");
  const [notifications, setNotifications] = useState<NotificationApiItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const res = await getNotifications();
        setNotifications(res.items);
      } catch {
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const filtered =
    activeTab === "Unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  return (
    <div className="border bg-[#FAFAFA] border-[#BDBDBD] rounded-xl flex flex-col gap-y-5 md:gap-y-10 p-3 md:p-6 md:rounded-2xl">
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
      {loading ? (
        <p className="body text-muted-foreground">Loading notifications...</p>
      ) : filtered.length === 0 ? (
        <p className="body text-muted-foreground">No notifications yet.</p>
      ) : (
        <ul className="flex flex-col gap-y-4 mb-6">
          {filtered.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={{
                boldText: notification.title,
                normalText: notification.body,
                time: notification.createdAt,
              }}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationView;
