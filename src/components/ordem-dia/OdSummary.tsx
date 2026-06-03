"use client";
import { Pencil } from "lucide-react";
import type { SectionConfig } from "@/lib/ordem-dia-config";

interface Props {
  config: SectionConfig;
  values: Record<string, string>;
  onEdit: () => void;
}

const labelCls = "min-w-[130px] shrink-0 text-[#9CA3AF] text-[10px] pt-0.5 leading-tight";
const valueCls = "text-[#111827] break-words leading-tight";
const emptyCls = "text-[#D1D5DB] italic select-none";

export function OdSummary({ config, values, onEdit }: Props) {
  return (
    <div className="px-3.5 py-3 space-y-3">
      <div className="space-y-1.5">
        {config.groups.flatMap((g) => g.rows).map((row, i) => {
          if (row.type === "timepair") {
            const edt = values[`${row.key}_edt`];
            const brt = values[`${row.key}_brt`];
            return (
              <div key={i} className="flex gap-2 text-[11px]">
                <span className={labelCls}>{row.label}</span>
                <span className={valueCls}>
                  {edt || brt ? (
                    <span className="flex gap-3">
                      <span>{edt ? `🇺🇸 ${edt}` : <span className={emptyCls}>🇺🇸 —</span>}</span>
                      <span>{brt ? `🇧🇷 ${brt}` : <span className={emptyCls}>🇧🇷 —</span>}</span>
                    </span>
                  ) : (
                    <span className={emptyCls}>—</span>
                  )}
                </span>
              </div>
            );
          }
          if (row.type === "full") {
            return (
              <div key={i} className="flex gap-2 text-[11px]">
                <span className={labelCls}>{row.label}</span>
                <span className={valueCls}>
                  {values[row.key] || <span className={emptyCls}>—</span>}
                </span>
              </div>
            );
          }
          return [row.left, row.right].map((f) => (
            <div key={f.key} className="flex gap-2 text-[11px]">
              <span className={labelCls}>{f.label}</span>
              <span className={valueCls}>
                {values[f.key] || <span className={emptyCls}>—</span>}
              </span>
            </div>
          ));
        })}
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
