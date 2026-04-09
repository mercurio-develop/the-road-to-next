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
  const isMyself = user.id === userId;

  const memberships = await getMemberships(organizationId);

  if (memberships.length === 1)
    return toActionState("ERROR", "Cannot delete the last membership");

  const targetMembership = (memberships ?? []).find(
    (membership) => membership.userId === userId,
  );

  if (!targetMembership) return toActionState("ERROR", "Membership not found");

  const adminMembership = (memberships ?? []).filter(
    (membership) => membership.membershipRole === "ADMIN",
  );
  const removesAdmin = targetMembership.membershipRole === "ADMIN";
  const isLastAdmin = adminMembership.length <= 1;

  if (removesAdmin && isLastAdmin)
    return toActionState(
      "ERROR",
      "Cannot remove the last admin of an organization",
    );

  const myMembership = (memberships ?? []).find(
    (membership) => membership.userId === user.id,
  );
  const isAdmin = myMembership?.membershipRole === "ADMIN";

  if (!isAdmin && !isMyself) {
    return toActionState(
      "ERROR",
      "You can only delete memberships as an admin",
    );
  }

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

  return toActionState(
    "SUCCESS",
    isMyself ? "You have left the organization" : "The Membership has been deleted",
  );
};
