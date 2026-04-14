import {
  MemberItemProps, MembershipItem
} from "@/features/membership/components/membership-item";
import { LucideUsers } from "lucide-react";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

  const currentUserMembership = members.find(m => m.userId === user.id);
  const isAdmin = currentUserMembership?.membershipRole === "ADMIN";

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]"></TableHead>
          <TableHead>User</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="w-[50px]">Can Delete Ticket?</TableHead>
          <TableHead className="w-[50px]">Can Update Ticket?</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member, index) => (
          <MembershipItem
            key={index}
            member={member}
            user={user}
            isAdmin={isAdmin}
          />
        ))}
      </TableBody>
    </Table>
  );
};


export { MembershipList };