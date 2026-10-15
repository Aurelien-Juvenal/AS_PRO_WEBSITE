import AdminSidebar from "@/components/admin/Sidebar";
import { prisma } from "@/lib/prisma";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const unreadMessages = await prisma.message.count({
    where: { read: false },
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar unreadMessages={unreadMessages} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
