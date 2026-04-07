import { LucidePencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { organizationEditPath } from "@/paths";

type EditOrganizationButtonProps = {
  organizationId: string;
};

const EditOrganizationButton = ({ organizationId }: EditOrganizationButtonProps) => (
  <Button asChild variant="outline" size="icon">
    <Link prefetch href={organizationEditPath(organizationId)}>
      <LucidePencil />
    </Link>
  </Button>
);

export { EditOrganizationButton };
