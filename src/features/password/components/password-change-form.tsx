"use client";

import { Input } from "@/components/ui/input";
import { useActionState, useState } from "react";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import { FieldError } from "@/components/form/field-error";
import { Button } from "@/components/ui/button";
import zxcvbn from "zxcvbn";
import { passwordChange } from "@/features/password/actions/password-change";

const PasswordChangeForm = ( ) => {
  const [actionState, action] = useActionState(
    passwordChange,
    EMPTY_ACTION_STATE,
  );

  const [strongPassword, setStrongPassword] = useState({
    score: 0,
    feedback: { suggestions: [] as string[] },
  });

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const result = zxcvbn(event.target.value);
    setStrongPassword(result);
  };

  const getStrengthColors = (score: number) => {
    switch (score) {
      case 0:
        return { bg: "bg-red-500", text: "text-red-600" };
      case 1:
        return { bg: "bg-orange-500", text: "text-orange-600" };
      case 2:
        return { bg: "bg-yellow-500", text: "text-yellow-600" };
      case 3:
        return { bg: "bg-lime-500", text: "text-lime-600" };
      case 4:
        return { bg: "bg-green-600", text: "text-green-600" };
      default:
        return { bg: "bg-muted", text: "text-muted-foreground" };
    }
  };

  const percentage = strongPassword.score * 25;
  const { bg, text } = getStrengthColors(strongPassword.score);

  return (
    <Form action={action} actionState={actionState}>
      <Input
        name="password"
        placeholder="Password"
        type="password"
        onChange={onChangePassword}
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldError name="password" actionState={actionState} />
      <Input
        name="newPassword"
        placeholder="New Password"
        type="password"
        onChange={onChangePassword}
        defaultValue={actionState.payload?.get("newPassword") as string}
      />
      <div className=" flex h-2 w-[98%] rounded-full bg-muted ml-1 ">
        <div
          className={`h-full rounded-full ${bg} transition-[width,background-color] duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className={`text-xs flex ${text} ml-auto pr-2`}>
        {["very weak", "weak", "fair", "good", "strong"][strongPassword.score]}
      </div>
      <FieldError name="newPassword" actionState={actionState} />
      <Input
        type="password"
        name="confirmNewPassword"
        placeholder="Confirm New Password"
        defaultValue={actionState.payload?.get("confirmNewPassword") as string}
      />
      <FieldError name="confirmNewPassword" actionState={actionState} />
      <Button disabled={strongPassword.score === 0}>Update Password </Button>
    </Form>
  );
};
export { PasswordChangeForm };
