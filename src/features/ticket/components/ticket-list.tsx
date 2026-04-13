import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTickets } from "@/features/ticket/queries/get-tickets";
import { Placeholder } from "@/components/placeholder";
import { ParsedSearchParams } from "@/features/ticket/search-params";
import { TicketSearchInput } from "@/features/ticket/components/ticket-search-input";
import { TicketSortSelect } from "@/features/ticket/components/ticket-sort-select";
import { TicketPagination } from "@/features/ticket/components/ticket-pagination";
import { TicketFilterByOrganization } from "@/features/ticket/components/ticket-filter-by-organization";

type TicketListProps = {
  userId?: string;
  byOrganization?: boolean;
  searchParams: ParsedSearchParams;
};

const TicketList = async ({
  userId,
  searchParams,
  byOrganization = false,
}: TicketListProps) => {
  const { list: tickets, metadata: ticketMetadata } = await getTickets(
    userId,
    searchParams,
  );
  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      <div className="flex gap-x-2 w-full max-w-[420px]">
        <TicketSearchInput placeholder="Search tickets..." />
        <TicketSortSelect
          options={[
            { label: "Newest", sortKey: "createdAt", sortValue: "desc" },
            { label: "Oldest", sortKey: "createdAt", sortValue: "asc" },
            { label: "Bounty", sortKey: "bounty", sortValue: "desc" },
          ]}
        />
      </div>
      {byOrganization ? (
        <>
          <div className="flex flex-col gap-y-2 w-full max-w-[420px]">
            <TicketFilterByOrganization ticketMetadata={ticketMetadata} />
          </div>
          { ticketMetadata.userTotalCount ?
          <div className="flex w-full max-w-[420px] justify-center">
            <span className="text-sm text-muted-foreground text-center ">
              Showing {ticketMetadata.count} of {ticketMetadata.userTotalCount}{" "}
              total tickets
            </span>
          </div> : null}
        </>
      ) : null}

      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}

      <div className="w-full max-w-[420px]">
        <TicketPagination paginatedTicketMetadata={ticketMetadata} />
      </div>
    </div>
  );
};
export { TicketList };
