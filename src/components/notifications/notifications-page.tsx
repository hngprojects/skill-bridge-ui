import NotificationView from "@/components/notifications/notification-view";
import NotificationsHeader from "@/components/notifications/notifications-header";

const NotificationsPage = () => {
  return (
    <div className="flex flex-col my-8.5 gap-y-5 md:gap-y-10">
      <NotificationsHeader />
      <NotificationView />
    </div>
  );
};

export default NotificationsPage;
