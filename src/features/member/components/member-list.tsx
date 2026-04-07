import {
  MemberItem,
  MemberItemProps,
} from "@/features/member/components/member-item";
import { LucideUsers } from "lucide-react";

type MemberListProps = {
  members: MemberItemProps["member"][];
};

const MemberList = ({ members }: MemberListProps) => {
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
        <MemberItem key={index} member={member} />
      ))}
    </div>
  );
};

export { MemberList };