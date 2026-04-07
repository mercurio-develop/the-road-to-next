"use server";

import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { getMemberships } from "@/features/membership/queries/get-memberships";

export const deleteMembership = async (
  organizationId: string,
  userId: string,
) => {
  const { user } = await getAuthOrRedirect();
  const isSelf = user.id === userId;

  const memberships = await getMemberships(organizationId);

  if (memberships.length === 1)
    return toActionState("ERROR", "Cannot delete the last membership");

  try {
    await prisma.membership.delete({
      where: {
        membershipId: {
          userId,
          organizationId,
        },
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  return toActionState("SUCCESS", isSelf ? "Left organization" : "Member deleted");
};
