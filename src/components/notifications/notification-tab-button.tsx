import { NotificationTab } from "@/constants/notifications";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

const NotificationTabButton = ({
  activeTab,
  tab,
  setTab,
}: {
  activeTab: NotificationTab;
  tab: NotificationTab;
  setTab: Dispatch<SetStateAction<NotificationTab>>;
}) => {
  const isActive = tab === activeTab;
  return (
    <Button
      type="button"
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      className={cn(
        "rounded-lg transition-all duration-300",
        isActive
          ? "bg-[#EBEBEB] font-medium text-black hover:bg-[#EBEBEB]/70"
          : "border border-[#DBDBDB] bg-transparent font-normal text-[#757575] hover:bg-[#EBEBEB]",
      )}
      key={tab}
      onClick={() => setTab(tab)}
    >
      {tab}
    </Button>
  );
};

export default NotificationTabButton;
