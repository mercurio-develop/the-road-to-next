import Link from "next/link";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/app/paths";
import { TicketItem } from "@/features/ticket/components/ticketItem";
import { getTicket } from "@/features/ticket/queries/getTicket";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const ticket = await getTicket(Number(ticketId));

  if (!ticket) {
    return (
      <Placeholder
        label="Ticket not found"
        button={
          <Button asChild variant="outline">
            <Link href={ticketsPath()}>Go back to tickets</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex-1 justify-items-center animate-fade-in-from-top">
      <TicketItem ticket={ticket} isDetail />
    </div>
  );
};

export default TicketPage;
