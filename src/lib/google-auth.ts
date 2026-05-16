"use client";

type GoogleCodeResponse = {
  code?: string;
  error?: string;
  error_description?: string;
};

type GoogleCodeClient = {
  requestCode: () => void;
};

type GoogleCodeClientConfig = {
  client_id: string;
  scope: string;
  ux_mode: "popup";
  redirect_uri: "postmessage";
  callback: (response: GoogleCodeResponse) => void;
  error_callback?: (error: unknown) => void;
};

type GoogleErrorResponse = {
  type?: string;
  message?: string;
};

declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: {
          initCodeClient: (config: GoogleCodeClientConfig) => GoogleCodeClient;
        };
      };
    };
  }
}

const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

let googleScriptPromise: Promise<void> | undefined;

function handleGoogleScriptLoadError(
  script: HTMLScriptElement,
  reject: (reason?: unknown) => void,
) {
  script.remove();
  googleScriptPromise = undefined;
  reject(new Error("Could not load Google auth."));
}

function googleAuthErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : undefined;
  const normalizedMessage = message?.toLowerCase();

  if (
    normalizedMessage?.includes("popup") &&
    normalizedMessage.includes("closed")
  ) {
    return "Google sign-in was cancelled. Please try again when you're ready.";
  }

  if (
    normalizedMessage?.includes("popup") &&
    (normalizedMessage.includes("blocked") ||
      normalizedMessage.includes("failed to open"))
  ) {
    return "Google sign-in popup was blocked. Please allow popups and try again.";
  }

  if (message) return message;

  if (typeof error === "object" && error !== null) {
    const googleError = error as GoogleErrorResponse;

    if (
      googleError.type === "popup_closed" ||
      googleError.type === "popup_closed_by_user"
    ) {
      return "Google sign-in was cancelled. Please try again when you're ready.";
    }

    if (googleError.type === "popup_failed_to_open") {
      return "Google sign-in popup was blocked. Please allow popups and try again.";
    }

    if (googleError.message) return googleError.message;
  }

  return "Google sign-in failed. Please try again.";
}

function loadGoogleScript() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google auth must run in the browser."));
  }

  if (window.google?.accounts?.oauth2) {
    return Promise.resolve();
  }

  googleScriptPromise ??= new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${GOOGLE_SCRIPT_SRC}"]`,
    );

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => handleGoogleScriptLoadError(existing, reject),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = GOOGLE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => handleGoogleScriptLoadError(script, reject);
    document.head.appendChild(script);
  });

  return googleScriptPromise;
}

export async function requestGoogleAuthCode(): Promise<string> {
  await loadGoogleScript();

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured.");
  }

  const oauth2 = window.google?.accounts?.oauth2;
  if (!oauth2) {
    throw new Error("Google auth is not available.");
  }

  return new Promise((resolve, reject) => {
    const client = oauth2.initCodeClient({
      client_id: clientId,
      scope: "openid profile email",
      ux_mode: "popup",
      redirect_uri: "postmessage",
      callback: (response) => {
        if (response.code) {
          resolve(response.code);
          return;
        }

        reject(
          new Error(
            response.error_description ??
              response.error ??
              "Google sign-in was cancelled.",
          ),
        );
      },
      error_callback: (error) => {
        reject(new Error(googleAuthErrorMessage(error)));
      },
    });

    client.requestCode();
  });
}
