import { Notification } from "@/constants/notifications";
import Image from "next/image";

import { formatRelativeTime } from "@/lib/format-date";

type NotificationItemProps = {
  notification: Notification;
  isRead?: boolean;
  onMarkRead?: () => void;
  /** Optional follow-up the parent runs after the item is clicked — typically
   *  a navigation. Item-level handler decides whether to mark-read first. */
  onActivate?: () => void;
};

const NotificationItem = ({
  notification,
  isRead = false,
  onMarkRead,
  onActivate,
}: NotificationItemProps) => {
  const isInteractive = Boolean(onActivate) || (!isRead && onMarkRead);

  const handleActivate = () => {
    if (!isRead && onMarkRead) onMarkRead();
    onActivate?.();
  };

  return (
    <li
      onClick={() => {
        if (isInteractive) handleActivate();
      }}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && isInteractive) {
          if (e.key === " ") e.preventDefault();
          handleActivate();
        }
      }}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={
        isInteractive
          ? !isRead
            ? "Open notification and mark as read"
            : "Open notification"
          : undefined
      }
      className={`flex flex-row items-start gap-x-4 rounded-xl border px-4 py-4 md:rounded-xl md:px-5 md:py-5 transition-colors ${
        isRead ? "border-[#D9D9D9] bg-[#FAFAFA]" : "border-[#34A853] bg-white"
      } ${
        isInteractive ? "cursor-pointer hover:bg-green-50" : "cursor-default"
      }`}
    >
      <Image
        src="/assets/icons/notification-bell-active.svg"
        height={48}
        width={48}
        alt="Notification bell icon"
        className={`shrink-0 ${isRead ? "opacity-40" : "opacity-100"}`}
      />
      <div className="flex flex-col gap-y-4 pt-1 flex-1">
        <p className="text-sm leading-5 font-normal text-foreground">
          {notification.boldText ? (
            <>
              <span className="font-bold">{notification.boldText}</span>{" "}
            </>
          ) : null}
          {notification.normalText}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-sm font-normal text-[#757575]">
            {formatRelativeTime(notification.time)}
          </p>
          {!isRead && (
            <span className="size-2 rounded-full bg-[#34A853] shrink-0" />
          )}
        </div>
      </div>
    </li>
  );
};

export default NotificationItem;
