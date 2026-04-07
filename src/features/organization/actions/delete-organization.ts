"use server";

import { z } from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { organizationsPath } from "@/paths";
import { getOrganizationsByUser } from "@/features/organization/queries/get-organizations-by-user";

const deleteOrganizationSchema = z.object({
  id: z.string(),
});

export const deleteOrganization = async (
  id: string,
  _actionState: ActionState,
  formData: FormData,
) => {
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
