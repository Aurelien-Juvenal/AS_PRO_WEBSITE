import { Calendar } from "lucide-react";

export default function AdminPageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const today = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3 text-xs">
        <span className="bg-white border border-gray-200 px-3 py-1.5 rounded-full flex items-center gap-2 text-gray-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Serveur
          Opérationnel
        </span>
        <span className="bg-white border border-gray-200 px-3 py-1.5 rounded-full flex items-center gap-2 text-gray-600">
          <Calendar className="w-3.5 h-3.5" /> Aujourd&apos;hui, {today}
        </span>
      </div>
    </div>
  );
}
