"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { InterventionStatus, ServiceType } from "@prisma/client";

export async function createIntervention(formData: FormData) {
  const clientId = formData.get("clientId") as string;
  const type = formData.get("type") as ServiceType;
  const date = formData.get("date") as string;
  const notes = formData.get("notes") as string;
  const amountRaw = formData.get("amount") as string;

  if (!clientId || !type || !date) {
    throw new Error("Client, type de prestation et date sont requis.");
  }

  await prisma.intervention.create({
    data: {
      clientId,
      type,
      date: new Date(date),
      notes: notes || null,
      amount: amountRaw ? Number(amountRaw) : null,
    },
  });

  revalidatePath("/admin/services");
}

export async function updateInterventionStatus(
  interventionId: string,
  status: InterventionStatus
) {
  await prisma.intervention.update({
    where: { id: interventionId },
    data: { status },
  });
  revalidatePath("/admin/services");
}
