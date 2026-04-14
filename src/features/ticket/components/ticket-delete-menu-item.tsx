"use client";

import { deleteTicket } from "@/features/ticket/actions/delete-ticket";
import { UseConfirmDialog } from "@/components/confirm-dialog";
import { LucideTrash } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { TicketWithMetadata } from "@/features/ticket/type";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TicketDeleteMenuItemProps = {
  ticketId: string;
  canDelete: boolean;
};

const TicketDeleteMenuItem = ({
  ticketId,
  canDelete,
}: TicketDeleteMenuItemProps) => {
  const [deleteButton, deleteDialog] = UseConfirmDialog({
    action: deleteTicket.bind(null, ticketId),
    trigger: (isPending) => (
      <DropdownMenuItem
        className="text-destructive focus:text-destructive"
        disabled={!canDelete}
        onSelect={(e) => e.preventDefault()}
      >
        <LucideTrash className="mr-2 h-4 w-4" />
        <span>{isPending ? "Deleting..." : "Delete"}</span>
      </DropdownMenuItem>
    ),
  });

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild={canDelete}>
          {deleteButton}
        </TooltipTrigger>
        {!canDelete && (
          <TooltipContent>
            <span>You do not have permission to delete this ticket.</span>
          </TooltipContent>
        )}
      </Tooltip>
      {deleteDialog}
    </>
  );
};

export { TicketDeleteMenuItem };
