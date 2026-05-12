"use client";
import { Check, Pencil, Trash2, Calendar, Plane, Home } from "lucide-react";
import type { FlightFields, HospedagemFields, BlockFields } from "@/hooks/useTravelBlock";

function DataRow({
  Icon,
  text,
}: {
  Icon: React.ElementType;
  text: string;
}) {
  return (
    <div
      className="flex items-center"
      style={{ gap: "5px", minWidth: 0 }}
    >
      <Icon style={{ width: 11, height: 11, color: "#9CA3AF", flexShrink: 0 }} />
      <span
        style={{
          fontSize: "11px",
          color: "#6B7280",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {text}
      </span>
    </div>
  );
}

function FlightSummary({ data }: { data: FlightFields }) {
  const timePart =
    data.saida || data.chegada
      ? `${data.saida || "—"} → ${data.chegada || "—"}`
      : null;
  const calendarText = [data.data, timePart].filter(Boolean).join(" · ") || "—";

  const orig = [data.aero_orig, data.cidade_orig].filter(Boolean).join(" ") || "—";
  const dest = [data.aero_dest, data.cidade_dest].filter(Boolean).join(" ") || "—";
  const planeText = `${orig} → ${dest}`;

  return (
    <>
      <DataRow Icon={Calendar} text={calendarText} />
      <DataRow Icon={Plane} text={planeText} />
    </>
  );
}

function HospedagemSummary({ data }: { data: HospedagemFields }) {
  const homeText =
    [data.local, data.cidade].filter(Boolean).join(" — ") || "—";
  const datesText =
    [
      data.checkin ? `Check-in ${data.checkin}` : null,
      data.checkout ? `Check-out ${data.checkout}` : null,
    ]
      .filter(Boolean)
      .join(" · ") || "—";

  return (
    <>
      <DataRow Icon={Home} text={homeText} />
      <DataRow Icon={Calendar} text={datesText} />
    </>
  );
}

export function SummaryCard({
  blockType,
  data,
  onEdit,
  onDelete,
}: {
  blockType: "flight" | "hospedagem";
  data: BlockFields;
  onEdit: () => void;
  onDelete?: () => void;
}) {
  return (
    <div
      style={{
        background: "#FAFAFA",
        border: "0.5px solid #E5E7EB",
        borderRadius: "7px",
        padding: "9px 10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "8px",
      }}
    >
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        }}
      >
        {/* Badge */}
        <div style={{ marginBottom: "1px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "3px",
              background: "#DCFCE7",
              color: "#166534",
              fontSize: "9px",
              fontWeight: 500,
              padding: "1px 6px",
              borderRadius: "20px",
            }}
          >
            <Check style={{ width: 9, height: 9 }} />
            confirmado
          </span>
        </div>

        {blockType === "flight" ? (
          <FlightSummary data={data as FlightFields} />
        ) : (
          <HospedagemSummary data={data as HospedagemFields} />
        )}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2px", flexShrink: 0, marginTop: "1px" }}>
        <button
          onClick={onEdit}
          title="Editar"
          style={{
            padding: "2px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#D1D5DB",
            display: "flex",
            alignItems: "center",
            transition: "color 0.1s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1A7A3C")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
        >
          <Pencil style={{ width: 13, height: 13 }} />
        </button>
        {onDelete && (
          <button
            onClick={onDelete}
            title="Remover"
            style={{
              padding: "2px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#D1D5DB",
              display: "flex",
              alignItems: "center",
              transition: "color 0.1s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#EF4444")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
          >
            <Trash2 style={{ width: 12, height: 12 }} />
          </button>
        )}
      </div>
    </div>
  );
}
