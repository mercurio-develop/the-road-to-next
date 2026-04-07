import { LucideSquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { organizationPath } from "@/paths";

type OrganizationDetailButtonProps = {
  organizationId: string;
};

const OrganizationDetailButton = ({ organizationId }: OrganizationDetailButtonProps) => (
  <Button asChild variant="outline" size="icon">
    <Link prefetch href={organizationPath(organizationId)}>
      <LucideSquareArrowOutUpRight />
    </Link>
  </Button>
);

export { OrganizationDetailButton };
