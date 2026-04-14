"use server";

import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import { toActionState } from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { getMembership } from "@/features/membership/queries/get-membership";
import { revalidatePath } from "next/cache";
import { organizationPath } from "@/paths";

export const togglePermission = async ({userId,organizationId,permissionKey}:{
  userId: string,
  organizationId: string,
  permissionKey: "canDeleteTicket",
}) => {
  await getAdminOrRedirect(organizationId);
  const where = {
    membershipId: {
      userId,
      organizationId,
    },
  };

  const membership = await getMembership({ organizationId, userId });

  if (!membership) return toActionState("ERROR", "Membership not found");

  await prisma.membership.update({
    where,
    data: {
      [permissionKey]: membership[permissionKey] !== true,
    },
  });

  revalidatePath(organizationPath(organizationId));

  return toActionState("SUCCESS", "Membership role updated successfully");
};
