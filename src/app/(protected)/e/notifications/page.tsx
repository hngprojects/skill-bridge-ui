import type { Metadata } from "next";

import NotificationsPage from "@/components/notifications/notifications-page";

export const metadata: Metadata = {
  title: "Notifications",
  description: "Employer notifications",
};

export default function EmployerNotificationsPage() {
  return <NotificationsPage role="employer" settingsHref="/e/settings" />;
}
