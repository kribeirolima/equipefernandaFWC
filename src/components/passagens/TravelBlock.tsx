"use client";
import { X } from "lucide-react";
import type { BlockItem } from "@/hooks/useTravelSection";
import { EditForm } from "./EditForm";
import { SummaryCard } from "./SummaryCard";

interface Props {
  kind: "passagem" | "hospedagem";
  block: BlockItem;
  index: number;
  canRemove: boolean;
  onConfirm: (id: number, data: Record<string, string>) => void;
  onReopen: (id: number) => void;
  onRemove: (id: number) => void;
}

export function TravelBlock({ kind, block, index, canRemove, onConfirm, onReopen, onRemove }: Props) {
  const label = kind === "passagem" ? `Trecho ${index + 1}` : `Hospedagem ${index + 1}`;

  return (
    <div className="rounded-[7px] overflow-hidden" style={{ border: "0.5px solid #E5E7EB" }}>
      <div
        className="flex items-center justify-between px-3 py-1.5"
        style={{ background: "#F9FAFB", borderBottom: "0.5px solid #E5E7EB" }}
      >
        <span style={{ fontSize: "9px", color: "#9CA3AF" }}>{label}</span>
        {canRemove && !block.confirmed && (
          <button onClick={() => onRemove(block.id)} className="text-[#D1D5DB] hover:text-[#EF4444] transition-colors">
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {block.confirmed ? (
        <SummaryCard
          kind={kind}
          data={block.data}
          auto={block.auto}
          canRemove={canRemove}
          onEdit={() => onReopen(block.id)}
          onRemove={() => onRemove(block.id)}
        />
      ) : (
        <div className="bg-white">
          <EditForm
            kind={kind}
            initialValues={block.data}
            auto={block.auto}
            onSave={(vals) => onConfirm(block.id, vals)}
          />
        </div>
      )}
    </div>
  );
}
