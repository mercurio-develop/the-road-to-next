import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { OrganizationList } from "@/features/organization/components/organization-list";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { organizationCreatePath } from "@/paths";
import Link from "next/link";
import { LucidePlus } from "lucide-react";

const OrganizationPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Organization"
        description="All your organizations"
        actions={
          <Button asChild>
            <Link href={organizationCreatePath()}>
              <LucidePlus className="w-4 h-4" />
              Create Organization
            </Link>
          </Button>
        }
      />
      <Suspense fallback={<Spinner />}>
        <OrganizationList />
      </Suspense>
    </div>
  );
};

export default OrganizationPage;
