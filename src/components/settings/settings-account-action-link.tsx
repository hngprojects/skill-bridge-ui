"use client";

type SettingsAccountActionLinkProps = {
  children: React.ReactNode;
  destructive?: boolean;
  icon?: React.ReactNode;
} & React.ComponentProps<"button">;

export function SettingsAccountActionLink({
  children,
  destructive,
  icon,
  className,
  ...props
}: SettingsAccountActionLinkProps) {
  return (
    <button
      type="button"
      className={`flex items-center gap-1 text-sm font-medium underline underline-offset-2 transition-colors disabled:pointer-events-none disabled:opacity-60 ${
        destructive
          ? "text-destructive hover:text-destructive/80"
          : "text-foreground hover:text-muted-foreground"
      } ${className ?? ""}`}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
}
