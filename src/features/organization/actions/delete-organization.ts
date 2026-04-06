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
    const { user } = await getAuthOrRedirect({ checkOrganization: false });

    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    });

    if (!organization) {
      return toActionState("ERROR", "Organization not found");
    }

    await prisma.organization.delete({
      where: { id },
    });

    revalidatePath(organizationsPath());

    return toActionState("SUCCESS", "Organization deleted successfully");
  } catch (error) {
    return fromErrorToActionState(error,formData);
  }
};
