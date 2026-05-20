"use client";

import { useEffect } from "react";

import { prepareGoogleAuth } from "@/lib/google-auth";

export function GoogleAuthPreloader() {
  useEffect(() => {
    void prepareGoogleAuth().catch(() => undefined);
  }, []);

  return null;
}
