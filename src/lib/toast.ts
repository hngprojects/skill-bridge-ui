import { toast, type ExternalToast, type ToasterProps } from "sonner";

export const toastDurations = {
  error: 6_000,
  warning: 5_000,
  success: 4_000,
} as const;

export const toasterConfig = {
  closeButton: true,
  position: "bottom-right",
  richColors: true,
} satisfies Partial<ToasterProps>;

function withVariantDefaults(
  variant: keyof typeof toastDurations,
  options?: ExternalToast,
): ExternalToast {
  return {
    duration: toastDurations[variant],
    ...options,
  };
}

export const appToast = {
  error(message: string, options?: ExternalToast) {
    return toast.error(message, withVariantDefaults("error", options));
  },
  warning(message: string, options?: ExternalToast) {
    return toast.warning(message, withVariantDefaults("warning", options));
  },
  success(message: string, options?: ExternalToast) {
    return toast.success(message, withVariantDefaults("success", options));
  },
};
