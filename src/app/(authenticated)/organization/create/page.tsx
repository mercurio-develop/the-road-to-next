import { CardCompact } from "@/components/card-compact";
import { OrganizationUpsertForm } from "@/features/organization/components/organization-upsert-form";

const OrganizationCreatePage = () => {
  return (
    <div className="flex-1 flex flex-col justify-start items-center mt-[20vh]">
      <CardCompact
        title="Create Organization"
        description="Create a new organization for your team"
        classname="w-full max-w-[420px] animate-fade-from-top"
        content={<OrganizationUpsertForm />}
      />
    </div>
  );
};

export default OrganizationCreatePage;
