"use client";
import { useRef, useState } from "react";
import type { VoucherEntry } from "@/hooks/useVoucherData";

interface Props {
  tipo: "pass" | "hosp";
  entry: VoucherEntry | null;
  onSave: (data: Record<string, string>) => void;
  onClear: () => void;
}

const LABELS = {
  pass: { icon: "✈", title: "PASSAGEM" },
  hosp: { icon: "🛏", title: "HOSPEDAGEM" },
};

function PassInfo({ d }: { d: Record<string, string> }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5 text-[12px] font-medium text-gray-800">
        <span>{d.aero_orig || "—"}</span>
        <span className="text-gray-400">→</span>
        <span>{d.aero_dest || "—"}</span>
      </div>
      {(d.cidade_orig || d.cidade_dest) && (
        <div className="text-[11px] text-gray-500">
          {d.cidade_orig} → {d.cidade_dest}
        </div>
      )}
      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-gray-500">
        {d.data && <span>📅 {d.data}</span>}
        {d.saida && <span>Saída {d.saida}</span>}
        {d.chegada && <span>Chegada {d.chegada}</span>}
      </div>
    </div>
  );
}

function HospInfo({ d }: { d: Record<string, string> }) {
  return (
    <div className="space-y-1">
      <div className="text-[12px] font-medium text-gray-800">{d.local || "—"}</div>
      {d.cidade && <div className="text-[11px] text-gray-500">📍 {d.cidade}</div>}
      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-gray-500">
        {d.checkin && <span>Check-in {d.checkin}</span>}
        {d.checkout && <span>Check-out {d.checkout}</span>}
      </div>
    </div>
  );
}

export function VoucherSection({ tipo, entry, onSave, onClear }: Props) {
  const { icon, title } = LABELS[tipo];
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setError("");
    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const res = await fetch("/api/extract-voucher", {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: arrayBuffer,
      });
      if (!res.ok) {
        let msg = `Erro ${res.status}`;
        try { const j = await res.json() as Record<string, string>; msg = j.error ?? msg; } catch {}
        setError(msg);
        return;
      }
      const json = await res.json() as Record<string, string>;
      onSave(json);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span style={{ fontSize: "9px", fontWeight: 600, color: "#1A7A3C", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {icon} {title}
        </span>
        <div className="flex items-center gap-1.5">
          {entry && (
            <button
              onClick={onClear}
              className="text-[9px] text-gray-400 hover:text-red-400 transition-colors"
            >
              remover
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={handleFile} />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={loading}
            className="rounded px-2 py-0.5 text-[9px] font-medium text-[#1A7A3C] transition-colors hover:bg-[#F0FDF4] disabled:opacity-50"
            style={{ border: "0.5px dashed #D1FAE5" }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.borderColor = "#1A7A3C"; }}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#D1FAE5")}
          >
            {loading ? "lendo..." : entry ? "trocar PDF" : "📎 enviar PDF"}
          </button>
        </div>
      </div>

      {/* Content */}
      {error && <p className="text-[10px] text-red-500">{error}</p>}
      {entry ? (
        <div className="rounded-lg p-3" style={{ background: "#F9FAFB", border: "0.5px solid #E5E7EB" }}>
          {tipo === "pass" ? <PassInfo d={entry.data} /> : <HospInfo d={entry.data} />}
        </div>
      ) : (
        <div
          className="rounded-lg p-3 text-center text-[10px] text-gray-400"
          style={{ border: "0.5px dashed #E5E7EB" }}
        >
          nenhum voucher enviado
        </div>
      )}
    </div>
  );
}
