import { useActionState } from "react";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { LucideBan, LucideCheck } from "lucide-react";
import { togglePermission } from "@/features/membership/actions/toggle-permission";

type PermisionToggleButtonProps = {
  userId: string;
  organizationId: string;
  permissionKey: "canDeleteTicket" | "canUpdateTicket";
  permissionValue: boolean;
};

const PermissionToggleButton = ({
  userId,
  organizationId,
  permissionKey,
  permissionValue,
}: PermisionToggleButtonProps) => {
  const [actionState, action] = useActionState(
    togglePermission.bind(null, {
      userId,
      organizationId,
      permissionKey,
    }),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <SubmitButton
        icon={permissionValue ? <LucideCheck /> : <LucideBan />}
        size="icon"
        variant={permissionValue ? "secondary" : "outline"}
      />
    </Form>
  );
};

export { PermissionToggleButton };
