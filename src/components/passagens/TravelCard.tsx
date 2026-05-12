"use client";
import { TravelSection } from "./TravelSection";

interface Group {
  id: string;
  name: string;
  avatar: string;
  avatarBg: string;
  avatarColor: string;
}

export function TravelCard({ group }: { group: Group }) {
  return (
    <div className="rounded-xl bg-white overflow-hidden" style={{ border: "0.5px solid #E5E7EB" }}>
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
        <p className="text-[13px] font-medium text-gray-900 truncate">{group.name}</p>
      </div>

      <div className="p-4 space-y-5">
        <TravelSection kind="passagem"   storageKey={`pb2_${group.id}_pass`} group={group.id} />
        <div style={{ height: "0.5px", background: "#E5E7EB" }} />
        <TravelSection kind="hospedagem" storageKey={`pb2_${group.id}_hosp`} group={group.id} />
      </div>
    </div>
  );
}
