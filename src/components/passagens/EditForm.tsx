"use client";
import { useState } from "react";
import { Check } from "lucide-react";

const FLIGHT_FIELDS = [
  { type: "full" as const, key: "voo",     label: "Número do voo",    placeholder: "ex: AA 904"              },
  { type: "full" as const, key: "data",    label: "Data",             placeholder: "ex: 01 jun 2026"         },
  { type: "pair" as const, keys: ["saida",   "chegada"],  labels: ["Saída",    "Chegada"],  placeholders: ["ex: 22h10", "ex: 05h45"] },
  { type: "full" as const, key: "orig",    label: "Origem",           placeholder: "ex: GIG — Rio de Janeiro" },
  { type: "full" as const, key: "dest",    label: "Destino",          placeholder: "ex: MIA — Miami"          },
];

const HOSP_FIELDS = [
  { type: "full" as const, key: "local",   label: "Hotel / Local",    placeholder: "ex: Suites Perisur"                     },
  { type: "full" as const, key: "end",     label: "Endereço",         placeholder: "ex: Calle Alba No. 15, Mexico City"     },
  { type: "pair" as const, keys: ["checkin", "checkout"], labels: ["Check-in", "Check-out"], placeholders: ["ex: 09 jun 2026", "ex: 11 jun 2026"] },
];

interface Props {
  kind: "passagem" | "hospedagem";
  initialValues: Record<string, string>;
  auto?: boolean;
  onSave: (values: Record<string, string>) => void;
}

export function EditForm({ kind, initialValues, auto, onSave }: Props) {
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const set = (key: string, val: string) => setValues((p) => ({ ...p, [key]: val }));
  const fields = kind === "passagem" ? FLIGHT_FIELDS : HOSP_FIELDS;

  const iCls = auto
    ? "w-full rounded-md px-2.5 py-1.5 text-[11px] text-gray-900 placeholder:text-[#D1D5DB] outline-none transition-colors focus:border-[#1A7A3C]"
    : "w-full rounded-md px-2.5 py-1.5 text-[11px] text-gray-900 placeholder:text-[#D1D5DB] outline-none transition-colors focus:border-[#1A7A3C]";

  const iStyle = auto
    ? { background: "#F0FDF4", border: "0.5px solid #BBF7D0" }
    : { background: "white", border: "1px solid #E5E7EB" };

  const lCls = "block text-[9px] uppercase tracking-widest text-[#9CA3AF] mb-1";

  return (
    <div className="space-y-2 p-3">
      {fields.map((row, i) => {
        if (row.type === "full") {
          return (
            <div key={i}>
              <label className={lCls}>{row.label}</label>
              <input
                type="text"
                value={values[row.key] ?? ""}
                onChange={(e) => set(row.key, e.target.value)}
                placeholder={row.placeholder}
                className={iCls}
                style={iStyle}
              />
            </div>
          );
        }
        return (
          <div key={i} className="grid grid-cols-2 gap-1.5">
            {row.keys.map((k, ki) => (
              <div key={k}>
                <label className={lCls}>{row.labels[ki]}</label>
                <input
                  type="text"
                  value={values[k] ?? ""}
                  onChange={(e) => set(k, e.target.value)}
                  placeholder={row.placeholders[ki]}
                  className={iCls}
                  style={iStyle}
                />
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
