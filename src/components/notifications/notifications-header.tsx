import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotificationsHeader = () => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold text-2xl">Notifications</h2>
        <p className="font-light text-sm md:text-base">
          View all activities here
        </p>
      </div>
      <Button className="underline font-semibold text-sm" variant={"ghost"}>
        Go to settings <ArrowRight size={16} />{" "}
      </Button>
    </div>
  );
};

export default NotificationsHeader;
