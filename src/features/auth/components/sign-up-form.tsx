"use client";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/form/submit-button";
import { signUp } from "@/features/auth/actions/sign-up";
import { useActionState } from "react";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import { FieldError } from "@/components/form/field-error";

const SignUpForm = () => {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);

  return (
    <Form action={action} actionState={actionState}>
      <Input name="username" placeholder="Username" />
      <FieldError name="username" actionState={actionState} />
      <Input name="email" placeholder="Email" />
      <FieldError name="email" actionState={actionState} />
      <Input name="password" placeholder="Password" />
      <FieldError name="password" actionState={actionState} />
      <Input name="confirmPassword" placeholder="Confirm Password" />
      <FieldError name="confirmPassword" actionState={actionState} />
      <SubmitButton label="Sign Up" />
    </Form>
  )
}
export { SignUpForm };
