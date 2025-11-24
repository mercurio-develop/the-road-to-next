import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ticketsPath } from "@/app/paths";
import { Separator } from "@/components/ui/separator";
import { CardCompact } from "@/components/card-compact";
import { CommentUpsertForm } from "@/features/comment/components/coment-upsert-form";
import { CommentList } from "@/features/comment/components/comment-list";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8 ml-10">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: ticketsPath() },
          { title: ticket.title },
        ]}
      />
      <Separator/>
      <div className="flex justify-center animate-fade-in-from-top">
        <TicketItem ticket={ticket} isDetail />
      </div>
      <div className="flex justify-center">
        <CardCompact
          classname="w-full max-w-[580px] self-center"
          title="New Comment"
          description="A new comment will be created"
          content={<CommentUpsertForm ticketId={ticket.id}/>}
        />
      </div>
      <div className="flex justify-center">
        <CommentList ticketId={ticket.id}/>
      </div>
    </div>
  );
};

export default TicketPage;
