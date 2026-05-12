"use client";
import { useVoucherData } from "@/hooks/useVoucherData";
import { VoucherSection } from "./VoucherSection";

interface Group {
  id: string;
  name: string;
  avatar: string;
  avatarBg: string;
  avatarColor: string;
}

export function VoucherCard({ group }: { group: Group }) {
  const { store, save, clear } = useVoucherData(group.id);

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
        <p className="text-[13px] font-medium text-gray-900 truncate">{group.name}</p>
      </div>

      {/* Body */}
      <div className="p-4 space-y-5">
        <VoucherSection
          tipo="pass"
          entry={store.pass}
          onSave={(data) => save("pass", data)}
          onClear={() => clear("pass")}
        />
        <div style={{ height: "0.5px", background: "#E5E7EB" }} />
        <VoucherSection
          tipo="hosp"
          entry={store.hosp}
          onSave={(data) => save("hosp", data)}
          onClear={() => clear("hosp")}
        />
      </div>
    </div>
  );
}
