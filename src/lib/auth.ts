import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import { publicApi } from "@/lib/api";
import type {
  ApiEnvelope,
  AuthUser,
  GoogleVerifyCodeResponseData,
  LoginResponseData,
  MeResponseData,
  UserRole,
  VerifyEmailResponseData,
} from "@/types/api";

const passwordLoginSchema = z.object({
  email: z.email(),
  password: z.string().min(1).max(64),
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

const googleCodeSchema = z.object({
  googleCode: z.string().min(1),
  redirectUri: z.literal("postmessage"),
  role: z.literal("talent"),
});

const verifyEmailSchema = z.object({
  verificationEmail: z.email(),
  otp: z.string().min(1),
});

const credentialsSchema = z.union([
  googleCodeSchema,
  verifyEmailSchema,
  postVerifySchema,
  passwordLoginSchema,
]);

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

function isAuthUser(value: unknown): value is AuthUser {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "email" in value &&
    "role" in value
  );
}

function authPayloadUser(payload: unknown): AuthUser | undefined {
  if (isAuthUser(payload)) return payload;

  if (typeof payload === "object" && payload !== null && "user" in payload) {
    const user = (payload as { user?: unknown }).user;
    if (isAuthUser(user)) return user;
  }

  if (typeof payload === "object" && payload !== null && "data" in payload) {
    return authPayloadUser((payload as { data?: unknown }).data);
  }

  return undefined;
}

function authPayloadAccessToken(payload: unknown): string | undefined {
  if (typeof payload !== "object" || payload === null) return undefined;

  if ("tokens" in payload) {
    const tokens = (payload as { tokens?: { access_token?: unknown } }).tokens;
    return typeof tokens?.access_token === "string"
      ? tokens.access_token
      : undefined;
  }

  if ("data" in payload) {
    return authPayloadAccessToken((payload as { data?: unknown }).data);
  }

  return undefined;
}

function verifiedSessionUserFromCredentials(rawCredentials: unknown) {
  if (typeof rawCredentials !== "object" || rawCredentials === null) {
    return null;
  }

  const credentials = rawCredentials as Record<string, unknown>;
  if (credentials.sessionUser !== "true") return null;

  const id = credentials.userId;
  const email = credentials.email;
  const name = credentials.name;
  const image = credentials.image;
  const role = credentials.role;

  if (
    typeof id !== "string" ||
    typeof email !== "string" ||
    typeof name !== "string" ||
    !["talent", "employer", "admin"].includes(String(role))
  ) {
    return null;
  }

  return {
    id,
    email,
    name,
    image:
      typeof image === "string" && image !== "" && image !== "undefined"
        ? image
        : undefined,
    role: role as UserRole,
  };
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
        googleCode: { label: "Google code", type: "text" },
        redirectUri: { label: "Redirect URI", type: "text" },
        verificationEmail: { label: "Verification email", type: "email" },
        otp: { label: "Verification code", type: "text" },
        sessionUser: { label: "Session user", type: "text" },
      },
      async authorize(rawCredentials) {
        const verifiedSessionUser =
          verifiedSessionUserFromCredentials(rawCredentials);
        if (verifiedSessionUser) {
          return verifiedSessionUser;
        }

        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;

        if ("googleCode" in parsed.data) {
          try {
            const { data: envelope } = await publicApi.post<
              ApiEnvelope<GoogleVerifyCodeResponseData>
            >("/auth/google/verify-code", {
              code: parsed.data.googleCode,
              redirectUri: parsed.data.redirectUri,
              role: parsed.data.role,
            });
            const login = envelope.data;
            if (!login.user?.id) return null;

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
        }

        if ("verificationEmail" in parsed.data) {
          try {
            const { data: envelope } = await publicApi.post<
              ApiEnvelope<VerifyEmailResponseData>
            >("/auth/verify-email", {
              email: parsed.data.verificationEmail,
              otp: parsed.data.otp,
            });
            const u = authPayloadUser(envelope.data ?? envelope);
            if (!u) return null;

            return {
              id: u.id,
              name: displayNameFromAuthUser(u),
              email: u.email,
              image: avatarFromAuthUser(u),
              accessToken: authPayloadAccessToken(envelope.data ?? envelope),
              role: u.role,
            };
          } catch {
            return null;
          }
        }

        if ("accessToken" in parsed.data && "userId" in parsed.data) {
          const v = parsed.data;
          if (!v.accessToken) return null;

          try {
            const { data: envelope } = await publicApi.get<
              ApiEnvelope<MeResponseData>
            >("/auth/me", {
              headers: {
                Authorization: `Bearer ${v.accessToken}`,
              },
            });
            const verifiedUser = envelope.data;
            if (!verifiedUser?.id) return null;

            return {
              id: verifiedUser.id,
              name: displayNameFromAuthUser(verifiedUser),
              email: verifiedUser.email,
              image: avatarFromAuthUser(verifiedUser),
              accessToken: v.accessToken,
              role: verifiedUser.role,
            };
          } catch {
            return null;
          }
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
            name?: string;
          } & Partial<AuthUser>)
        | undefined;
      if (account?.provider === "credentials" && credentialUser?.accessToken) {
        token.accessToken = credentialUser.accessToken;
      }
      if (account?.provider === "credentials" && credentialUser) {
        token.role = credentialUser.role;
        if (credentialUser.email) token.email = credentialUser.email;
        if (credentialUser.name) token.name = credentialUser.name;
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
        email?: string;
      };
      const tokenDetails = token as typeof token & {
        role?: UserRole;
      };
      credentialSession.accessToken =
        typeof token.accessToken === "string" ? token.accessToken : undefined;
      if (typeof token.sub === "string") {
        sessionUser.id = token.sub;
      }
      if (typeof token.email === "string") {
        sessionUser.email = token.email;
      }
      if (typeof token.name === "string") {
        sessionUser.name = token.name;
      }
      sessionUser.role = tokenDetails.role;
      return session;
    },
  },
});
