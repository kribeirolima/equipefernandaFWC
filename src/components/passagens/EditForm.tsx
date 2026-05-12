"use client";
import { useState } from "react";
import { Check } from "lucide-react";

const FLIGHT_FIELDS = [
  { type: "full" as const, key: "data",       label: "Data",                placeholder: "ex: 12 jun 2026"           },
  { type: "pair" as const, keys: ["saida",      "chegada"],     labels: ["Horário saída",     "Horário chegada"],   placeholders: ["ex: 08h45",   "ex: 14h20"]    },
  { type: "pair" as const, keys: ["aero_orig",  "cidade_orig"], labels: ["Aeroporto saída",   "Cidade saída"],      placeholders: ["ex: GRU",     "ex: São Paulo"] },
  { type: "pair" as const, keys: ["aero_dest",  "cidade_dest"], labels: ["Aeroporto destino", "Cidade destino"],    placeholders: ["ex: JFK",     "ex: Nova York"] },
];

const HOSP_FIELDS = [
  { type: "full" as const, key: "local",   label: "Local / Endereço", placeholder: "ex: Hotel Renata — 194 Park Ave" },
  { type: "pair" as const, keys: ["checkin",  "checkout"], labels: ["Check-in", "Check-out"], placeholders: ["ex: 12 jun", "ex: 18 jul"] },
  { type: "full" as const, key: "cidade",  label: "Cidade / País",    placeholder: "ex: Nova York, EUA"              },
];

const iCls = "w-full rounded-md border border-[#E5E7EB] bg-white px-2.5 py-1.5 text-[11px] text-gray-900 placeholder:text-[#D1D5DB] outline-none transition-colors focus:border-[#1A7A3C]";
const lCls = "block text-[9px] uppercase tracking-widest text-[#9CA3AF] mb-1";

interface Props {
  kind: "passagem" | "hospedagem";
  initialValues: Record<string, string>;
  onSave: (values: Record<string, string>) => void;
}

export function EditForm({ kind, initialValues, onSave }: Props) {
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const set = (key: string, val: string) => setValues((p) => ({ ...p, [key]: val }));
  const fields = kind === "passagem" ? FLIGHT_FIELDS : HOSP_FIELDS;

  return (
    <div className="space-y-2 p-3">
      {fields.map((row, i) => {
        if (row.type === "full") {
          return (
            <div key={i}>
              <label className={lCls}>{row.label}</label>
              <input type="text" value={values[row.key] ?? ""} onChange={(e) => set(row.key, e.target.value)} placeholder={row.placeholder} className={iCls} />
            </div>
          );
        }
        return (
          <div key={i} className="grid grid-cols-2 gap-1.5">
            {row.keys.map((k, ki) => (
              <div key={k}>
                <label className={lCls}>{row.labels[ki]}</label>
                <input type="text" value={values[k] ?? ""} onChange={(e) => set(k, e.target.value)} placeholder={row.placeholders[ki]} className={iCls} />
              </div>
            ))}
          </div>
        );
      })}
      <button
        onClick={() => onSave(values)}
        className="mt-1 w-full flex items-center justify-center gap-1.5 rounded-md bg-[#1A7A3C] px-3 py-2 text-[11px] font-medium text-white hover:bg-[#166534] transition-colors"
      >
        <Check className="h-3 w-3" />
        ok, salvar
      </button>
    </div>
  );
}
