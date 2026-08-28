"use client";

import { CITY_CONFIGS } from "@/lib/cities";
import { useCity } from "@/lib/city-context";
import { CityPanel } from "./city-panel";

export function Dashboard() {
  const { cityId } = useCity();
  const config = CITY_CONFIGS.find((c) => c.id === cityId) ?? CITY_CONFIGS[0];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[18px] font-medium text-gray-900">
            Deslocamentos · {config.emoji} {config.cidade}
          </h1>
          <p className="text-[13px] text-gray-400 mt-0.5">
            Giro Brasileirão · {config.periodo ?? "Brasileirão"}
          </p>
        </div>
      </div>

      <CityPanel key={config.id} config={config} />
    </div>
  );
}
