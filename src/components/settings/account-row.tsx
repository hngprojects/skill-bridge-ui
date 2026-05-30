export function AccountRow({
  title,
  description,
  action,
}: {
  title: string;
  description: React.ReactNode;
  action: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-base font-semibold text-foreground">{title}</p>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  );
}

export function ActionLink({
  children,
  destructive,
  icon,
}: {
  children: React.ReactNode;
  destructive?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={`flex items-center gap-1 text-sm font-medium underline underline-offset-2 transition-colors ${
        destructive
          ? "text-destructive hover:text-destructive/80"
          : "text-foreground hover:text-muted-foreground"
      }`}
    >
      {children}
      {icon}
    </button>
  );
}
