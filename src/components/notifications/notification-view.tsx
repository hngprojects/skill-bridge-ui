"use client";

import { useState } from "react";

import {
  NOTIFICATIONS_DUMMY_DATA,
  NotificationTab,
  notificationTabs,
} from "@/constants/notifications";
import NotificationItem from "./notification-item";
import NotificationTabButton from "./notification-tab-button";

const NotificationView = () => {
  const [activeTab, setActiveTab] = useState<NotificationTab>("All");
  return (
    <div className="border bg-[#FAFAFA] border-[#BDBDBD]  rounded-xl flex flex-col gap-y-5 md:gap-y-10 p-3 md:p-6 md:rounded-2xl">
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
      <ul className="flex flex-col gap-y-4 mb-6">
        {NOTIFICATIONS_DUMMY_DATA.map((notification, i) => (
          <NotificationItem
            notification={notification}
            key={i + notification.boldText}
          />
        ))}
      </ul>
    </div>
  );
};

export default NotificationView;
