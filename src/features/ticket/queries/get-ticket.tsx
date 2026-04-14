import { prisma } from "@/lib/prisma";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { getActiveOrganization } from "@/features/organization/queries/get-active-organization";
import { getActiveMembership } from "@/features/membership/queries/get-active-membership";
import { getTicketPermissions } from "@/features/ticket/permissions/get-ticket-permissions";

export const getTicket = async (ticketId: string) => {
  const { user } = await getAuth();

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: { user: { select: { username: true } } },
  });

  if (!ticket) return null;

  const permissions = await getTicketPermissions({
    userId: user?.id,
    organizationId: ticket.organizationId,
  });

  return {
    ...ticket,
    isOwner: isOwner(user, ticket),
    permissions: {
      canDeleteTicket: isOwner(user, ticket) && !!permissions.canDeleteTicket,
      canUpdateTicket: isOwner(user,ticket) && !!permissions.canUpdateTicket
    },
  };
};
