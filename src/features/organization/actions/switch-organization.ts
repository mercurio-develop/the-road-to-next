'use server'

import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { organizationsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";


export const switchOrganization = async (organizationId: string) =>{
  const { user } = await getAuthOrRedirect();

  try{


    await prisma.membership.updateMany({
      where:{
        userId:user.id,
        organizationId:{
          not:organizationId
        }
      },
      data:{
        isActive:false
      }
    })

    await prisma.membership.update({
      where:{
        organizationId_userId:{
          userId:user.id,
          organizationId
        }
      },
      data:{
        isActive:true
      }
    })
  }catch(error){
    return fromErrorToActionState(error);
  }

  revalidatePath(organizationsPath());

  return toActionState("SUCCESS", "Active organization has been switched");
}