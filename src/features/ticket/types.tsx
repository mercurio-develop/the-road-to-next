export type TicketStatus = "OPEN" | "DONE" | "IN_PROGRESS";

export type Ticket = {
  id: number;
  title: string;
  content: string;
  status: TicketStatus;
};
