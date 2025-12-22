"use client";

import { SubmitButton } from "@/components/form/submit-button";
import { useActionState } from "react";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import { emailVerificationResend } from "@/features/auth/actions/email-verification-resend";

const EmailVerificationResendForm = () => {
  const [actionState, action] = useActionState(
    emailVerificationResend,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <SubmitButton label="Resend code" variant="secondary" />
    </Form>
  );
};
export { EmailVerificationResendForm };
