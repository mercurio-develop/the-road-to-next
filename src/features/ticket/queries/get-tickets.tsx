import { prisma } from "@/lib/prisma";

export const getTickets = async (userId: string | undefined) => {
  return await prisma.ticket.findMany({
    orderBy: { createdAt: "desc" },
    where: { userId },
    include: { user: { select: { username: true } } },
  });
};
