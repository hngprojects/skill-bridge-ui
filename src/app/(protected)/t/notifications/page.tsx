import NotificationsPage from "@/components/notifications/notifications-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications",
  description: "Skillbridge notifications webpage",
};

const Page = () => {
  return <NotificationsPage />;
};

export default Page;
