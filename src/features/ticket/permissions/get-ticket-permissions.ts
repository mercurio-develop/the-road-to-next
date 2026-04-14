import { prisma } from "@/lib/prisma";

type getTicketPermissions = {
  userId: string | undefined;
  organizationId: string | undefined;
};
export const getTicketPermissions = async ({
  userId,
  organizationId,
}: getTicketPermissions) => {
  if (!userId || !organizationId) {
    return {
      canDeleteTicket: false,
      canUpdateTicket: false,
    };
  }

  const membership = await prisma.membership.findUnique({
    where: {
      membershipId: {
        userId,
        organizationId,
      },
    },
  });

  if (!membership) {
    return {
      canDeleteTicket: false,
      canUpdateTicket: false,
    };
  }

  return {
    canDeleteTicket: membership.canDeleteTicket,
    canUpdateTicket: membership.canUpdateTicket,
  };
};
