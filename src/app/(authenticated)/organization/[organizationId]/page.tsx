import {
  getOrganization,
} from "@/features/organization/queries/get-organization";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { organizationsPath} from "@/paths";
import { Separator } from "@/components/ui/separator";
import { OrganizationItem } from "@/features/organization/components/organization-item";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MemberList } from "@/features/member/components/member-list";

type TicketPageProps = {
  params: Promise<{
    organizationId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { organizationId } = await params;
  const organization = await getOrganization(organizationId);

  if (!organization) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8 ml-10">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Organizations", href: organizationsPath()},
          { title: organization.name },
        ]}
      />
      <Separator />
      <div className="flex justify-center animate-fade-in-from-top">
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
            <OrganizationItem
              key={organization.id}
              organization={organization}
            />
          </TableBody>
        </Table>
        <Separator />
        <MemberList members={organization.memberships}/>
      </div>
    </div>
  );
};

export default TicketPage;
