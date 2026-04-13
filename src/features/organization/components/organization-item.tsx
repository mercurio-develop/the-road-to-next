"use client";

import { Membership } from "@prisma/client";
import { format } from "date-fns";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  LucideArrowLeftRight,
  LucideBuilding2,
  LucideCalendar,
  LucideHash,
  LucideUsers,
} from "lucide-react";
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
import { DeleteOrganizationButton } from "@/features/organization/components/delete-organization-button";
import { EditOrganizationButton } from "@/features/organization/components/edit-organization-button";
import { OrganizationDetailButton } from "@/features/organization/components/organization-detail-button";
import { DeleteMembershipButton } from "@/features/membership/components/delete-membership-button";
import { Button } from "@/components/ui/button";

type OrganizationItemProps = {
  hasActive?: boolean;
  limitedAccess?: boolean;
  variant?: "row" | "card";
  organization: {
    _count: { memberships: number };
    name: string;
    id: string;
    membershipByUser: Membership;
    memberships?: Membership[];
  };
};

const OrganizationItem = ({
  hasActive,
  variant = "row",
  organization,
  limitedAccess,
}: OrganizationItemProps) => {
  const isActive = organization.membershipByUser.isActive;
  const isAdmin = organization.membershipByUser.membershipRole === "ADMIN";

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

  const placeholder = (
    <Button size="icon" disabled className="disabled:opacity-0"/>
  )

  const buttons = limitedAccess ? (
    <>{switchButton}</>
  ) : (
    <>
      {switchButton}
      {isAdmin && variant !== "card" ? <OrganizationDetailButton organizationId={organization.id} /> : placeholder}
      {isAdmin ? <EditOrganizationButton organizationId={organization.id} /> : placeholder}
      <DeleteMembershipButton
        organizationId={organization.id}
        userId={organization.membershipByUser.userId}
        isMyself={true}
      />
      {isAdmin ? <DeleteOrganizationButton
        organizationId={organization.id}
        organizationName={organization.name}
      /> : placeholder}
    </>
  );

  if (variant === "card") {
    return (
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <LucideBuilding2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl">{organization.name}</CardTitle>
                {isAdmin && (
                  <span className="flex items-center gap-1 bg-primary/10 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                    Admin
                  </span>
                )}
              </div>
              <CardDescription className="font-mono text-xs mt-0.5">
                {organization.id}
              </CardDescription>
            </div>
          </div>
          <CardAction>
            <div className="flex items-center gap-2">
              {buttons}
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
    );
  }



  return (
    <TableRow>
      <TableCell>{organization.id}</TableCell>
      <TableCell>{organization.name}</TableCell>
      <TableCell>
        {format(organization.membershipByUser.joinedAt, "yyyy-MM-dd")}
      </TableCell>
      <TableCell>{organization._count.memberships}</TableCell>
      <TableCell className="flex justify-end gap-x-2">{buttons}</TableCell>
    </TableRow>
  );
};

export { OrganizationItem };
