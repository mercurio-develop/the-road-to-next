"use client";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/form/submit-button";
import { useActionState } from "react";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import { FieldError } from "@/components/form/field-error";
import { upsertOrganization } from "@/features/organization/actions/upsert-organization";
import { Organization } from "@prisma/client";
import { redirect } from "next/navigation";
import { organizationsPath } from "@/paths";

type OrganizationUpsertFormProps = {
  organization?: Organization;
};

const OrganizationUpsertForm = ({
  organization,
}: OrganizationUpsertFormProps) => {
  const [actionState, action] = useActionState(
    upsertOrganization,
    EMPTY_ACTION_STATE,
  );

  const handleOnSuccess = () => {
    console.log("CACA")

    redirect(organizationsPath())
  }
  return (
    <Form
      action={action}
      actionState={actionState}
      onSuccess={handleOnSuccess}
    >
      <input type="hidden" name="id" value={organization?.id} />
      <Input
        name="name"
        placeholder="Organization Name"
        defaultValue={
          (actionState.payload?.get("name") as string) || organization?.name
        }
      />
      <FieldError name="name" actionState={actionState} />
      <SubmitButton
        label={organization ? "Update Organization" : "Create Organization"}
      />
    </Form>
  );
};

export { OrganizationUpsertForm };
