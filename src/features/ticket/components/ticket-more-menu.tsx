"use client";

import { TicketStatus } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideMoreVertical } from "lucide-react";
import { TICKET_STATUS_LABELS } from "@/features/ticket/constants";
import { updateTicketStatus } from "@/features/ticket/actions/update-ticket-status";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TicketDeleteMenuItem } from "@/features/ticket/components/ticket-delete-menu-item";

type TicketMoreMenuProps = {
  ticketId: string;
  status: TicketStatus;
  canUpdate: boolean;
  canDelete: boolean;
};

const TicketMoreMenu = ({
  ticketId,
  status,
  canUpdate,
  canDelete,
}: TicketMoreMenuProps) => {
  const [isTransitionPending, startTransition] = useTransition();

  const handleUpdateTicketStatus = (value: string) => {
    const newStatus = value as TicketStatus;
    if (newStatus === status) return;

    startTransition(async () => {
      const result = await updateTicketStatus(ticketId, newStatus);
      if (result.status === "SUCCESS") {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline" disabled={isTransitionPending}>
            <LucideMoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36" align="end">
          <DropdownMenuRadioGroup
            value={status}
            onValueChange={handleUpdateTicketStatus}
          >
            {(Object.keys(TICKET_STATUS_LABELS) as Array<TicketStatus>).map(
              (key) => (
                <Tooltip key={key}>
                  <TooltipTrigger asChild={canUpdate}>
                    <DropdownMenuRadioItem
                      key={key}
                      value={key}
                      disabled={isTransitionPending || !canUpdate}
                    >
                      {TICKET_STATUS_LABELS[key]}
                    </DropdownMenuRadioItem>
                  </TooltipTrigger>
                  {!canUpdate && (
                    <TooltipContent>
                      <span>
                        You do not have permission to update this ticket.
                      </span>
                    </TooltipContent>
                  )}
                </Tooltip>
              ),
            )}
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <TicketDeleteMenuItem
            ticketId={ticketId}
            canDelete={canDelete}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { TicketMoreMenu };
