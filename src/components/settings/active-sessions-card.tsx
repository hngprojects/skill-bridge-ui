"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  BrowserIcon,
  ChromeIcon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";

import { useSyncExternalStore } from "react";

import { useTalentSettings } from "@/hooks/api";

const subscribe = () => () => {};
const SESSION_TIME =
  typeof window !== "undefined"
    ? new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : null;

function useClientInfo() {
  const label = useSyncExternalStore(subscribe, parseBrowserLabel, () => "");
  const time = useSyncExternalStore(
    subscribe,
    () => SESSION_TIME,
    () => null,
  );
  return { label, time };
}

function parseBrowserLabel(): string {
  if (typeof navigator === "undefined") return "Unknown browser";
  const ua = navigator.userAgent;

  let browser = "Unknown browser";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/OPR\/|Opera/.test(ua)) browser = "Opera";
  else if (/Chrome\//.test(ua)) browser = "Chrome";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  else if (/Safari\//.test(ua)) browser = "Safari";

  let os = "";
  if (/Windows/.test(ua)) os = "Windows";
  else if (/Mac OS X/.test(ua)) os = "Mac OS X";
  else if (/Android/.test(ua)) os = "Android";
  else if (/iPhone|iPad/.test(ua)) os = "iOS";
  else if (/Linux/.test(ua)) os = "Linux";

  return os ? `${browser} on ${os}` : browser;
}

export function ActiveSessionsCard() {
  const { data: settings } = useTalentSettings();
  const { label: currentBrowserLabel, time: currentTime } = useClientInfo();

  const sessions = settings?.account.active_sessions ?? [];
  const displaySessions =
    sessions.length > 0
      ? sessions
      : [{ label: currentBrowserLabel, is_current: true }];

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-5">
      <p className="text-base font-semibold text-foreground">Active Sessions</p>
      {displaySessions.map((session, i) => {
        const label = session.is_current ? currentBrowserLabel : session.label;
        const time = session.is_current ? currentTime : null;
        return (
          <div
            key={i}
            className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={/chrome/i.test(label) ? ChromeIcon : BrowserIcon}
                  className="size-4 shrink-0"
                />
                {label}
              </span>
              {time && (
                <>
                  <span className="hidden sm:inline text-border">•</span>
                  <span>Last access: Today at {time}</span>
                </>
              )}
            </span>
            {session.is_current && (
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground shrink-0">
                Current session
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  className="size-4"
                />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
