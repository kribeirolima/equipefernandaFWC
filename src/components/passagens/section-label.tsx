import type { LucideIcon } from "lucide-react";

export function SectionLabel({ label, Icon }: { label: string; Icon: LucideIcon }) {
  return (
    <div className="flex items-center gap-1.5 mb-2">
      <Icon className="h-[13px] w-[13px]" style={{ color: "#1A7A3C" }} />
      <span
        className="text-[11px] font-medium uppercase"
        style={{ color: "#1A7A3C", letterSpacing: "0.06em" }}
      >
        {label}
      </span>
    </div>
  );
}
