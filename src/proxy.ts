import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import type { UserRole } from "@/types/api";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

const PROTECTED_ROUTES = ["/talent/onboarding"];

function continueWithSecurityHeaders(request: Request): NextResponse {
  const requestId = request.headers.get("x-request-id") ?? crypto.randomUUID();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-request-id", requestId);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  response.headers.set("x-request-id", requestId);

  return response;
}

export const proxy = auth((request) => {
  const { pathname } = request.nextUrl;

  const isTalentProtected = PROTECTED_ROUTES.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (isTalentProtected) {
    const user = request.auth?.user as
      | { id?: string; role?: UserRole }
      | undefined;

    if (!user?.id) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (user.role !== "talent") {
      return NextResponse.redirect(new URL("/forbidden", request.url));
    }
  }

  return continueWithSecurityHeaders(request);
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$).*)",
  ],
};
