"use client";
import { useState } from "react";
import { Pencil, X } from "lucide-react";
import type { TravelBlock, HospBlockData } from "@/hooks/useTravelData";

const FLAGS: Record<string, string> = {
  Brasil: "🇧🇷",
  EUA: "🇺🇸",
  México: "🇲🇽",
};
function flag(country: string) {
  return FLAGS[country] ?? "🌍";
}

const FIELDS: { key: keyof HospBlockData; label: string }[] = [
  { key: "hotel", label: "Hotel" },
  { key: "checkin", label: "Check-in" },
  { key: "checkout", label: "Check-out" },
  { key: "cidade", label: "Cidade" },
  { key: "pais", label: "País" },
  { key: "endereco", label: "Endereço" },
  { key: "quarto", label: "Quarto" },
  { key: "confirmacao", label: "Confirmação" },
];

interface Props {
  block: TravelBlock<HospBlockData>;
  onUpdate: (id: number, patch: Partial<HospBlockData>) => void;
  onRemove: (id: number) => void;
}

export function HospBlock({ block, onUpdate, onRemove }: Props) {
  const [editing, setEditing] = useState(!block.data.hotel);
  const [form, setForm] = useState<HospBlockData>(block.data);
  const d = block.data;

  if (editing) {
    return (
      <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 space-y-3">
        <div className="grid grid-cols-2 gap-x-3 gap-y-2">
          {FIELDS.map(({ key, label }) => (
            <div
              key={key}
              className={`flex flex-col gap-0.5 ${
                key === "hotel" || key === "endereco" ? "col-span-2" : ""
              }`}
            >
              <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">
                {label}
              </label>
              <input
                className="border border-gray-200 rounded-md px-2 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={form[key]}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [key]: e.target.value }))
                }
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2 justify-end pt-1">
          <button
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            onClick={() => {
              setForm(block.data);
              setEditing(false);
            }}
          >
            Cancelar
          </button>
          <button
            className="px-3 py-1.5 text-sm rounded-lg text-white transition-colors"
            style={{ background: "#1A7A3C" }}
            onClick={() => {
              onUpdate(block.id, form);
              setEditing(false);
            }}
          >
            Salvar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-2.5 hover:border-gray-300 transition-colors">
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
            block.confirmed
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {block.confirmed ? "✓ confirmado" : "📄 lido do PDF"}
        </span>
        <span className="text-sm text-gray-600">
          {flag(d.pais)} {d.pais}
        </span>
      </div>

      <div className="space-y-1">
        <div className="font-medium text-gray-900 text-[15px] leading-snug">
          {d.hotel}
        </div>
        <div className="text-sm text-gray-500">{d.cidade}</div>
        <div className="text-sm text-gray-600">
          Check-in {d.checkin} · Check-out {d.checkout}
        </div>
        {(d.quarto || d.confirmacao) && (
          <div className="text-sm text-gray-500">
            {d.quarto && <span>Quarto: {d.quarto}</span>}
            {d.quarto && d.confirmacao && <span className="mx-1.5 text-gray-300">·</span>}
            {d.confirmacao && <span>{d.confirmacao}</span>}
          </div>
        )}
      </div>

      <div className="flex items-end justify-between pt-0.5">
        {d.endereco ? (
          <span className="text-xs text-gray-400 leading-snug max-w-[75%]">
            {d.endereco}
          </span>
        ) : (
          <span />
        )}
        <div className="flex gap-0.5 shrink-0">
          <button
            onClick={() => {
              setForm(block.data);
              setEditing(true);
            }}
            className="p-1.5 rounded-md text-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            title="Editar"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onRemove(block.id)}
            className="p-1.5 rounded-md text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Remover"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
