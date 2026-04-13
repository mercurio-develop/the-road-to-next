"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useQueryStates } from "nuqs";
import { filterOptions, filterParser } from "@/features/ticket/search-params";
import { PaginateData } from "@/types/pagination";
import { TicketWithMetadata } from "@/features/ticket/type";

type ticketFilterByOrganizationProps = {
  ticketMetadata: PaginateData<TicketWithMetadata>["metadata"];
};

const TicketFilterByOrganization = ({ticketMetadata}:ticketFilterByOrganizationProps) => {
  const [{ byOrganization }, setByOrganization] = useQueryStates(
    filterParser,
    filterOptions,
  );

  return (
    <div className="flex w-full max-w-[420px] gap-x-2 ml-2">
      <Switch
        id="by-organization"
        aria-label="By Organization"
        name="byOrganization"
        checked={byOrganization}
        onCheckedChange={(checked: boolean) =>
          setByOrganization({ byOrganization: checked })
        }
      />
      <Label htmlFor="my-active-organization">My Active Organization</Label>
    </div>
  );
};
export { TicketFilterByOrganization };
