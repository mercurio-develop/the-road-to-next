import { getOrganizationsByUser } from "@/features/organization/queries/get-organizations-by-user";
import { OrganizationItem } from "@/features/organization/components/organization-item";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const OrganizationList = async () => {
  const organizations = await getOrganizationsByUser();
  const hasActive = organizations.some((organization)=>organization.membershipByUser?.isActive);
  return (
    <div className="flex flex-col gap-y-4">
      {organizations.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          No organizations found
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {["ID", "Name", "Joined At", "Members", "Actions"].map(
                (header) => (
                  <TableHead className="text-muted-foreground" key={header}>{header}</TableHead>
                ),
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((organization) => (
              <OrganizationItem
                key={organization.id}
                hasActive={hasActive}
                organization={organization}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export { OrganizationList };
