"use server";

import { prisma } from "@/lib/prisma";

export async function sendContactMessage(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const body = formData.get("message") as string;

  if (!name || !email || !subject || !body) {
    return { success: false, error: "Merci de remplir tous les champs." };
  }

  await prisma.message.create({
    data: { name, email, subject, body },
  });

  return { success: true };
}
