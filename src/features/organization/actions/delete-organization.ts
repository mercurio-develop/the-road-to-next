"use server";

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { getOrganizationsByUser } from "@/features/organization/queries/get-organizations-by-user";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";

export const deleteOrganization = async (
  id: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  await getAdminOrRedirect(id);

  try {
    if (!id) {
      return toActionState("ERROR", "No Organization Selected");
    }

    const organizations = await getOrganizationsByUser();
    const canDelete = organizations.some(
      (organization) => organization.id === id,
    );
    if (!canDelete) {
      return toActionState("ERROR", "Organization not found");
    }

    await prisma.organization.delete({
      where: { id },
    });

    return toActionState("SUCCESS", "Organization deleted");
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
};
