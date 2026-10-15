import { prisma } from "@/lib/prisma";
import { createIntervention } from "./actions";
import StatusSelect from "./StatusSelect";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

const SERVICE_LABELS: Record<string, string> = {
  BUREAUX: "Nettoyage de bureaux",
  COMMERCES: "Nettoyage de commerces",
  INDUSTRIEL: "Nettoyage industriel",
  ESPACES_COMMUNS: "Espaces communs",
  VITRES: "Nettoyage de vitres",
  DESINFECTION: "Désinfection & assainissement",
};

export default async function AdminServicesPage() {
  const [interventions, clients] = await Promise.all([
    prisma.intervention.findMany({
      orderBy: { date: "desc" },
      include: { client: true },
    }),
    prisma.client.findMany({ orderBy: { companyName: "asc" } }),
  ]);

  return (
    <div>
      <AdminPageHeader
        title="Prestations"
        subtitle="Historique et suivi des prestations réalisées pour chaque client."
      />

      {/* Formulaire d'ajout */}
      <form
        action={createIntervention}
        className="bg-white p-6 rounded-2xl border border-gray-100 mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <select
          name="clientId"
          required
          defaultValue=""
          className="text-xs border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500"
        >
          <option value="" disabled>
            Sélectionner un client
          </option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.companyName}
            </option>
          ))}
        </select>

        <select
          name="type"
          required
          defaultValue=""
          className="text-xs border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500"
        >
          <option value="" disabled>
            Type de prestation
          </option>
          {Object.entries(SERVICE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <input
          name="date"
          type="date"
          required
          className="text-xs border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500"
        />

        <input
          name="amount"
          type="number"
          step="0.01"
          placeholder="Montant (Ar)"
          className="text-xs border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500"
        />

        <input
          name="notes"
          placeholder="Notes (optionnel)"
          className="text-xs border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500 lg:col-span-2"
        />

        <button
          type="submit"
          className="justify-self-start px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium rounded-lg transition"
        >
          Enregistrer la prestation
        </button>
      </form>

      {/* Tableau des prestations */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="text-left px-6 py-3">Client</th>
              <th className="text-left px-6 py-3">Type</th>
              <th className="text-left px-6 py-3">Date</th>
              <th className="text-left px-6 py-3">Montant</th>
              <th className="text-left px-6 py-3">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {interventions.map((intervention) => (
              <tr key={intervention.id}>
                <td className="px-6 py-3 font-medium text-gray-900">
                  {intervention.client.companyName}
                </td>
                <td className="px-6 py-3 text-gray-600">
                  {SERVICE_LABELS[intervention.type]}
                </td>
                <td className="px-6 py-3 text-gray-600">
                  {intervention.date.toLocaleDateString("fr-FR")}
                </td>
                <td className="px-6 py-3 text-gray-600">
                  {intervention.amount
                    ? `${intervention.amount.toNumber().toLocaleString("fr-FR")} Ar`
                    : "—"}
                </td>
                <td className="px-6 py-3">
                  <StatusSelect
                    interventionId={intervention.id}
                    status={intervention.status}
                  />
                </td>
              </tr>
            ))}
            {interventions.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-400 text-xs">
                  Aucune prestation enregistrée pour l&apos;instant.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
