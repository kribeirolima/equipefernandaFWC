"use client";

import { cn } from "@/lib/utils";

export type TeamKey = "ALL" | "NJ" | "NYC";

const OPTIONS: { value: TeamKey; label: string }[] = [
  { value: "ALL", label: "Todas" },
  { value: "NJ", label: "NJ" },
  { value: "NYC", label: "NYC" },
];

export function TeamFilter({
  value,
  onChange,
}: {
  value: TeamKey;
  onChange: (v: TeamKey) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Filtro por equipe"
      className="inline-flex items-center rounded-lg border bg-muted/40 p-1 text-sm shadow-xs"
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          role="tab"
          aria-selected={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-md px-3.5 py-1.5 font-medium transition-all",
            value === opt.value
              ? "bg-background text-foreground shadow-sm ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
