import { Heading } from "@/components/heading";
import { Suspense } from "react";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { Spinner } from "@/components/spinner";
import { CardCompact } from "@/components/card-compact";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { type SearchParams } from "nuqs/server";
import { searchParamsCache } from "@/features/ticket/search-params";

type TicketsByOrganizationPageProps = {
  searchParams: Promise<SearchParams>;
};

const TicketsByOrganizationPage = async ({ searchParams }: TicketsByOrganizationPageProps) => {
  return (
    <>
      <div className="flex-1 flex flex-col gap-y-8">
        <Heading
          title="My Tickets"
          description="All your tickets at one place"
        />
        <CardCompact
          classname="w-full max-w-[420px] self-center"
          title="Create Ticket"
          description="A new ticket will be created"
          content={<TicketUpsertForm />}
        />
        <Suspense fallback={<Spinner />}>
          <TicketList
            byOrganization={false}
            searchParams={searchParamsCache.parse(await searchParams)}
          />
        </Suspense>
      </div>
    </>
  );
};

export default TicketsByOrganizationPage;
