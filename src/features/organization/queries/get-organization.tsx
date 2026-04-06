import { prisma } from "@/lib/prisma";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { notFound } from "next/navigation";

export const getOrganization = async (organizationId: string) => {
  const { user } = await getAuthOrRedirect();

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

  console.log(organization);
  return organization;
};