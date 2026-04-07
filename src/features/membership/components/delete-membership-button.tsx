'use client'

import { LucideLoaderCircle, LucideLogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UseConfirmDialog } from "@/components/confirm-dialog";
import { useRouter } from "next/navigation";
import { deleteMembership } from "@/features/membership/actions/delete-membership";

type DeleteMembershipButtonProps = {
  organizationId: string;
  userId: string;
  fullName?: string;
  isSelf?: boolean;
};

const DeleteMembershipButton = ({ organizationId, userId, fullName, isSelf }: DeleteMembershipButtonProps) => {
  const router = useRouter();

  const [button, dialog] = UseConfirmDialog({
    action: deleteMembership.bind(null, organizationId, userId),
    pendingMessage: isSelf ? "Leaving organization..." : "Deleting member...",
    trigger: (isPending) => (
      <Button variant="destructive">
        {isPending ? (
          <LucideLoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <LucideLogOut className="h-4 w-4" />
        )}
      </Button>
    ),
    onSuccess: () => {
      router.refresh();
    },
    description: isSelf
      ? "This action cannot be undone. You will leave the organization."
      : `This action cannot be undone. Make sure you understand the consequences of deleting the membership of ${fullName}.`,
  });

  return (
    <>
      {button}
      {dialog}
    </>
  );
};

export { DeleteMembershipButton };
