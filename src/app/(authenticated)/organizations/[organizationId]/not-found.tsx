import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Placeholder } from "@/components/placeholder";
import { organizationsPath } from "@/paths";

export default function NotFound() {
  return (
    <Placeholder
      label="Organization not found"
      button={
        <Button asChild variant="outline">
          <Link href={organizationsPath()}>Go back to Organizations</Link>
        </Button>
      }
    />
  );
}
