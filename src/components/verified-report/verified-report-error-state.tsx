type VerifiedReportErrorStateProps = {
  message?: string;
};

export function VerifiedReportErrorState({
  message = "Failed to load verified profile. Please try again later.",
}: VerifiedReportErrorStateProps) {
  return (
    <div className="flex items-center justify-center my-8.5 min-h-64">
      <p className="text-base text-muted-foreground">{message}</p>
    </div>
  );
}
