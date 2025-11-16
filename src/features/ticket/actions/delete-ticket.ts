"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ticketsPath } from "@/app/paths";
import { revalidatePath } from "next/cache";

export const deleteTicket = async (id: string) => {
  await prisma.ticket.delete({ where: { id } });

  revalidatePath(ticketsPath());
  redirect(ticketsPath());
};
