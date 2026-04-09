"use client";

import { User, Membership } from "@prisma/client";
import { format } from "date-fns";
import {
  LucideCalendar,
  LucideCheckCircle,
  LucideMail,
  LucideMoreVertical,
  LucideXCircle,
} from "lucide-react";
import { DeleteMembershipButton } from "@/features/membership/components/delete-membership-button";
import { TableCell, TableRow } from "@/components/ui/table";
import { UpdateMembershipRoleButton } from "@/features/membership/components/update-membership-role-button";
import { Button } from "@/components/ui/button";

export type BasicUser = {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
};

type MembershipWithUser = Membership & { User: BasicUser };

export type MemberItemProps = {
  user: User;
  member: MembershipWithUser;
  isAdmin?: boolean;
};

const MembershipItem = ({ member, user, isAdmin }: MemberItemProps) => {
  const initials =
    `${member.User.firstName[0]}${member.User.lastName[0]}`.toUpperCase();
  const fullName =
    `${member.User.firstName} ${member.User.lastName}` +
    " " +
    `${user.id === member.User.id ? "(you)" : ""}`;
  const isMyself = user.id === member.User.id;

  const buttons = (
    <>
      {isAdmin ? (
        <UpdateMembershipRoleButton
          membership={member}
          trigger={
            <Button size="icon" variant="outline">
              <LucideMoreVertical className="h-4 w-4" />
            </Button>
          }
        />
      ) : null}

      <DeleteMembershipButton
        organizationId={member.organizationId}
        userId={member.User.id}
        fullName={fullName}
        isMyself={isMyself}
      />
    </>
  );

  return (
    <TableRow>
      <TableCell className="w-[80px]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {initials}
        </div>
      </TableCell>
      <TableCell>
        <div className="min-w-0">
          <p className="truncate font-medium text-sm">{fullName}</p>
          <p className="flex items-center gap-1 truncate text-xs text-muted-foreground mt-0.5">
            <LucideMail className="h-3 w-3 shrink-0" />
            {member.User.email}
            {member.User.emailVerified ? (
              <LucideCheckCircle className="h-3 w-3 shrink-0 text-green-500" />
            ) : (
              <LucideXCircle className="h-3 w-3 shrink-0 text-destructive" />
            )}
          </p>
        </div>
      </TableCell>
      <TableCell>
        <span className="shrink-0 flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-muted-foreground w-fit">
          <LucideCalendar className="h-3 w-3" />
          Joined {format(member.joinedAt, "MMM d, yyyy")}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-xs font-medium uppercase text-muted-foreground px-2 py-1 border rounded-md">
          {member.membershipRole}
        </span>
      </TableCell>
      <TableCell className="flex justify-end gap-x-2">{buttons}</TableCell>
    </TableRow>
  );
};

export { MembershipItem };
