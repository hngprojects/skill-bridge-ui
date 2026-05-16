import type { AuthUser } from "@/types/api";

declare module "@auth/core/types" {
  interface Session {
    accessToken?: string;
  }

  interface User {
    accessToken?: string;
    role?: AuthUser["role"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken?: string;
    role?: AuthUser["role"];
  }
}
