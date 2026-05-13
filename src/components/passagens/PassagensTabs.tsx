"use client";
import { useState } from "react";
import { TravelSection } from "./TravelSection";

const TEAMS = [
  { name: "Fernanda",                  passKey: "pv3_fg_pass",  hospKey: "pv3_fg_hosp"  },
  { name: "Equipe Bruna - Alemanha",   passKey: "pv3_ba_pass",  hospKey: "pv3_ba_hosp"  },
  { name: "Renata · Karol · Anderson", passKey: "pv3_rka_pass", hospKey: "pv3_rka_hosp" },
  { name: "Rodrigo · Ricardo",         passKey: "pv3_rr_pass",  hospKey: "pv3_rr_hosp"  },
];

export function PassagensTabs() {
  const [active, setActive] = useState(0);
  const team = TEAMS[active];

  return (
    <div className="space-y-4">
      {/* Tab bar */}
      <div className="flex overflow-x-auto gap-1 border-b border-gray-200 pb-0">
        {TEAMS.map((t, i) => (
          <button
            key={t.passKey}
            onClick={() => setActive(i)}
            className={`shrink-0 px-4 py-2.5 text-[13px] font-medium transition-colors border-b-2 -mb-px ${
              active === i
                ? "border-[#1A7A3C] text-[#1A7A3C]"
                : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Active panel */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-[15px] font-semibold text-gray-900">{team.name}</h2>
        </div>
        <div className="p-5">
          <TravelSection key={team.passKey} passKey={team.passKey} hospKey={team.hospKey} />
        </div>
      </div>
    </div>
  );
}
