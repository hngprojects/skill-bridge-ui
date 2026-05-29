import { Notification } from "@/constants/notifications";
import Image from "next/image";

const RELATIVE_TIME_UNITS = [
  { label: "year", seconds: 60 * 60 * 24 * 365 },
  { label: "month", seconds: 60 * 60 * 24 * 30 },
  { label: "day", seconds: 60 * 60 * 24 },
  { label: "hour", seconds: 60 * 60 },
  { label: "minute", seconds: 60 },
] as const;

function formatRelativeTime(value: string) {
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) return "Just now";
  const elapsedSeconds = Math.max(
    0,
    Math.floor((Date.now() - parsedDate.getTime()) / 1000),
  );
  for (const unit of RELATIVE_TIME_UNITS) {
    const count = Math.floor(elapsedSeconds / unit.seconds);
    if (count >= 1) return `${count} ${unit.label}${count > 1 ? "s" : ""} ago`;
  }
  return "Just now";
}

type NotificationItemProps = {
  notification: Notification;
  isRead?: boolean;
  onMarkRead?: () => void;
};

const NotificationItem = ({
  notification,
  isRead = false,
  onMarkRead,
}: NotificationItemProps) => {
  return (
    <li
      onClick={() => {
        if (!isRead && onMarkRead) onMarkRead();
      }}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !isRead && onMarkRead) {
          if (e.key === " ") e.preventDefault();
          onMarkRead();
        }
      }}
      role={!isRead ? "button" : undefined}
      tabIndex={!isRead ? 0 : undefined}
      aria-label={!isRead ? "Mark notification as read" : undefined}
      className={`flex flex-row items-start gap-x-4 rounded-xl border px-4 py-4 md:rounded-xl md:px-5 md:py-5 transition-colors ${
        isRead
          ? "border-[#D9D9D9] bg-[#FAFAFA] cursor-default"
          : "border-[#34A853] bg-white cursor-pointer hover:bg-green-50"
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
          <span className="font-bold">{notification.boldText}</span>{" "}
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
