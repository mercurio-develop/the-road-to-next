import { prisma } from "@/lib/prisma";
import { getAuth } from "@/features/auth/queries/get-auth";
import { cache } from "react";

export const getActiveOrganization = cache(async () => {
  const { user } = await getAuth();

  if (!user) return null;

  const activeOrganization = await prisma.organization.findFirst({
    where: {
      memberships: {
        some: {
          userId: user.id,
          isActive: true,
        },
      },
    },
  });

  return activeOrganization;
});
