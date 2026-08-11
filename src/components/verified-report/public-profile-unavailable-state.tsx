type PublicProfileUnavailableStateProps = {
  message?: string;
};

/** Shown for an invalid/expired share token, or any fetch failure — generic
 *  copy since the visitor is anonymous, not a talent mid-onboarding (unlike
 *  `VerifiedReportUnavailableOverlay`, which is talent-specific). */
export function PublicProfileUnavailableState({
  message = "This profile link isn't available anymore. It may have expired, or the talent may have generated a new one.",
}: PublicProfileUnavailableStateProps) {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center gap-3 rounded-2xl border border-[#E4E7EC] bg-white px-6 py-12 text-center">
      <h1 className="text-xl font-semibold text-[#151515]">
        Profile unavailable
      </h1>
      <p className="max-w-sm text-sm text-[#757575]">{message}</p>
    </div>
  );
}
