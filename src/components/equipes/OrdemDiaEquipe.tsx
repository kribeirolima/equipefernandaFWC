"use client";
import { useState, useEffect } from "react";
import { Lock, Clapperboard, Trophy } from "lucide-react";
import { SECTIONS_PROGRAMA, SECTIONS_JOGO } from "@/lib/ordem-dia-config";
import { useOrdemDia } from "@/hooks/useOrdemDia";
import { OdSection } from "@/components/ordem-dia/OdSection";
import { PdfExport } from "@/components/ordem-dia/PdfExport";

type Tipo = "programa" | "jogo";

interface Props {
  storagePrefix: string;
  printName: string;
}

export function OrdemDiaEquipe({ storagePrefix, printName }: Props) {
  const { store, save, reopen } = useOrdemDia(["programa", "jogo"], storagePrefix);

  const [tipo, setTipo] = useState<Tipo>("programa");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`${storagePrefix}_tipo`) as Tipo | null;
      if (saved === "programa" || saved === "jogo") setTipo(saved);
    } catch {}
  }, [storagePrefix]);

  function changeTipo(next: Tipo) {
    setTipo(next);
    try { localStorage.setItem(`${storagePrefix}_tipo`, next); } catch {}
  }

  const sec = (tipo === "programa" ? SECTIONS_PROGRAMA : SECTIONS_JOGO)[0];
  const tipoLabel = tipo === "programa" ? "DIA DE PROGRAMA" : "DIA DE JOGO";

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8 space-y-4">

      {/* ── Top bar (screen only) */}
      <div className="od-screen-only flex flex-wrap items-center gap-2.5">
        <span
          className="rounded-full px-3 py-1 text-[12px] font-semibold text-white"
          style={{ background: "#1A7A3C" }}
        >
          {tipoLabel}
        </span>
        <span className="flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-semibold text-red-700">
          <Lock className="h-3 w-3" />
          CONFIDENCIAL
        </span>
        <div className="ml-auto">
          <PdfExport />
        </div>
      </div>

      {/* ── Tipo selector (screen only) */}
      <div className="od-screen-only flex gap-2">
        <button
          onClick={() => changeTipo("programa")}
          className="flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[12px] font-medium transition-colors"
          style={
            tipo === "programa"
              ? { background: "#1A7A3C", borderColor: "#1A7A3C", color: "#fff" }
              : { background: "#fff", borderColor: "#E5E7EB", color: "#6B7280" }
          }
        >
          <Clapperboard className="h-3.5 w-3.5" />
          Dia de Programa
        </button>
        <button
          onClick={() => changeTipo("jogo")}
          className="flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[12px] font-medium transition-colors"
          style={
            tipo === "jogo"
              ? { background: "#1A7A3C", borderColor: "#1A7A3C", color: "#fff" }
              : { background: "#fff", borderColor: "#E5E7EB", color: "#6B7280" }
          }
        >
          <Trophy className="h-3.5 w-3.5" />
          Dia de Jogo
        </button>
      </div>

      {/* ── Print header */}
      <div className="od-print-only od-print-header">
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "11pt" }}>
          <span>{printName}</span>
          <span>{tipoLabel}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#666", fontSize: "9pt", marginTop: "2pt" }}>
          <span>CazéTV — Copa do Mundo FIFA 2026</span>
          <span>CONFIDENCIAL · v1.0</span>
        </div>
        <div style={{ borderTop: "0.5pt solid #ccc", marginTop: "8pt" }} />
      </div>

      {/* ── Section */}
      <OdSection
        config={sec}
        values={store[sec.id]?.values ?? {}}
        confirmed={store[sec.id]?.confirmed ?? false}
        onSave={(vals) => save(sec.id, vals)}
        onReopen={() => reopen(sec.id)}
      />

      {/* ── Print footer */}
      <div
        className="od-print-only"
        style={{ borderTop: "0.5pt solid #ccc", paddingTop: "6pt", marginTop: "12pt", fontSize: "9pt", color: "#666" }}
      >
        <span>CazéTV | Operações Copa 2026 | CONFIDENCIAL</span>
      </div>
    </div>
  );
}
