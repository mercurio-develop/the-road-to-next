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
  permissionKey: "canDeleteTicket" | "canUpdateTicket",
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

  console.log(membership)
  await prisma.membership.update({
    where,
    data: {
      [permissionKey]: !membership[permissionKey],
    },
  });

  revalidatePath(organizationPath(organizationId));

  return toActionState("SUCCESS", "Membership role updated successfully");
};
