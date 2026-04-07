"use client";

import { Membership } from "@prisma/client";
import { format } from "date-fns";
import { TableCell, TableRow } from "@/components/ui/table";
import { UseConfirmDialog } from "@/components/confirm-dialog";
import {
  LucideArrowLeftRight,
  LucideBuilding2,
  LucideCalendar,
  LucideHash,
  LucideLoaderCircle,
  LucidePencil,
  LucideSquareArrowOutUpRight,
  LucideTrash,
  LucideUsers,
} from "lucide-react";
import { deleteOrganization } from "@/features/organization/actions/delete-organization";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { organizationEditPath, organizationPath } from "@/paths";
import { OrganizationSwitchButton } from "@/features/organization/components/organization-switch-button";
import { SubmitButton } from "@/components/form/submit-button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

type OrganizationItemProps = {
  hasActive?: boolean;
  limitedAccess?: boolean;
  variant?: "row" | "card";
  organization: {
    _count: { memberships: number };
    name: string;
    id: string;
    membershipByUser?: Membership;
    memberships?: Membership[];
  };
};

const OrganizationItem = ({
  hasActive,
  variant = "row",
  organization,
  limitedAccess,
}: OrganizationItemProps) => {
  const isActive = organization?.membershipByUser?.isActive;
  const router = useRouter();
  const switchButton = (
    <OrganizationSwitchButton
      organizationId={organization.id}
      trigger={
        <SubmitButton
          label={!hasActive ? "Activate" : isActive ? "Active" : "Switch"}
          variant={!hasActive ? "secondary" : isActive ? "default" : "outline"}
          icon={<LucideArrowLeftRight />}
        />
      }
    />
  );

  const [deleteButton, deleteDialog] = UseConfirmDialog({
    action: deleteOrganization.bind(null, organization?.id),
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

  if (variant === "card") {
    return (
      <>
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <LucideBuilding2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">{organization.name}</CardTitle>
                <CardDescription className="font-mono text-xs mt-0.5">
                  {organization.id}
                </CardDescription>
              </div>
            </div>
            <CardAction>
              <div className="flex items-center gap-2">
                {switchButton}
                {editButton}
                {deleteButton}
              </div>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6 pt-2 sm:grid-cols-3">
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  <LucideUsers className="h-3.5 w-3.5" />
                  Members
                </span>
                <span className="text-2xl font-bold">
                  {organization._count.memberships}
                </span>
              </div>
              {organization.membershipByUser && (
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    <LucideCalendar className="h-3.5 w-3.5" />
                    Joined At
                  </span>
                  <span className="text-sm font-medium">
                    {format(
                      organization.membershipByUser.joinedAt,
                      "MMM d, yyyy",
                    )}
                  </span>
                </div>
              )}
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  <LucideHash className="h-3.5 w-3.5" />
                  Status
                </span>
                <span
                  className={`text-sm font-semibold ${isActive ? "text-green-600" : "text-muted-foreground"}`}
                >
                  {isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        {deleteDialog}
      </>
    );
  }

  const buttons = limitedAccess ? (
    <>{switchButton}</>
  ) : (
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
