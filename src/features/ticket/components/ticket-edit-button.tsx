"use client";

import Link from "next/link";
import { LucidePencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ticketEditPath } from "@/paths";
import { TicketWithMetadata } from "@/features/ticket/type";

type TicketEditButtonProps = {
  ticketId: string;
  isOwner: boolean;
  canUpdate: boolean;
};

const TicketEditButton = ({
  ticketId,
  isOwner,
  canUpdate,
}: TicketEditButtonProps) => {
  if (!isOwner && !canUpdate) {
    return null;
  }

  const editButton = (
    <Button
      asChild={canUpdate}
      variant="outline"
      size="icon"
      disabled={!canUpdate}
    >
      {canUpdate ? (
        <Link prefetch href={ticketEditPath(ticketId)}>
          <LucidePencil className="h-4 w-4" />
        </Link>
      ) : (
        <LucidePencil className="h-4 w-4" />
      )}
    </Button>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {canUpdate ? (
          editButton
        ) : (
          <div className="w-fit">{editButton}</div>
        )}
      </TooltipTrigger>
      {!canUpdate && (
        <TooltipContent>
          You do not have permission to update this ticket.
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export { TicketEditButton };
