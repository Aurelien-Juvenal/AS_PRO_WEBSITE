import { prisma } from "@/lib/prisma";
import { createClient, deleteClient } from "./actions";
import { Search, Filter, Plus, Trash2 } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default async function AdminClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      interventions: {
        orderBy: { date: "desc" },
        take: 1,
      },
    },
  });

  return (
    <div>
      <AdminPageHeader
        title="Gestion des Clients"
        subtitle="Suivez, modifiez et ajoutez vos clients professionnels AS PRO."
      />

      {/* Barre d'outils */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-3 w-full md:w-auto flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher un client ou entreprise..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
            />
          </div>
          <button className="bg-white border border-gray-200 px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 text-gray-600 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Statut: Tous
          </button>
        </div>
      </div>

      {/* Formulaire d'ajout */}
      <details className="bg-white rounded-2xl border border-gray-200/60 shadow-sm mb-6 group">
        <summary className="cursor-pointer list-none flex items-center justify-between px-6 py-4">
          <span className="text-sm font-bold text-gray-900">
            Ajouter un client
          </span>
          <span className="bg-emerald-500 group-open:bg-gray-200 group-open:text-gray-700 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition">
            <Plus className="w-4 h-4" /> Nouveau
          </span>
        </summary>
        <form
          action={createClient}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 pb-6"
        >
          <input
            name="companyName"
            placeholder="Nom de l'entreprise"
            required
            className="text-xs border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500"
          />
          <input
            name="contactName"
            placeholder="Nom du contact"
            required
            className="text-xs border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="text-xs border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500"
          />
          <input
            name="phone"
            placeholder="Téléphone"
            className="text-xs border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500"
          />
          <input
            name="address"
            placeholder="Adresse"
            className="text-xs border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500 md:col-span-2"
          />
          <button
            type="submit"
            className="md:col-span-2 justify-self-start px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium rounded-lg transition"
          >
            Ajouter le client
          </button>
        </form>
      </details>

      {/* Tableau des clients */}
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4 font-semibold">Entreprise</th>
                <th className="p-4 font-semibold">Contact</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Téléphone</th>
                <th className="p-4 font-semibold">Dernière prestation</th>
                <th className="p-4 font-semibold">Statut</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {clients.map((client) => {
                const lastIntervention = client.interventions[0];
                const isActive =
                  lastIntervention &&
                  Date.now() - lastIntervention.date.getTime() <
                    1000 * 60 * 60 * 24 * 90; // actif si prestation < 90 jours

                return (
                  <tr key={client.id} className="hover:bg-gray-50/50 transition">
                    <td className="p-4 font-bold text-gray-900">
                      {client.companyName}
                    </td>
                    <td className="p-4 text-gray-500">{client.contactName}</td>
                    <td className="p-4 text-gray-400">{client.email}</td>
                    <td className="p-4 text-gray-500">{client.phone || "—"}</td>
                    <td className="p-4 text-gray-500">
                      {lastIntervention
                        ? lastIntervention.date.toLocaleDateString("fr-FR")
                        : "—"}
                    </td>
                    <td className="p-4">
                      {isActive ? (
                        <span className="text-emerald-500 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                          Actif
                        </span>
                      ) : (
                        <span className="text-gray-400 font-semibold bg-gray-100 px-2 py-0.5 rounded-md">
                          Inactif
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <form
                        action={async () => {
                          "use server";
                          await deleteClient(client.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="text-gray-400 hover:text-red-500 transition"
                          aria-label="Supprimer le client"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
              {clients.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400 text-xs">
                    Aucun client pour l&apos;instant.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
