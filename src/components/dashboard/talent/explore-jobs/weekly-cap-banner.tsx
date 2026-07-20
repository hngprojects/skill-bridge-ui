import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function WeeklyCapBanner() {
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="size-4" />
      <AlertTitle>Weekly Limit Reached</AlertTitle>
      <AlertDescription>
        You have reached your weekly limit of 10 expressions of interest. Please
        check back next week.
      </AlertDescription>
    </Alert>
  );
}
