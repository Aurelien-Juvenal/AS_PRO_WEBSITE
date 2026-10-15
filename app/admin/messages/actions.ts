"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function markMessageAsRead(messageId: string) {
  await prisma.message.update({
    where: { id: messageId },
    data: { read: true },
  });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function markAllMessagesAsRead() {
  await prisma.message.updateMany({
    where: { read: false },
    data: { read: true },
  });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}
