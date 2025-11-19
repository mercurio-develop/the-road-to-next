"use client";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/form/submit-button";
import { signIn } from "@/features/auth/actions/sign-in";
import { useActionState } from "react";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import { FieldError } from "@/components/form/field-error";

const SignInForm = () => {
  const [actionState, action] = useActionState(signIn, EMPTY_ACTION_STATE);

  return (
    <Form action={action} actionState={actionState}>
      <Input name="Email" placeholder="Email" />
      <FieldError name="Email" actionState={actionState} />
      <Input name="password" placeholder="Password" />
      <FieldError name="password" actionState={actionState} />
      <SubmitButton label="Sign In" />
    </Form>
  )
}
export { SignInForm };
