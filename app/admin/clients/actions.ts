"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createClient(formData: FormData) {
  const companyName = formData.get("companyName") as string;
  const contactName = formData.get("contactName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;

  if (!companyName || !contactName || !email) {
    throw new Error("Nom de l'entreprise, contact et email sont requis.");
  }

  await prisma.client.create({
    data: { companyName, contactName, email, phone, address },
  });

  revalidatePath("/admin/clients");
}

export async function deleteClient(clientId: string) {
  await prisma.client.delete({ where: { id: clientId } });
  revalidatePath("/admin/clients");
}
