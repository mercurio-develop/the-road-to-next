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

const upsertOrganizationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Organization name is required" }),
});

export const upsertOrganization = async (
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const { user } = await getAuthOrRedirect({
    checkOrganization: false,
    checkActiveOrganization:false,
  });

  const { id, name } = upsertOrganizationSchema.parse(
    Object.fromEntries(formData),
  );
  try {
    if (id) {
      // Update existing organization
      const organization = await prisma.organization.findUnique({
        where: {
          id,
        },
      });

      if (!organization) {
        return toActionState("ERROR", "Organization not found");
      }

      await prisma.organization.update({
        where: { id },
        data: { name },
      });
    } else {
      // Create new organization

      await prisma.$transaction(async (tx)=>{
        const organization = await tx.organization.create({
          data: {
            name,
            memberships: {
              create: {
                userId: user.id,
                isActive:true,
              },
            },
          },
        });

        await tx.membership.updateMany({
          where:{
            userId:user.id,
            organizationId:{
              not:organization.id
            }
          },
          data:{
            isActive:false
          }
        })
      })

    }
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
  revalidatePath(organizationsPath(), "layout");

  if (id) {
    return toActionState("SUCCESS", "Organization Updated");
  }
  return toActionState("SUCCESS", "Organization Created");
};
