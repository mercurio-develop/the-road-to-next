"use client";

import { Membership } from "@prisma/client";
import { format } from "date-fns";
import { TableCell, TableRow } from "@/components/ui/table";
import { UseConfirmDialog } from "@/components/confirm-dialog";
import {
  LucideArrowLeftRight,
  LucidePencil,
  LucideSquareArrowOutUpRight,
  LucideTrash,
} from "lucide-react";
import { deleteOrganization } from "@/features/organization/actions/delete-organization";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { organizationEditPath, organizationPath } from "@/paths";
import { OrganizationSwitchButton } from "@/features/organization/components/organization-switch-button";

type OrganizationItemProps = {
  organization: {
    _count: { memberships: number };
    name: string;
    id: string;
    membershipByUser?: Membership;
    memberships?: Membership[];
  };
};

const OrganizationItem = ({ organization }: OrganizationItemProps) => {
  const isActive = organization?.membershipByUser?.isActive ? "default" : "outline"

  const switchButton = (
    <OrganizationSwitchButton
      organizationId={organization.id}
      trigger={
        <Button variant={isActive} size="icon">
          <LucideArrowLeftRight className="w-4 h-4" />
        </Button>
      }
    />
  );

  const [deleteButton, deleteDialog] = UseConfirmDialog({
    action: deleteOrganization.bind(null, organization?.id),
    trigger: (
      <Button variant="destructive">
        <LucideTrash className="h-4 w-4" />
      </Button>
    ),
    description: `This action cannot be undone. Make sure you understand the consequences of delete the company ${organization.name}.`,
  });

  const editButton = (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={organizationEditPath(organization.id)}>
        <LucidePencil />
      </Link>
    </Button>
  );

  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={organizationPath(organization.id)}>
        <LucideSquareArrowOutUpRight />
      </Link>
    </Button>
  );

  const buttons = (
    <>
      {switchButton} {detailButton} {editButton} {deleteButton}
    </>
  );

  return (
    <TableRow>
      <TableCell>{organization.id}</TableCell>
      <TableCell>{organization.name}</TableCell>
      <TableCell>
        {organization.membershipByUser &&
          format(organization.membershipByUser.joinedAt, "yyyy-MM-dd")}
      </TableCell>
      <TableCell>{organization._count.memberships}</TableCell>
      <TableCell className="flex justify-end gap-x-2">{buttons}</TableCell>
      {deleteDialog}
    </TableRow>
  );
};

export { OrganizationItem };
