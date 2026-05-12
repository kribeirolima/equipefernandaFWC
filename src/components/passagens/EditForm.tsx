"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import type { FlightFields, HospedagemFields, BlockFields } from "@/hooks/useTravelBlock";

function Field({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col" style={{ gap: "3px" }}>
      <label
        style={{
          fontSize: "9px",
          fontWeight: 500,
          color: "#9CA3AF",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          border: "0.5px solid #E5E7EB",
          borderRadius: "4px",
          padding: "4px 6px",
          fontSize: "11px",
          color: "#111827",
          background: "#FFFFFF",
          outline: "none",
          width: "100%",
        }}
        className="placeholder:text-[#D1D5DB] placeholder:italic transition-[border-color] duration-100"
        onFocus={(e) => (e.currentTarget.style.border = "1px solid #1A7A3C")}
        onBlur={(e) => (e.currentTarget.style.border = "0.5px solid #E5E7EB")}
      />
    </div>
  );
}

function FlightForm({
  data,
  onChange,
}: {
  data: FlightFields;
  onChange: (key: keyof FlightFields, value: string) => void;
}) {
  return (
    <div className="flex flex-col" style={{ gap: "7px" }}>
      <Field
        label="Data"
        value={data.data}
        placeholder="ex: 12 jun 2026"
        onChange={(v) => onChange("data", v)}
      />
      <div className="grid grid-cols-2" style={{ gap: "5px" }}>
        <Field
          label="Horário saída"
          value={data.saida}
          placeholder="ex: 08h45"
          onChange={(v) => onChange("saida", v)}
        />
        <Field
          label="Horário chegada"
          value={data.chegada}
          placeholder="ex: 14h20"
          onChange={(v) => onChange("chegada", v)}
        />
      </div>
      <div className="grid grid-cols-2" style={{ gap: "5px" }}>
        <Field
          label="Aeroporto saída"
          value={data.aero_orig}
          placeholder="ex: GRU"
          onChange={(v) => onChange("aero_orig", v)}
        />
        <Field
          label="Cidade saída"
          value={data.cidade_orig}
          placeholder="ex: São Paulo"
          onChange={(v) => onChange("cidade_orig", v)}
        />
      </div>
      <div className="grid grid-cols-2" style={{ gap: "5px" }}>
        <Field
          label="Aeroporto destino"
          value={data.aero_dest}
          placeholder="ex: JFK"
          onChange={(v) => onChange("aero_dest", v)}
        />
        <Field
          label="Cidade destino"
          value={data.cidade_dest}
          placeholder="ex: Nova York"
          onChange={(v) => onChange("cidade_dest", v)}
        />
      </div>
    </div>
  );
}

function HospedagemForm({
  data,
  onChange,
}: {
  data: HospedagemFields;
  onChange: (key: keyof HospedagemFields, value: string) => void;
}) {
  return (
    <div className="flex flex-col" style={{ gap: "7px" }}>
      <Field
        label="Local / endereço"
        value={data.local}
        placeholder="ex: Hotel Renata — 194 Park Ave"
        onChange={(v) => onChange("local", v)}
      />
      <div className="grid grid-cols-2" style={{ gap: "5px" }}>
        <Field
          label="Check-in"
          value={data.checkin}
          placeholder="ex: 12 jun"
          onChange={(v) => onChange("checkin", v)}
        />
        <Field
          label="Check-out"
          value={data.checkout}
          placeholder="ex: 18 jul"
          onChange={(v) => onChange("checkout", v)}
        />
      </div>
      <Field
        label="Cidade / País"
        value={data.cidade}
        placeholder="ex: Nova York, EUA"
        onChange={(v) => onChange("cidade", v)}
      />
    </div>
  );
}

export function EditForm({
  blockType,
  initialData,
  onConfirm,
}: {
  blockType: "flight" | "hospedagem";
  initialData: BlockFields;
  onConfirm: (data: BlockFields) => void;
}) {
  const [form, setForm] = useState<BlockFields>(initialData);

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "0.5px solid #E5E7EB",
        borderRadius: "7px",
        padding: "9px 10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {blockType === "flight" ? (
        <FlightForm
          data={form as FlightFields}
          onChange={(k, v) => update(k, v)}
        />
      ) : (
        <HospedagemForm
          data={form as HospedagemFields}
          onChange={(k, v) => update(k, v)}
        />
      )}

      <button
        onClick={() => onConfirm(form)}
        style={{
          width: "100%",
          background: "#1A7A3C",
          color: "#FFFFFF",
          borderRadius: "5px",
          padding: "5px",
          fontSize: "11px",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          border: "none",
          cursor: "pointer",
          transition: "background 0.1s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#166534")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#1A7A3C")}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <Check style={{ width: 11, height: 11 }} />
        ok, salvar
      </button>
    </div>
  );
}
