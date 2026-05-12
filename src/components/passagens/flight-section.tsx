"use client";
import { Calendar, Clock, ArrowRight, Building2, MapPin } from "lucide-react";
import { EditableField } from "./editable-field";
import type { FlightData } from "@/hooks/useTravelData";

export function FlightSection({
  data,
  onUpdate,
}: {
  data: FlightData;
  onUpdate: (field: keyof FlightData, value: string) => void;
}) {
  return (
    <div className="space-y-2.5">
      <EditableField
        label="Data"
        Icon={Calendar}
        value={data.data}
        onChange={(v) => onUpdate("data", v)}
        placeholder="— data (ex: 12 jun) —"
      />
      <div className="grid grid-cols-2 gap-2">
        <EditableField
          label="Horário de saída"
          Icon={Clock}
          value={data.horario_saida}
          onChange={(v) => onUpdate("horario_saida", v)}
          placeholder="— hora —"
        />
        <EditableField
          label="Horário de chegada"
          Icon={ArrowRight}
          value={data.horario_chegada}
          onChange={(v) => onUpdate("horario_chegada", v)}
          placeholder="— hora —"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <EditableField
          label="Aeroporto saída"
          Icon={Building2}
          value={data.aeroporto_saida}
          onChange={(v) => onUpdate("aeroporto_saida", v)}
          placeholder="— ex: GRU —"
        />
        <EditableField
          label="Cidade / País saída"
          Icon={MapPin}
          value={data.cidade_saida}
          onChange={(v) => onUpdate("cidade_saida", v)}
          placeholder="— cidade, país —"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <EditableField
          label="Aeroporto destino"
          Icon={Building2}
          value={data.aeroporto_destino}
          onChange={(v) => onUpdate("aeroporto_destino", v)}
          placeholder="— ex: JFK —"
        />
        <EditableField
          label="Cidade / País destino"
          Icon={MapPin}
          value={data.cidade_destino}
          onChange={(v) => onUpdate("cidade_destino", v)}
          placeholder="— cidade, país —"
        />
      </div>
    </div>
  );
}
