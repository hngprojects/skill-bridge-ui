import NotificationsPage from "@/components/notifications/notifications-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications",
  description: "CredLane notifications webpage",
};

const Page = () => {
  return <NotificationsPage />;
};

export default Page;
