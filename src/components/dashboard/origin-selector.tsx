"use client";
import type { Location } from "@/lib/data";

export function OriginSelector({
  origins,
  value,
  onChange,
  team,
}: {
  origins: Location[];
  value: string;
  onChange: (id: string) => void;
  team: "ALL" | "NJ" | "NYC";
}) {
  const groups = [
    { label: "NJ", items: origins.filter((o) => o.team === "NJ") },
    { label: "NYC", items: origins.filter((o) => o.team === "NYC") },
  ].filter((g) => g.items.length > 0);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {groups.map(({ label, items }) => (
        <div key={label} className="flex items-center gap-2">
          <span className="text-[9px] font-medium text-gray-400 uppercase tracking-widest">
            {label}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {items.map((o) => {
              const active = value === o.id;
              const disabled = team !== "ALL" && o.team !== team;
              const initial = o.name
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();
              return (
                <button
                  key={o.id}
                  onClick={() => !disabled && onChange(o.id)}
                  disabled={disabled}
                  className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-150 border"
                  style={
                    active
                      ? { background: "#1A7A3C", color: "#FFFFFF", borderColor: "#1A7A3C" }
                      : disabled
                      ? { background: "#F9FAFB", color: "#D1D5DB", borderColor: "#E5E7EB", cursor: "not-allowed" }
                      : { background: "#F3F4F6", color: "#6B7280", borderColor: "#E5E7EB" }
                  }
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium shrink-0"
                    style={
                      active
                        ? { background: "rgba(255,255,255,0.2)", color: "#FFFFFF" }
                        : { background: "#E5E7EB", color: "#6B7280" }
                    }
                  >
                    {initial}
                  </span>
                  <span className="leading-none">
                    {o.name.replace(/^(Hotel |Airbnb )/, "")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
