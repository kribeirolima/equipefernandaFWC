"use client";
import type { LucideIcon } from "lucide-react";

export function EditableField({
  label,
  Icon,
  value,
  onChange,
  placeholder = "— adicionar —",
  className,
}: {
  label: string;
  Icon: LucideIcon;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1 ${className ?? ""}`}>
      <div className="flex items-center gap-1">
        <Icon className="h-[11px] w-[11px] text-gray-400 shrink-0" />
        <span
          className="text-[9px] font-medium uppercase"
          style={{ color: "#9CA3AF", letterSpacing: "0.05em" }}
        >
          {label}
        </span>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md px-2.5 py-1.5 text-[13px] text-gray-900 bg-white placeholder:text-gray-400 placeholder:italic focus:outline-none transition-[border-color] duration-150"
        style={{
          border: "0.5px solid #E5E7EB",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#1A7A3C")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
      />
    </div>
  );
}
