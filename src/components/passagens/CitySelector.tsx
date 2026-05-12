"use client";
import { CITIES } from "@/hooks/useCitySelector";

interface Props {
  city: string;
  onSelect: (code: string) => void;
}

export function CitySelector({ city, onSelect }: Props) {
  const active = CITIES.find((c) => c.code === city);

  return (
    <div
      className="rounded-[10px] bg-white px-3.5 py-2.5 space-y-2"
      style={{ border: "0.5px solid #E5E7EB" }}
    >
      <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF" }}>
        📍 Cidade atual da delegação
      </p>
      <div className="flex flex-wrap gap-1.5">
        {CITIES.map((c) => {
          const isActive = c.code === city;
          return (
            <button
              key={c.code}
              onClick={() => onSelect(c.code)}
              className="rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors"
              style={
                isActive
                  ? {
                      border: "0.5px solid #1A7A3C",
                      background: "#F0FDF4",
                      color: "#1A7A3C",
                      boxShadow: "0 0 0 1px #1A7A3C",
                    }
                  : {
                      border: "0.5px solid #E5E7EB",
                      background: "#fff",
                      color: "#374151",
                    }
              }
            >
              {c.flag} {c.short}
            </button>
          );
        })}
      </div>
      {active && (
        <p style={{ fontSize: "11px", color: "#1A7A3C" }}>
          ✓ {active.name} selecionada como cidade atual
        </p>
      )}
    </div>
  );
}
