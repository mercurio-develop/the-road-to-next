import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { TICKET_ICONS } from "../constants";
import { clsx } from "clsx";
import { toCurrencyFromCent } from "@/utils/currency";
import { TicketMoreMenu } from "@/features/ticket/components/ticket-more-menu";
import { TicketWithMetadata } from "@/features/ticket/type";
import { TicketEditButton } from "@/features/ticket/components/ticket-edit-button";
import { TicketDetailButton } from "@/features/ticket/components/ticket-detail-button";

type TicketItemProps = {
  ticket: TicketWithMetadata;
  comments?: React.ReactNode;
  isDetail?: boolean;
};

const TicketItem = async ({ ticket, comments, isDetail }: TicketItemProps) => {
  const moreMenu = ticket.isOwner && (
    <TicketMoreMenu
      ticketId={ticket.id}
      status={ticket.status}
      canUpdate={ticket.permissions.canUpdateTicket}
      canDelete={ticket.permissions.canDeleteTicket}
    />
  );

  return (
    <div
      className={clsx("w-full flex flex-col gap-y-4", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <div
        className={clsx("flex gap-x-0", {
          "gap-x-2": !isDetail || (ticket.isOwner && isDetail),
        })}
      >
        <Card key={ticket.id} className="w-full overflow-hidden">
          <CardHeader>
            <CardTitle className="flex gap-x-2">
              <span className="size-4 mt-1">{TICKET_ICONS[ticket.status]}</span>
              <span className="ml-2 truncate text-2xl">{ticket.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span
              className={clsx("whitespace-break-spaces", {
                "line-clamp-3": !isDetail,
              })}
            >
              {ticket.content}
            </span>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              {ticket.deadline} by {ticket.user.username}{" "}
            </p>
            <p className="text-sm text-muted-foreground">
              {toCurrencyFromCent(ticket.bounty)}
            </p>
          </CardFooter>
        </Card>
        <div className="flex flex-col gap-y-1">
          {isDetail ? (
            <>
              <TicketEditButton
                ticketId={ticket.id}
                isOwner={ticket.isOwner}
                canUpdate={ticket.permissions.canUpdateTicket}
              />
              {moreMenu}
            </>
          ) : (
            <>
              <TicketDetailButton ticketId={ticket.id} />
              <TicketEditButton
                ticketId={ticket.id}
                isOwner={ticket.isOwner}
                canUpdate={ticket.permissions.canUpdateTicket}
              />
            </>
          )}
        </div>
      </div>
      {comments}
    </div>
  );
};

export { TicketItem };
