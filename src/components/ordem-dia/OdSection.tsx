"use client";
import type { SectionConfig } from "@/lib/ordem-dia-config";
import { OdEditForm } from "./OdEditForm";
import { OdSummary } from "./OdSummary";

interface Props {
  config: SectionConfig;
  values: Record<string, string>;
  confirmed: boolean;
  onSave: (values: Record<string, string>) => void;
  onReopen: () => void;
}

export function OdSection({ config, values, confirmed, onSave, onReopen }: Props) {
  const { Icon, label, id } = config;

  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-xl overflow-hidden"
      style={{ border: "0.5px solid #E5E7EB" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3.5 py-2.5"
        style={{ background: "#F9FAFB", borderBottom: "0.5px solid #E5E7EB" }}
      >
        <div className="flex items-center gap-1.5">
          <Icon style={{ width: 13, height: 13, color: "#1A7A3C" }} />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 500,
              color: "#1A7A3C",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {label}
          </span>
        </div>
        {confirmed ? (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-medium"
            style={{ background: "#DCFCE7", color: "#166534" }}
          >
            ✓ confirmado
          </span>
        ) : (
          <span
            className="od-screen-only rounded-full px-2 py-0.5 text-[10px] font-medium"
            style={{ background: "#FEF9C3", color: "#854D0E" }}
          >
            pendente
          </span>
        )}
      </div>

      {/* Screen body — edit or summary based on confirmed */}
      <div className="bg-white od-screen-only">
        {confirmed ? (
          <OdSummary config={config} values={values} onEdit={onReopen} />
        ) : (
          <OdEditForm config={config} initialValues={values} onSave={onSave} />
        )}
      </div>

      {/* Print body — always summary regardless of confirmed state */}
      <div className="bg-white od-print-only">
        <OdSummary config={config} values={values} onEdit={() => {}} />
      </div>
    </section>
  );
}
