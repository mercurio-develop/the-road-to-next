import { initialTickets } from "@/app/data";
import { ticketPath } from "@/app/paths";
import Link from "next/link";

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tickets Page</h2>
        <p className="text-sm text-muted-foreground">All your tickets at one place</p>
      </div>
      <div className="flex-1 flex flex-col items-center gap-y-4">
        {initialTickets.map((ticket) => (
          <div key={ticket.id} className="w-full max-w-[420px] p-4 border border-slate-100 rounded ">
            <h3 className="text-lg font-semibold truncate">{ticket.title}</h3>
            <p className="text-sm text-slate-500 truncate">{ticket.content}</p>
            <Link href={ticketPath(ticket.id.toString())} className="text-sm underline">view</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;