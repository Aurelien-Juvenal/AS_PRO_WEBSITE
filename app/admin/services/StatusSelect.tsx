"use client";

import { useTransition } from "react";
import { updateInterventionStatus } from "./actions";
import type { InterventionStatus } from "@prisma/client";

const STATUS_LABELS: Record<InterventionStatus, string> = {
  PLANIFIE: "Planifié",
  EN_COURS: "En cours",
  TERMINE: "Terminé",
  ANNULE: "Annulé",
};

export default function StatusSelect({
  interventionId,
  status,
}: {
  interventionId: string;
  status: InterventionStatus;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(e) =>
        startTransition(() =>
          updateInterventionStatus(
            interventionId,
            e.target.value as InterventionStatus
          )
        )
      }
      className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-emerald-500 bg-white disabled:opacity-50"
    >
      {Object.entries(STATUS_LABELS).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
