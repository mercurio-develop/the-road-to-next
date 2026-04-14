import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "@/features/ticket/search-params";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { getActiveOrganization } from "@/features/organization/queries/get-active-organization";
import { getOrganizationsByUser } from "@/features/organization/queries/get-organizations-by-user";

export const getTickets = async (
  userId: string | undefined,
  searchParams: ParsedSearchParams,
) => {
  const { user } = await getAuth();
  const activeOrganization = await getActiveOrganization();

  const where = {
    userId,
    title: {
      contains: searchParams.search,
      mode: "insensitive" as const,
    },
    ...(searchParams.byOrganization && activeOrganization
      ? { organizationId: activeOrganization.id }
      : {}),
  };

  const skip = searchParams.size * searchParams.page;
  const take = searchParams.size;
  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      orderBy: {
        [searchParams.sortKey]: searchParams.sortValue,
      },
      where,
      skip,
      take,
      include: { user: { select: { username: true } } },
    }),
    prisma.ticket.count({ where }),
  ]);

  let userTotalCount = undefined;
  if (searchParams.byOrganization && activeOrganization) {
    userTotalCount = await prisma.ticket.count({ where: { userId } });
  }

  const organizationsByUser = await getOrganizationsByUser();

  return {
    list: tickets.map((ticket) => {
      const organization = organizationsByUser.find(
        (org) => org.id === ticket.organizationId,
      );

      return {
        ...ticket,
        isOwner: isOwner(user, ticket),
        permissions: {
          canDeleteTicket:
            isOwner(user, ticket) &&
            !!organization?.membershipByUser.canDeleteTicket,
          canUpdateTicket:
            isOwner(user, ticket) &&
            !!organization?.membershipByUser.canUpdateTicket,
        },
      };
    }),
    metadata: {
      count,
      hasNextPage: count > skip + take,
      cursor: undefined,
      userTotalCount,
    },
  };
};
