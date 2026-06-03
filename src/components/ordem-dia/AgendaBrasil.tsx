"use client";
import { Plus, X } from "lucide-react";
import { useAgenda } from "@/hooks/useAgenda";
import { OrdemDiaEquipe } from "@/components/equipes/OrdemDiaEquipe";

export function AgendaBrasil() {
  const { days, activeId, setActiveId, addDay, removeDay } = useAgenda();

  return (
    <div className="w-full">
      {/* ── Tabs */}
      <div className="od-screen-only sticky top-[57px] z-20 border-b bg-white/95 backdrop-blur px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
          {days.map((day) => {
            const active = day.id === activeId;
            return (
              <div key={day.id} className="flex-shrink-0 flex items-center">
                <button
                  onClick={() => setActiveId(day.id)}
                  className="rounded-l-full border px-3 py-1 text-[11px] font-medium transition-colors"
                  style={
                    active
                      ? { background: "#1A7A3C", borderColor: "#1A7A3C", color: "#fff", borderRight: "none" }
                      : { background: "#fff", borderColor: "#E5E7EB", color: "#6B7280", borderRight: "none" }
                  }
                >
                  {day.label}
                </button>
                {days.length > 1 && (
                  <button
                    onClick={() => removeDay(day.id)}
                    className="rounded-r-full border border-l-0 px-1.5 py-1 transition-colors"
                    style={
                      active
                        ? { background: "#1A7A3C", borderColor: "#1A7A3C", color: "rgba(255,255,255,0.7)" }
                        : { background: "#fff", borderColor: "#E5E7EB", color: "#D1D5DB" }
                    }
                    title="Remover dia"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                )}
              </div>
            );
          })}
          <button
            onClick={addDay}
            className="flex-shrink-0 flex items-center gap-1 rounded-full border border-dashed border-[#D1D5DB] px-3 py-1 text-[11px] text-[#9CA3AF] transition-colors hover:border-[#1A7A3C] hover:text-[#1A7A3C]"
          >
            <Plus className="h-3 w-3" />
            Adicionar dia
          </button>
        </div>
      </div>

      {/* ── Active day form */}
      {days.map((day) => (
        <div key={day.id} style={{ display: day.id === activeId ? "block" : "none" }}>
          <OrdemDiaEquipe
            storagePrefix={`od_${day.id}`}
            printName="EQUIPE BRASIL · FERNANDA GENTIL"
            programaLabel="Aqui é Brasil"
          />
        </div>
      ))}
    </div>
  );
}
