import { CardCompact } from "@/components/card-compact";
import { OrganizationUpsertForm } from "@/features/organization/components/organization-upsert-form";
import { notFound } from "next/navigation";
import { getOrganization } from "@/features/organization/queries/get-organization";

type OrganizationEditPageProps = {
  params: Promise<{ organizationId: string }>;
};

const OrganizationEditPage = async ({ params }: OrganizationEditPageProps) => {
  const { organizationId } = await params;
  const organization = await getOrganization(organizationId);

  const isOrganizationFound = !!organization;

  if (!isOrganizationFound) {
    notFound();
  }
  return (
    <div className="flex-1 flex flex-col justify-start items-center mt-[20vh]">
      <CardCompact
        title="Edit Organization"
        description="Edit existing organization"
        classname="w-full max-w-[420px] animate-fade-from-top"
        content={<OrganizationUpsertForm organization={organization} />}
      />
    </div>
  );
};

export default OrganizationEditPage;
