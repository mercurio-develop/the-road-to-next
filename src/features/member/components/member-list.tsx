import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  MemberItem,
  MemberItemProps,
} from "@/features/member/components/member-item";

type MemberListProps = {
  members: MemberItemProps["member"][];
};

const MemberList = ({ members }: MemberListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {members.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          No members found
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {["ID", "First Name", "Last Name", "Email", "Joined At"].map((header) => (
                <TableHead className="text-muted-foreground" key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member,index) => (
              <MemberItem key={index} member={member} />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export { MemberList }