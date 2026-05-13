"use client";
import { useState } from "react";
import { Pencil, X } from "lucide-react";
import type { TravelBlock, PassBlockData } from "@/hooks/useTravelData";

const FLAGS: Record<string, string> = {
  Brasil: "🇧🇷",
  EUA: "🇺🇸",
  México: "🇲🇽",
};
function flag(country: string) {
  return FLAGS[country] ?? "🌍";
}

const FIELDS: { key: keyof PassBlockData; label: string }[] = [
  { key: "voo", label: "Voo" },
  { key: "data", label: "Data" },
  { key: "saida", label: "Saída" },
  { key: "chegada", label: "Chegada" },
  { key: "origem_cod", label: "Cód. origem" },
  { key: "origem_cidade", label: "Cidade de origem" },
  { key: "origem_pais", label: "País de origem" },
  { key: "destino_cod", label: "Cód. destino" },
  { key: "destino_cidade", label: "Cidade de destino" },
  { key: "destino_pais", label: "País de destino" },
  { key: "bagagem", label: "Bagagem" },
];

interface Props {
  block: TravelBlock<PassBlockData>;
  onUpdate: (id: number, patch: Partial<PassBlockData>) => void;
  onRemove: (id: number) => void;
}

export function PassBlock({ block, onUpdate, onRemove }: Props) {
  const [editing, setEditing] = useState(!block.data.voo);
  const [form, setForm] = useState<PassBlockData>(block.data);
  const d = block.data;

  if (editing) {
    return (
      <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 space-y-3">
        <div className="grid grid-cols-2 gap-x-3 gap-y-2">
          {FIELDS.map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-0.5">
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
          {flag(d.origem_pais)} {d.origem_pais} → {flag(d.destino_pais)}{" "}
          {d.destino_pais}
        </span>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2 font-medium text-gray-900 text-[15px]">
          <span>{d.voo}</span>
          <span className="text-gray-300">·</span>
          <span>{d.data}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-gray-700">
          <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">
            {d.origem_cod}
          </span>
          <span className="text-gray-500">{d.origem_cidade}</span>
          <span className="text-gray-400 mx-1">──→</span>
          <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">
            {d.destino_cod}
          </span>
          <span className="text-gray-500">{d.destino_cidade}</span>
        </div>
        <div className="text-sm text-gray-500">
          Saída {d.saida} · Chegada {d.chegada}
        </div>
      </div>

      <div className="flex items-center justify-between pt-0.5">
        <span className="text-sm text-gray-400">🧳 {d.bagagem}</span>
        <div className="flex gap-0.5">
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
