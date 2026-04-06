import { TableCell, TableRow } from "@/components/ui/table";
import { Membership } from "@prisma/client";

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

const MemberItem = ({ member }: MemberItemProps) => {
  return (
    <TableRow>
      <TableCell>{member.userId}</TableCell>
      <TableCell>{member.User.firstName}</TableCell>
      <TableCell>{member.User.lastName}</TableCell>
      <TableCell>{member.User.email}</TableCell>
      <TableCell>{member.joinedAt.toLocaleDateString()}</TableCell>
    </TableRow>
  );
};

export { MemberItem };
