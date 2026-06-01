import NotificationView from "@/components/notifications/notification-view";
import NotificationsHeader from "@/components/notifications/notifications-header";

const NotificationsPage = () => {
  return (
    <div className="mx-auto my-8 flex w-full max-w-[1400px] flex-col gap-y-6 px-4 sm:px-6 md:my-9 lg:px-8 2xl:px-0">
      <NotificationsHeader />
      <NotificationView />
    </div>
  );
};

export default NotificationsPage;
