"use client";

import { MessageCircle, Phone } from "lucide-react";
import { CITY_CONFIGS } from "@/lib/cities";
import { useCity } from "@/lib/city-context";

function whatsappUrl(telefone: string): string {
  const digits = telefone.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

export function CityBar() {
  const { cityId, setCityId } = useCity();
  const config = CITY_CONFIGS.find((c) => c.id === cityId) ?? CITY_CONFIGS[0];
  const contato = config.contatoLocal;

  return (
    <div className="sticky top-14 z-30 border-b border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6">
        <div className="inline-flex flex-wrap rounded-lg border border-gray-200 bg-gray-100 p-0.5 text-[13px]">
          {CITY_CONFIGS.map((c) => (
            <button
              key={c.id}
              onClick={() => setCityId(c.id)}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all"
              style={
                cityId === c.id ? { background: "#1A7A3C", color: "#FFFFFF" } : { color: "#6B7280" }
              }
            >
              <span>{c.emoji}</span>
              <span>{c.cidade}</span>
            </button>
          ))}
        </div>

        {contato && (
          <div className="flex items-center gap-2 text-[12px]">
            <Phone className="h-3.5 w-3.5 shrink-0 text-gray-400" />
            <span className="text-gray-400">Produção local:</span>
            <span className="font-medium text-gray-900">{contato.nome}</span>
            {contato.telefone && (
              <a
                href={whatsappUrl(contato.telefone)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 font-medium text-emerald-700 ring-1 ring-emerald-200 transition-colors hover:bg-emerald-100"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                {contato.telefone}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
