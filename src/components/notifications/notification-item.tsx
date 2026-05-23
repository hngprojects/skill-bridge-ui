import { Notification } from "@/constants/notifications";
import Image from "next/image";

const NotificationItem = ({ notification }: { notification: Notification }) => {
  return (
    <li className="border border-[#DBDBDB] p-3 items-start rounded-xl md:rounded-2xl md:p-6 flex flex-row gap-x-3 md:gap-x-6">
      <Image
        src={"/assets/icons/notification-bell-active.svg"}
        height={56}
        width={56}
        alt="Notification bell icon"
      />
      <div className="flex flex-col gap-y-3 md:gap-y-6">
        <p className="text-sm md:text-lg font-normal">
          <span className="font-bold">{notification.boldText}</span>{" "}
          {notification.normalText}
        </p>
        <p className="text-[#757575] font-semibold text-base md:text-lg">
          {notification.time} ago
        </p>
      </div>
    </li>
  );
};

export default NotificationItem;
