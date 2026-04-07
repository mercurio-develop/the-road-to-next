import { Membership } from "@prisma/client";
import { format } from "date-fns";
import { LucideCalendar, LucideMail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";

type BasicUser = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

type MembershipWithUser = Membership & { User: BasicUser };

export type MemberItemProps = {
  member: MembershipWithUser;
};

const MemberItem = async ({ member }: MemberItemProps) => {
  const { user } = await getAuthOrRedirect()
  const initials = `${member.User.firstName[0]}${member.User.lastName[0]}`.toUpperCase();
  const fullName = `${member.User.firstName} ${member.User.lastName}` + " " + `${user.id === member.User.id ? "(you)" : ""}`;

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
          </p>
        </div>
        <span className="shrink-0 flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-muted-foreground">
          <LucideCalendar className="h-3 w-3" />
          Joined {format(member.joinedAt, "MMM d, yyyy")}
        </span>
      </CardContent>
    </Card>
  );
};

export { MemberItem };
