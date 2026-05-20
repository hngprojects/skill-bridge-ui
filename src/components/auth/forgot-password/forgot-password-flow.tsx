"use client";

import { ForgotPasswordEmailForm } from "./forgot-password-email-form";
import { ForgotPasswordNewPasswordForm } from "./forgot-password-new-password-form";
import { ForgotPasswordOtpForm } from "./forgot-password-otp-form";
// import { ForgotPasswordResetNotice } from "./forgot-password-reset-notice";
import { ForgotPasswordSuccessState } from "./forgot-password-success-state";
import { useForgotPasswordFlow } from "@/hooks/use-forgot-password-flow";

type ForgotPasswordFlowProps = {
  initialEmail?: string;
};

function ForgotPasswordFlow({ initialEmail = "" }: ForgotPasswordFlowProps) {
  const flow = useForgotPasswordFlow(initialEmail);

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-md flex-col items-center px-0">
      {flow.rootError ? (
        <p className="mb-4 w-full rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {flow.rootError}
        </p>
      ) : null}
      {flow.resendHint ? (
        <p className="mb-4 w-full rounded-lg border border-muted bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
          {flow.resendHint}
        </p>
      ) : null}

      {flow.step === "email" ? (
        <ForgotPasswordEmailForm
          email={flow.resetEmail}
          emailError={flow.emailError}
          isSubmitting={flow.isSendingCode}
          onEmailChange={(email) => {
            flow.setResetEmail(email);
            flow.setEmailError("");
            flow.clearMessages();
          }}
          onContinue={() => void flow.validateEmail()}
        />
      ) : flow.step === "success" ? (
        <ForgotPasswordSuccessState />
      ) : flow.step === "code" ? (
        <ForgotPasswordOtpForm
          email={flow.resetEmail}
          otp={flow.otp}
          otpError={flow.otpError}
          secondsRemaining={flow.otpSecondsRemaining}
          canResend={flow.canResendCode || flow.maxOtpAttemptsReached}
          isSubmitting={flow.isVerifyingOtp}
          onOtpChange={(nextOtp) => {
            flow.setOtp(nextOtp);
            flow.setOtpError("");
            flow.clearMessages();
          }}
          onContinue={() => void flow.validateOtp()}
          onResend={() => void flow.resendCode()}
          isResending={flow.isSendingCode}
        />
      ) : flow.step === "password" ? (
        <ForgotPasswordNewPasswordForm
          password={flow.password}
          confirmPassword={flow.confirmPassword}
          passwordError={flow.passwordError}
          confirmPasswordError={flow.confirmPasswordError}
          onPasswordChange={(nextPassword) => {
            flow.setPassword(nextPassword);
            flow.setPasswordError("");
            flow.setConfirmPasswordError("");
            flow.clearMessages();
          }}
          onConfirmPasswordChange={(nextPassword) => {
            flow.setConfirmPassword(nextPassword);
            flow.setConfirmPasswordError("");
            flow.clearMessages();
          }}
          onContinue={() => void flow.validatePasswords()}
          isSubmitting={flow.isResettingPassword}
        />
      ) : /*
        <ForgotPasswordResetNotice
          email={flow.resetEmail}
          onContinue={flow.showOtpStep}
        />
        */
      null}
    </div>
  );
}

export { ForgotPasswordFlow };
export type { ForgotPasswordFlowProps };
