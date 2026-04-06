import { CardCompact } from "@/components/card-compact";
import { OrganizationUpsertForm } from "@/features/organization/components/organization-upsert-form";

const OnboardingPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-start items-center mt-[20vh]">
      <CardCompact
        title="Create Organization"
        description="Create an organization to get started"
        classname="w-full max-w-[420px] animate-fade-from-top"
        content={<OrganizationUpsertForm />}
      />
    </div>
  );
};

export default OnboardingPage;
