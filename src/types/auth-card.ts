import type * as React from "react";

export type AuthCardProps = {
  /** Logo / brand row at the top of the card */
  logo?: React.ReactNode;
  /** Main heading (e.g. “Create your account”) */
  title: React.ReactNode;
  /** Supporting line under the title */
  description?: React.ReactNode;
  /** OAuth buttons row / block */
  oauth?: React.ReactNode;
  /** Center label on the divider between OAuth and the form (default: “or sign in with email”) */
  oauthSeparatorLabel?: string;
  /** Primary form: email/password fields, submit, etc. */
  children: React.ReactNode;
  /** Footer under the form (e.g. “Already have an account? Sign in”) */
  footer?: React.ReactNode;
  className?: string;
};
