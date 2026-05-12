"use client";
import { Pencil, X } from "lucide-react";

interface Props {
  kind: "passagem" | "hospedagem";
  data: Record<string, string>;
  auto?: boolean;
  canRemove: boolean;
  onEdit: () => void;
  onRemove: () => void;
}

function val(v: string | undefined) {
  return v && v.trim() ? v : "—";
}

export function SummaryCard({ kind, data, auto, canRemove, onEdit, onRemove }: Props) {
  return (
    <div className="px-3 py-2.5 space-y-2" style={{ background: "#FAFAFA" }}>
      <div className="flex items-center justify-between">
        {auto ? (
          <span className="rounded-full px-2 py-0.5 text-[9px] font-medium" style={{ background: "#E0F2FE", color: "#0369A1" }}>
            📄 lido do PDF
          </span>
        ) : (
          <span className="rounded-full px-2 py-0.5 text-[9px] font-medium" style={{ background: "#DCFCE7", color: "#166534" }}>
            ✓ confirmado
          </span>
        )}
        <div className="flex items-center gap-2">
          <button onClick={onEdit} className="text-[#D1D5DB] hover:text-[#1A7A3C] transition-colors" title="Editar">
            <Pencil className="h-3 w-3" />
          </button>
          {canRemove && (
            <button onClick={onRemove} className="text-[#D1D5DB] hover:text-[#EF4444] transition-colors" title="Remover">
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {kind === "passagem" ? (
        <div className="space-y-0.5 text-[10px] text-[#6B7280]">
          {data.voo && <p className="font-medium text-gray-700">{data.voo}</p>}
          <p>📅 {val(data.data)} · {val(data.saida)} → {val(data.chegada)}</p>
          <p>✈ {val(data.orig)} → {val(data.dest)}</p>
        </div>
      ) : (
        <div className="space-y-0.5 text-[10px] text-[#6B7280]">
          <p className="font-medium text-gray-700">{val(data.local)}</p>
          {data.end && <p className="text-[9px]">{data.end}</p>}
          <p>📅 Check-in {val(data.checkin)} · Check-out {val(data.checkout)}</p>
        </div>
      )}
    </div>
  );
}
