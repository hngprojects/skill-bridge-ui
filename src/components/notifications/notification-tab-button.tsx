import { NotificationTab } from "@/constants/notifications";
import { Button } from "@base-ui/react/button";
import { Dispatch, SetStateAction } from "react";

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
      className={`rounded-lg transition-all duration-300 ${isActive ? "bg-[#EBEBEB] font-medium hover:bg-[#EBEBEB]/70  text-black" : "border border-[#DBDBDB] font-normal text-[#757575] hover:bg-[#EBEBEB] bg-transparent"}`}
      key={tab}
      onClick={() => setTab(tab)}
    >
      {tab}
    </Button>
  );
};

export default NotificationTabButton;
