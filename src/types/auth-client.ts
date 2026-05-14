import type { LoginResponseData, VerifyEmailResponseData } from "@/types/api";

export type CredentialSignInParams = {
  email: string;
  accessToken?: string | null;
  userId: string | number;
  name: string;
  image?: string | null;
};

export type CredentialSignInFromAuthResponse =
  | LoginResponseData
  | VerifyEmailResponseData;
