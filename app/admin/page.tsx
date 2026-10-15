import { prisma } from "@/lib/prisma";
import { Users, SlidersHorizontal, Mail, TrendingUp, RotateCw } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

function timeAgo(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Hier";
  return `Il y a ${days} jours`;
}

export default async function AdminDashboardPage() {
  const [clientCount, interventionsInProgress, unreadMessages, monthlyRevenue] =
    await Promise.all([
      prisma.client.count(),
      prisma.intervention.count({ where: { status: "EN_COURS" } }),
      prisma.message.count({ where: { read: false } }),
      prisma.intervention.aggregate({
        _sum: { amount: true },
        where: {
          date: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
    ]);

  const revenue = monthlyRevenue._sum.amount?.toNumber() ?? 0;

  const stats = [
    { label: "TOTAL CLIENTS", value: clientCount.toString(), icon: Users },
    {
      label: "PRESTATIONS EN COURS",
      value: interventionsInProgress.toString(),
      icon: SlidersHorizontal,
    },
    {
      label: "MESSAGES NON LUS",
      value: unreadMessages.toString(),
      icon: Mail,
    },
    {
      label: "CA MENSUEL",
      value: `${revenue.toLocaleString("fr-FR")} Ar`,
      icon: TrendingUp,
    },
  ];

  // Dernières activités : derniers clients, prestations et messages, fusionnés et triés
  const [recentClients, recentInterventions, recentMessages] = await Promise.all([
    prisma.client.findMany({ orderBy: { createdAt: "desc" }, take: 3 }),
    prisma.intervention.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
      include: { client: true },
    }),
    prisma.message.findMany({ orderBy: { createdAt: "desc" }, take: 3 }),
  ]);

  const activity = [
    ...recentClients.map((c) => ({
      date: c.createdAt,
      title: "Nouveau client enregistré",
      detail: c.companyName,
    })),
    ...recentInterventions.map((i) => ({
      date: i.createdAt,
      title: "Prestation enregistrée",
      detail: i.client.companyName,
    })),
    ...recentMessages.map((m) => ({
      date: m.createdAt,
      title: "Message reçu via formulaire",
      detail: `${m.name} — ${m.subject}`,
    })),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  return (
    <div>
      <AdminPageHeader
        title="Tableau de bord"
        subtitle="Bienvenue dans votre espace d'administration de nettoyage."
      />

      {/* Cartes KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-white p-5 rounded-2xl border border-gray-200/60 shadow-sm flex justify-between items-start"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                {label}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 my-1">{value}</h3>
            </div>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <Icon className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Graphique & Activités */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-bold text-gray-900 text-sm">
                Évolution du Chiffre d&apos;Affaires
              </h4>
              <p className="text-[10px] text-gray-400">
                Données mensuelles cumulées
              </p>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full font-medium">
              Objectif atteint
            </span>
          </div>

          <div className="h-64 flex items-end">
            <svg
              className="w-full h-full text-emerald-500"
              viewBox="0 0 500 150"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M 0,110 L 40,90 L 80,100 L 120,65 L 160,75 L 200,50 L 240,40 L 280,50 L 320,30 L 360,20 L 400,25"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="flex justify-between text-[10px] text-gray-400 mt-4 border-t border-gray-100 pt-3">
            {["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"].map(
              (m) => (
                <span key={m}>{m}</span>
              )
            )}
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-gray-900 text-sm">
              Activités Récentes
            </h4>
            <RotateCw className="w-4 h-4 text-gray-400" />
          </div>

          <div className="space-y-6 text-xs">
            {activity.length === 0 && (
              <p className="text-gray-400 text-xs">
                Aucune activité pour l&apos;instant.
              </p>
            )}
            {activity.map((item, idx) => (
              <div
                key={idx}
                className="relative pl-4 border-l-2 border-emerald-500"
              >
                <p className="text-[10px] text-gray-400">{timeAgo(item.date)}</p>
                <p className="font-bold text-gray-800">{item.title}</p>
                <p className="text-emerald-500 text-[11px]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
