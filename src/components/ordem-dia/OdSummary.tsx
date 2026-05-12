"use client";
import { Pencil } from "lucide-react";
import type { SectionConfig } from "@/lib/ordem-dia-config";
import { allFieldsOf } from "@/lib/ordem-dia-config";

interface Props {
  config: SectionConfig;
  values: Record<string, string>;
  onEdit: () => void;
}

export function OdSummary({ config, values, onEdit }: Props) {
  const fields = allFieldsOf(config);
  return (
    <div className="px-3.5 py-3 space-y-3">
      <div className="space-y-1.5">
        {fields.map(({ key, label }) => (
          <div key={key} className="flex gap-2 text-[11px]">
            <span className="min-w-[120px] shrink-0 text-[#9CA3AF] text-[10px] pt-0.5 leading-tight">
              {label}
            </span>
            <span className="text-[#111827] break-words leading-tight">
              {values[key] ? (
                values[key]
              ) : (
                <span className="text-[#D1D5DB] italic select-none">—</span>
              )}
            </span>
          </div>
        ))}
      </div>
      <button
        onClick={onEdit}
        className="od-screen-only flex items-center gap-1.5 text-[11px] text-[#9CA3AF] hover:text-[#1A7A3C] transition-colors"
      >
        <Pencil className="h-3 w-3" />
        editar
      </button>
    </div>
  );
}
