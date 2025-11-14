import { initialTickets } from "@/app/data";
import { ticketPath } from "@/app/paths";
import Link from "next/link";
import { Heading } from "@/components/heading";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { LucideCircleCheck, LucideFileText, LucidePencil } from "lucide-react";

const TICKET_ICONS = {
  OPEN: <LucideFileText />,
  IN_PROGRESS: <LucidePencil />,
  DONE: <LucideCircleCheck />,
};

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />
      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
        {initialTickets.map((ticket) => (
          <Card key={ticket.id} className="w-full max-w-[420px]">
            <CardHeader>
              <CardTitle className="flex gap-x-2">
                <span className="size-4 mt-1">
                  {TICKET_ICONS[ticket.status]}
                </span>
                <span className="ml-2 truncate text-2xl">{ticket.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="line-clamp-3 whitespace-break-spaces">
                {ticket.content}
              </span>
            </CardContent>
            <CardFooter>
              <Link
                href={ticketPath(ticket.id.toString())}
                className="text-sm underline"
              >
                view
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
