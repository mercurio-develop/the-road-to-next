import { initialTickets } from "@/app/data";
import { Heading } from "@/components/heading";
import { TicketItem } from "@/features/ticket/components/ticketItem";
import { Ticket } from "@/features/ticket/types";

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />
      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
        {initialTickets.map((ticket: Ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
