"use client";
import { Pencil, X } from "lucide-react";

interface Props {
  kind: "passagem" | "hospedagem";
  data: Record<string, string>;
  canRemove: boolean;
  onEdit: () => void;
  onRemove: () => void;
}

function val(v: string | undefined) {
  return v && v.trim() ? v : "—";
}

export function SummaryCard({ kind, data, canRemove, onEdit, onRemove }: Props) {
  return (
    <div className="px-3 py-2.5 space-y-2" style={{ background: "#FAFAFA" }}>
      <div className="flex items-center justify-between">
        <span
          className="rounded-full px-2 py-0.5 text-[9px] font-medium"
          style={{ background: "#DCFCE7", color: "#166534" }}
        >
          ✓ confirmado
        </span>
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
          <p>📅 {val(data.data)} · {val(data.saida)} → {val(data.chegada)}</p>
          <p>✈ {val(data.aero_orig)} {val(data.cidade_orig)} → {val(data.aero_dest)} {val(data.cidade_dest)}</p>
        </div>
      ) : (
        <div className="space-y-0.5 text-[10px] text-[#6B7280]">
          <p>🛏 {val(data.local)}{data.cidade ? ` — ${data.cidade}` : ""}</p>
          <p>📅 Check-in {val(data.checkin)} · Check-out {val(data.checkout)}</p>
        </div>
      )}
    </div>
  );
}
