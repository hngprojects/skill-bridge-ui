export function VerifiedReportLoadingState() {
  return (
    <div className="flex flex-col gap-y-6 my-8.5 animate-pulse">
      <div className="h-10 w-64 rounded-lg bg-muted" />
      <div className="min-h-80 rounded-xl bg-muted" />
      <div className="min-h-64 rounded-xl bg-muted" />
    </div>
  );
}
