import { prisma } from "@/lib/prisma";
import { CornerUpLeft, Check } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { markMessageAsRead, markAllMessagesAsRead } from "./actions";

function formatDate(date: Date) {
  const isToday = new Date().toDateString() === date.toDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = yesterday.toDateString() === date.toDateString();

  const time = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) return `Aujourd'hui, ${time}`;
  if (isYesterday) return `Hier, ${time}`;
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

export default async function AdminMessagesPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <AdminPageHeader
        title="Messages / Notifications"
        subtitle="Demandes de devis et questions issues du formulaire de contact."
      />

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-gray-900">
          Boîte de réception ({messages.length} messages)
        </h3>
        {unreadCount > 0 && (
          <form action={markAllMessagesAsRead}>
            <button
              type="submit"
              className="text-xs text-emerald-500 hover:underline flex items-center gap-1 font-medium"
            >
              <Check className="w-3.5 h-3.5" /> Tout marquer comme lu
            </button>
          </form>
        )}
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`bg-white p-5 rounded-2xl border border-gray-200/60 shadow-sm flex items-start gap-4 hover:shadow-md transition ${
              message.read ? "opacity-75 hover:opacity-100" : ""
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                message.read ? "bg-transparent" : "bg-emerald-500"
              }`}
            />
            <div
              className={`w-9 h-9 rounded-full font-bold flex items-center justify-center text-xs shrink-0 ${
                message.read
                  ? "bg-gray-100 text-gray-600"
                  : "bg-emerald-50 text-emerald-600"
              }`}
            >
              {message.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="font-bold text-gray-900 text-xs">
                    {message.name}
                  </span>
                  <span className="text-[10px] text-gray-400 ml-2">
                    • {message.email}
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 shrink-0">
                  {formatDate(message.createdAt)}
                </span>
              </div>
              <h4 className="font-bold text-xs text-gray-800 mb-1">
                {message.subject}
              </h4>
              <p className="text-xs text-gray-500 mb-3">{message.body}</p>
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${message.email}?subject=${encodeURIComponent(
                    "Re: " + message.subject
                  )}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
                >
                  <CornerUpLeft className="w-3 h-3" /> Répondre
                </a>
                {!message.read && (
                  <form action={markMessageAsRead.bind(null, message.id)}>
                    <button
                      type="submit"
                      className="text-gray-400 hover:text-emerald-500 text-[10px] font-medium px-3 py-1.5 rounded-lg transition"
                    >
                      Marquer comme lu
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="bg-white p-8 rounded-2xl border border-gray-200/60 text-center text-gray-400 text-xs">
            Aucun message reçu pour l&apos;instant.
          </div>
        )}
      </div>
    </div>
  );
}
