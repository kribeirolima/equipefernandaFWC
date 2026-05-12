"use client";
import { Lock } from "lucide-react";
import { SECTIONS } from "@/lib/ordem-dia-config";
import { useOrdemDia } from "@/hooks/useOrdemDia";
import { OdSection } from "./OdSection";
import { PdfExport } from "./PdfExport";

const SECTION_IDS = SECTIONS.map((s) => s.id);

export function OrdemDia() {
  const { store, save, reopen, confirmedCount } = useOrdemDia(SECTION_IDS);

  const infoVals = store["info"]?.values ?? {};
  const diaLabel = infoVals.data || "DIA 1 — Domingo, 14 jun 2026";

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8 space-y-4">

      {/* ── Top bar (screen only) ───────────────────────────────────── */}
      <div className="od-screen-only flex flex-wrap items-center gap-2.5">
        <span
          className="rounded-full px-3 py-1 text-[12px] font-semibold text-white"
          style={{ background: "#1A7A3C" }}
        >
          DIA 1
        </span>
        <span className="flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-semibold text-red-700">
          <Lock className="h-3 w-3" />
          CONFIDENCIAL
        </span>
        <span className="text-[12px] text-[#9CA3AF] ml-auto">
          {confirmedCount} / {SECTIONS.length} seções preenchidas
        </span>
        <PdfExport />
      </div>

      {/* ── Print header (print only) ───────────────────────────────── */}
      <div className="od-print-only od-print-header">
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "11pt" }}>
          <span>EQUIPE BRASIL · FERNANDA GENTIL</span>
          <span>{diaLabel}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#666", fontSize: "9pt", marginTop: "2pt" }}>
          <span>CazéTV — Copa do Mundo FIFA 2026</span>
          <span>CONFIDENCIAL · v1.0</span>
        </div>
        <div style={{ borderTop: "0.5pt solid #ccc", marginTop: "8pt" }} />
      </div>

      {/* ── Section anchor nav (screen only) ────────────────────────── */}
      <div className="od-screen-only sticky top-[57px] z-10 -mx-4 sm:-mx-6 lg:-mx-8 border-b bg-white/95 backdrop-blur px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
          {SECTIONS.map((s) => {
            const confirmed = store[s.id]?.confirmed ?? false;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex-shrink-0 rounded-full border px-3 py-1 text-[10px] font-medium transition-colors"
                style={
                  confirmed
                    ? { background: "#DCFCE7", borderColor: "#1A7A3C", color: "#166534" }
                    : { borderColor: "#E5E7EB", color: "#9CA3AF" }
                }
                onMouseEnter={(e) => {
                  if (!confirmed) {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1A7A3C";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#1A7A3C";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!confirmed) {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E5E7EB";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#9CA3AF";
                  }
                }}
              >
                {s.anchorLabel}
              </a>
            );
          })}
        </div>
      </div>

      {/* ── Sections ────────────────────────────────────────────────── */}
      <div className="space-y-4">
        {SECTIONS.map((sec) => (
          <OdSection
            key={sec.id}
            config={sec}
            values={store[sec.id]?.values ?? {}}
            confirmed={store[sec.id]?.confirmed ?? false}
            onSave={(vals) => save(sec.id, vals)}
            onReopen={() => reopen(sec.id)}
          />
        ))}
      </div>

      {/* ── Print footer (print only) ────────────────────────────────── */}
      <div className="od-print-only" style={{ borderTop: "0.5pt solid #ccc", paddingTop: "6pt", marginTop: "12pt", display: "flex", justifyContent: "space-between", fontSize: "9pt", color: "#666" }}>
        <span>CazéTV | Operações Copa 2026 | CONFIDENCIAL</span>
      </div>
    </div>
  );
}
