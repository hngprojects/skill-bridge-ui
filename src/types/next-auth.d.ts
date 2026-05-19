import type { DefaultSession } from "next-auth";

import type { AuthUser } from "@/types/api";

type SessionUserDetails = {
  id?: string;
  role?: AuthUser["role"];
};

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: DefaultSession["user"] & SessionUserDetails;
  }

  interface User {
    accessToken?: string;
    role?: AuthUser["role"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    role?: AuthUser["role"];
  }
}
