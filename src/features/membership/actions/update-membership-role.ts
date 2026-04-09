"use server";

import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { getMemberships } from "@/features/membership/queries/get-memberships";
import { MembershipRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";

export const updateMembershipRole = async (
  organizationId: string,
  userId: string,
  role: MembershipRole,
) => {
  const { user } = await getAdminOrRedirect(organizationId);

  const memberships = await getMemberships(organizationId);
  const myMembership = memberships.find(
    (membership) => membership.userId === user.id,
  );

  const isAdmin = myMembership?.membershipRole === "ADMIN";

  if (!isAdmin) {
    return toActionState(
      "ERROR",
      "You can only update membership roles as an admin",
    );
  }

  const targetMembership = memberships.find(
    (membership) => membership.userId === userId,
  );

  if (!targetMembership) {
    return toActionState("ERROR", "Membership not found");
  }

  // Prevent update the last admin
  if (targetMembership.membershipRole === "ADMIN" && role === "MEMBER") {
    const adminCount = memberships.filter(
      (m) => m.membershipRole === "ADMIN",
    ).length;
    if (adminCount <= 1) {
      return toActionState(
        "ERROR",
        "Cannot update the role of the last admin of an organization",
      );
    }
  }

  try {
    await prisma.membership.update({
      where: {
        membershipId: {
          userId,
          organizationId,
        },
      },
      data: {
        membershipRole: role,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(`/organizations/${organizationId}`);

  return toActionState("SUCCESS", "Membership role updated successfully");
};
