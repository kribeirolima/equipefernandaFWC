"use client";

import { useState } from "react";
import { BH_CONFIG } from "@/lib/data-bh";
import { POA_CONFIG } from "@/lib/data-poa";
import { CWB_CONFIG } from "@/lib/data-cwb";
import { CHAPECO_CONFIG } from "@/lib/data-chapeco";
import { RIOPRETO_CONFIG } from "@/lib/data-riopreto";
import { CityPanel } from "./city-panel";
import type { CityConfig } from "@/lib/types-deslocamentos";

const CITY_CONFIGS: CityConfig[] = [BH_CONFIG, POA_CONFIG, CWB_CONFIG, CHAPECO_CONFIG, RIOPRETO_CONFIG];

function CityTabs({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="inline-flex flex-wrap rounded-lg bg-gray-100 border border-gray-200 p-0.5 text-[13px]">
      {CITY_CONFIGS.map((c) => (
        <button
          key={c.id}
          onClick={() => onChange(c.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all"
          style={
            value === c.id ? { background: "#1A7A3C", color: "#FFFFFF" } : { color: "#6B7280" }
          }
        >
          <span>{c.emoji}</span>
          <span>{c.cidade}</span>
        </button>
      ))}
    </div>
  );
}

export function Dashboard() {
  const [cityId, setCityId] = useState<string>(CITY_CONFIGS[0].id);
  const config = CITY_CONFIGS.find((c) => c.id === cityId) ?? CITY_CONFIGS[0];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 space-y-5">
      {/* Seletor de cidade */}
      <div className="flex items-center gap-3">
        <CityTabs value={cityId} onChange={setCityId} />
      </div>

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[18px] font-medium text-gray-900">
            Deslocamentos · {config.emoji} {config.cidade}
          </h1>
          <p className="text-[13px] text-gray-400 mt-0.5">
            Equipe Brasil · {config.periodo ?? "Brasileirão"}
          </p>
        </div>
      </div>

      <CityPanel key={config.id} config={config} />
    </div>
  );
}
