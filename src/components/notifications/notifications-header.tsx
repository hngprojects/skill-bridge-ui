import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type NotificationsHeaderProps = {
  settingsHref: string;
};

const NotificationsHeader = ({ settingsHref }: NotificationsHeaderProps) => {
  return (
    <div className="flex flex-row items-start justify-between">
      <div className="flex flex-col gap-y-1">
        <h2 className="text-2xl font-bold leading-tight">Notifications</h2>
        <p className="text-sm font-light md:text-base">
          View all activities here
        </p>
      </div>
      <Link href={settingsHref}>
        <Button
          className="h-auto px-0 text-sm font-semibold underline hover:bg-transparent"
          variant={"ghost"}
        >
          Go to settings <ArrowRight size={16} />{" "}
        </Button>
      </Link>
    </div>
  );
};

export default NotificationsHeader;
