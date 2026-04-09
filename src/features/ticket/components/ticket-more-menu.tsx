"use client";

import { Ticket, TicketStatus } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideTrash, LucideMoreVertical } from "lucide-react";
import { TICKET_STATUS_LABELS } from "@/features/ticket/constants";
import { updateTicketStatus } from "@/features/ticket/actions/update-ticket-status";
import { toast } from "sonner";
import { UseConfirmDialog } from "@/components/confirm-dialog";
import { deleteTicket } from "@/features/ticket/actions/delete-ticket";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

type TicketMoreMenuProps = {
  ticket: Ticket;
};

const TicketMoreMenu = ({ ticket }: TicketMoreMenuProps) => {
  const [isTransitionPending, startTransition] = useTransition();

  const [deleteButton, deleteDialog] = UseConfirmDialog({
    action: deleteTicket.bind(null, ticket.id),
    trigger: (isPending) => (
      <DropdownMenuItem className="text-destructive focus:text-destructive">
        <LucideTrash className="mr-2 h-4 w-4" />
        <span>{isPending ? "Deleting..." : "Delete"}</span>
      </DropdownMenuItem>
    ),
  });

  const handleUpdateTicketStatus = (value: string) => {
    const newStatus = value as TicketStatus;
    if (newStatus === ticket.status) return;

    startTransition(async () => {
      const result = await updateTicketStatus(ticket.id, newStatus);
      if (result.status === "SUCCESS") {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <>
      {deleteDialog}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline" disabled={isTransitionPending}>
            <LucideMoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuRadioGroup
            value={ticket.status}
            onValueChange={handleUpdateTicketStatus}
          >
            {(Object.keys(TICKET_STATUS_LABELS) as Array<TicketStatus>).map((key) => (
              <DropdownMenuRadioItem key={key} value={key} disabled={isTransitionPending}>
                {TICKET_STATUS_LABELS[key]}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { TicketMoreMenu };
