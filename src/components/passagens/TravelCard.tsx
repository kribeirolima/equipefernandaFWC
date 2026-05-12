"use client";
import { CITIES } from "@/hooks/useCitySelector";
import { TravelSection } from "./TravelSection";

interface Group {
  id: string;
  name: string;
  avatar: string;
  avatarBg: string;
  avatarColor: string;
}

interface Props {
  group: Group;
  city: string;
}

export function TravelCard({ group, city }: Props) {
  const cityObj = CITIES.find((c) => c.code === city);
  const badge = cityObj ? `${cityObj.flag} ${cityObj.short}` : "";

  return (
    <div className="rounded-xl bg-white overflow-hidden" style={{ border: "0.5px solid #E5E7EB" }}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ background: "#F9FAFB", borderBottom: "0.5px solid #E5E7EB" }}
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium shrink-0"
          style={{ background: group.avatarBg, color: group.avatarColor }}
        >
          {group.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-gray-900 truncate">{group.name}</p>
        </div>
        {badge && (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-medium shrink-0"
            style={{ background: "#F0FDF4", color: "#1A7A3C", border: "0.5px solid #BBF7D0" }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 space-y-5">
        <TravelSection kind="passagem"   storageKey={`pb2_${group.id}_pass`} />
        <div style={{ height: "0.5px", background: "#E5E7EB" }} />
        <TravelSection kind="hospedagem" storageKey={`pb2_${group.id}_hosp`} />
      </div>
    </div>
  );
}
