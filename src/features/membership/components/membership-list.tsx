import {
  MemberItemProps, MembershipItem
} from "@/features/membership/components/membership-item";
import { LucideUsers } from "lucide-react";
import { User } from ".prisma/client";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";

type MemberListProps = {
  members: MemberItemProps["member"][];
};

const MembershipList =async ({ members }: MemberListProps) => {
  const { user } = await getAuthOrRedirect();
  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed py-12 text-muted-foreground">
        <LucideUsers className="h-8 w-8 opacity-40" />
        <p className="text-sm">No members yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {members.map((member, index) => (
        <MembershipItem key={index} member={member} user={user} />
      ))}
    </div>
  );
};

export { MembershipList };