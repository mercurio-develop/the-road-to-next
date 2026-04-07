'use client'

import { LucideLoaderCircle, LucideTrash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UseConfirmDialog } from "@/components/confirm-dialog";
import { useRouter } from "next/navigation";
import { deleteOrganization } from "@/features/organization/actions/delete-organization";

type DeleteOrganizationButtonProps = {
  organizationId: string;
  organizationName: string;
};

const DeleteOrganizationButton = ({ organizationId, organizationName }: DeleteOrganizationButtonProps) => {
  const router = useRouter();

  const [button, dialog] = UseConfirmDialog({
    action: deleteOrganization.bind(null, organizationId),
    trigger: (isPending) => (
      <Button variant="destructive">
        {isPending ? (
          <LucideLoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <LucideTrash className="h-4 w-4" />
        )}
      </Button>
    ),
    onSuccess: () => {
      router.refresh();
    },
    description: `This action cannot be undone. Make sure you understand the consequences of delete the company ${organizationName}.`,
  });

  return (
    <>
      {button}
      {dialog}
    </>
  );
};

export { DeleteOrganizationButton };
