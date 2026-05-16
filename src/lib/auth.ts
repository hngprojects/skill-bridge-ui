import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import { publicApi } from "@/lib/api";
import type {
  ApiEnvelope,
  AuthUser,
  LoginResponseData,
  UserRole,
} from "@/types/api";

const passwordLoginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

const optionalCredential = z.preprocess(
  (value) => (value === "" || value === "undefined" ? undefined : value),
  z.string().min(1).optional(),
);

const postVerifySchema = z.object({
  email: z.email(),
  accessToken: optionalCredential,
  userId: z.string().min(1),
  name: z.string(),
  image: optionalCredential,
  role: z.enum(["talent", "employer", "admin"]).optional(),
});

const credentialsSchema = z.union([postVerifySchema, passwordLoginSchema]);

function displayNameFromAuthUser(user: AuthUser): string {
  if (user.fullname) return user.fullname;
  const parts = [
    user.firstName ?? user.first_name,
    user.lastName ?? user.last_name,
  ].filter(Boolean);
  if (parts.length > 0) return parts.join(" ");
  return user.email;
}

function avatarFromAuthUser(user: AuthUser): string | undefined {
  return user.profile_pic_url ?? user.avatar_url ?? undefined;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        accessToken: { label: "Access token", type: "text" },
        userId: { label: "User id", type: "text" },
        name: { label: "Name", type: "text" },
        image: { label: "Image", type: "text" },
        role: { label: "Role", type: "text" },
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;

        if ("accessToken" in parsed.data && "userId" in parsed.data) {
          const v = parsed.data;
          return {
            id: v.userId,
            name: v.name,
            email: v.email,
            image: v.image,
            accessToken: v.accessToken,
            role: v.role,
          };
        }

        try {
          const { data: envelope } = await publicApi.post<
            ApiEnvelope<LoginResponseData>
          >("/auth/login", parsed.data);
          const login = envelope.data;
          if (!login.user?.id) {
            return null;
          }
          const u = login.user;
          return {
            id: u.id,
            name: displayNameFromAuthUser(u),
            email: u.email,
            image: avatarFromAuthUser(u),
            accessToken: login.tokens?.access_token,
            role: u.role,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      const credentialUser = user as
        | ({
            accessToken?: string;
          } & Partial<AuthUser>)
        | undefined;
      if (account?.provider === "credentials" && credentialUser?.accessToken) {
        token.accessToken = credentialUser.accessToken;
      }
      if (account?.provider === "credentials" && credentialUser) {
        token.role = credentialUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      const credentialSession = session as typeof session & {
        accessToken?: string;
      };
      const sessionUser = session.user as typeof session.user & {
        id?: string;
        role?: UserRole;
      };
      const tokenDetails = token as typeof token & {
        role?: UserRole;
      };
      credentialSession.accessToken =
        typeof token.accessToken === "string" ? token.accessToken : undefined;
      if (typeof token.sub === "string") {
        sessionUser.id = token.sub;
      }
      sessionUser.role = tokenDetails.role;
      return session;
    },
  },
});
