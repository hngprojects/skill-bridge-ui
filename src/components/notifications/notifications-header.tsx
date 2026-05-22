import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotificationsHeader = () => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold text-2xl">Notifications</h2>
        <p className="font-light text-sm md:text-base">
          View all activities here
        </p>
      </div>
      <Link href={"/t/settings"}>
        <Button className="underline font-semibold text-sm" variant={"ghost"}>
          Go to settings <ArrowRight size={16} />{" "}
        </Button>
      </Link>
    </div>
  );
};

export default NotificationsHeader;
