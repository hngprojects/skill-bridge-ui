import { MoveRight } from "lucide-react";
import { Button } from "../ui/button";

const NotificationsHeader = () => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold text-2xl">Notifications</h2>
        <p className="font-light text-sm md:text-base">
          View and edit your account with personal information
        </p>
      </div>
      <Button className="underline font-semibold text-sm" variant={"ghost"}>
        Go to settings <MoveRight size={16} />{" "}
      </Button>
    </div>
  );
};

export default NotificationsHeader;
