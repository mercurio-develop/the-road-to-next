import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";

export const getOrganization = async (organizationId: string) => {
  const { user } = await getAdminOrRedirect(organizationId);

  const hasActive = await prisma.membership
    .count({
      where: { userId: user.id, isActive: true },
    })
    .then((count) => count > 0);

  const organization = await prisma.organization.findUnique({
    where: {
      id: organizationId,
      memberships: {
        some: {
          userId: user.id,
        },
      },
    },
    include: {
      memberships: {
        include: {
          User: {
            select: {
              id: true,
              username: true,
              email: true,
              emailVerified: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
      _count: {
        select: { memberships: true },
      },
    },
  });

  if (!organization) {
    notFound();
  }

  const { memberships, ...rest } = organization;
  const membershipByUser = memberships.find((m) => m.userId === user.id);

  if (!membershipByUser) {
    notFound();
  }

  return {
    ...rest,
    memberships,
    membershipByUser,
    hasActive,
  };
};
