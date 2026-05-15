import { cn } from "@/lib/utils";
import type { AuthCardProps } from "@/types/auth-card";

function AuthCard({
  logo,
  title,
  description,
  oauth,
  oauthSeparatorLabel = "or sign in with email",
  children,
  footer,
  className,
}: AuthCardProps) {
  return (
    <div
      className={cn(
        "flex w-full max-w-136.25 flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#E2E8F0] sm:p-10",
        "[font-family:var(--font-outfit),sans-serif]",
        className,
      )}
    >
      {logo ? <div className="mb-8">{logo}</div> : null}

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold leading-tight tracking-tight text-[#0D2025] sm:text-[28px] sm:leading-8">
          {title}
        </h1>
        {description ? (
          <p className="text-base leading-6 text-[#64748B]">{description}</p>
        ) : null}
      </div>

      {oauth ? (
        <>
          <div className="mt-8 flex flex-col gap-4">{oauth}</div>
          <div
            className="relative my-8 flex items-center gap-4"
            role="separator"
            aria-label={oauthSeparatorLabel}
          >
            <div className="h-px flex-1 bg-[#E2E8F0]" />
            <span className="shrink-0 text-sm leading-4.5 tracking-[0.016em] text-[#64748B]">
              {oauthSeparatorLabel}
            </span>
            <div className="h-px flex-1 bg-[#E2E8F0]" />
          </div>
        </>
      ) : null}

      <div className={cn("flex flex-col gap-6", !oauth && "mt-8")}>
        {children}
      </div>

      {footer ? (
        <div className="mt-8 border-t border-[#F1F5F9] pt-8 text-center text-sm leading-4.5 text-[#64748B]">
          {footer}
        </div>
      ) : null}
    </div>
  );
}

export { AuthCard };
