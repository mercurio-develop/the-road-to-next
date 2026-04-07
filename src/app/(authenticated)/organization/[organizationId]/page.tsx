import {
  getOrganization,
} from "@/features/organization/queries/get-organization";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { organizationsPath} from "@/paths";
import { Separator } from "@/components/ui/separator";
import { OrganizationItem } from "@/features/organization/components/organization-item";
import { MemberList } from "@/features/member/components/member-list";
import { Heading } from "@/components/heading";

type OrganizationPageProps = {
  params: Promise<{
    organizationId: string;
  }>;
};

const OrganizationPage = async ({ params }:OrganizationPageProps) => {
  const { organizationId } = await params;
  const organization = await getOrganization(organizationId);

  if (!organization) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8 px-6 max-w-5xl mx-auto w-full">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Organizations", href: organizationsPath()},
          { title: organization.name },
        ]}
      />
      <Separator />
      <div className="flex flex-col gap-10 animate-fade-in-from-top">
        <section className="flex flex-col gap-4">
          <Heading title="Organization Details" />
          <OrganizationItem organization={organization} hasActive={organization.hasActive} variant="card" />
        </section>
        <Separator />
        <section className="flex flex-col gap-4">
          <Heading title="Members" />
          <MemberList members={organization.memberships} />
        </section>
      </div>
    </div>
  );
};

export default OrganizationPage;
