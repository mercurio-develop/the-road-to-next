"use server";


import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { generateEmailVerificationCode } from "@/features/auth/utils/generate-email-verification-code";
import { sendEmailVerification } from "@/features/auth/emails/send-email-verification";

export const emailVerificationResend = async () => {
  const { user } = await getAuthOrRedirect({
    checkEmailVerified: false,
  });

  try {
    const verificationCode = await generateEmailVerificationCode(user.id, user.email);

    const result = await sendEmailVerification(
      user.username,
      user.email,
      verificationCode,
    );
    if (result.error) {
      return toActionState("ERROR","Failed to send verification email. Please try again later.");

    }

  } catch (error) {
    return fromErrorToActionState(error);
  }
  return toActionState("SUCCESS", "Verification Email has been resent.");
};
