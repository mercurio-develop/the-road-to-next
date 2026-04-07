'use client'

import { Membership } from "@prisma/client";
import { format } from "date-fns";
import {
  LucideCalendar,
  LucideCheckCircle,
  LucideMail,
  LucideXCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { User } from ".prisma/client";
import { DeleteMembershipButton } from "@/features/membership/components/delete-membership-button";

type BasicUser = {
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
};

const MembershipItem = ({ member, user }: MemberItemProps) => {
  const initials = `${member.User.firstName[0]}${member.User.lastName[0]}`.toUpperCase();
  const fullName = `${member.User.firstName} ${member.User.lastName}` + " " + `${user.id === member.User.id ? "(you)" : ""}`;
  const isSelf = user.id === member.User.id;
  return (
    <Card className="gap-0 py-0 overflow-hidden">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
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
        <span className="shrink-0 flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-muted-foreground">
          <LucideCalendar className="h-3 w-3" />
          Joined {format(member.joinedAt, "MMM d, yyyy")}
        </span>
        <DeleteMembershipButton
          organizationId={member.organizationId}
          userId={member.User.id}
          fullName={fullName}
          isSelf={isSelf}
        />
      </CardContent>
    </Card>
  );
};

export { MembershipItem };
