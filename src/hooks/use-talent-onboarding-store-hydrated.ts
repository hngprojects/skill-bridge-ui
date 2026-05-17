"use client";

import { useSyncExternalStore } from "react";

import { useTalentOnboardingStore } from "@/stores/talent-onboarding-store";

function subscribe(onStoreChange: () => void) {
  const persistApi = useTalentOnboardingStore.persist;
  if (!persistApi) {
    return () => {};
  }
  return persistApi.onFinishHydration(onStoreChange);
}

function getClientSnapshot() {
  const persistApi = useTalentOnboardingStore.persist;
  return persistApi?.hasHydrated() ?? true;
}

function getServerSnapshot() {
  return false;
}

/** True after Zustand persist has reloaded from localStorage (client only). */
export function useTalentOnboardingStoreHydrated(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
