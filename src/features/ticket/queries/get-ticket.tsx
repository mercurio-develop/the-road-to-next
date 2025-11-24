import { prisma } from "@/lib/prisma";

export const getTicket = async (ticketId: string) => {
  console.log(ticketId)
  return await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: { user: { select: { username: true } } },
  });
};
