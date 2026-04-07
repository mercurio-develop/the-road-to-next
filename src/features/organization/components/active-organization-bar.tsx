import { getAuth } from "@/features/auth/queries/get-auth";
import { getOrganizationsByUser } from "@/features/organization/queries/get-organizations-by-user";
import { selectActiveOrganizationPath } from "@/paths";
import { LucideBuilding2, LucideArrowLeftRight } from "lucide-react";
import Link from "next/link";

const ActiveOrganizationBar = async () => {
  const { user } = await getAuth();

  if (!user) return null;

  const organizations = await getOrganizationsByUser();
  const activeOrg = organizations.find(
    (org) => org.membershipByUser?.isActive,
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <LucideBuilding2 className="h-3.5 w-3.5 shrink-0" />
          {activeOrg ? (
            <span>
              Active organization:{" "}
              <span className="font-medium text-foreground">
                {activeOrg.name}
              </span>
            </span>
          ) : (
            <span className="italic">No active organization</span>
          )}
        </div>
        <Link
          href={selectActiveOrganizationPath()}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <LucideArrowLeftRight className="h-3 w-3" />
          Switch
        </Link>
      </div>
    </div>
  );
};

export { ActiveOrganizationBar };
