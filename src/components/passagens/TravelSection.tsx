"use client";
import { useRef } from "react";
import { useTravelSection } from "@/hooks/useTravelSection";
import { TravelBlock } from "./TravelBlock";

interface Props {
  kind: "passagem" | "hospedagem";
  storageKey: string;
}

const LABELS = {
  passagem:   { icon: "✈", title: "PASSAGENS",   addBtn: "+ novo trecho"     },
  hospedagem: { icon: "🛏", title: "HOSPEDAGENS", addBtn: "+ nova hospedagem" },
};

export function TravelSection({ kind, storageKey }: Props) {
  const { blocks, add, remove, confirm, reopen } = useTravelSection(storageKey);
  const endRef = useRef<HTMLDivElement>(null);
  const { icon, title, addBtn } = LABELS[kind];

  const handleAdd = () => {
    add();
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50);
  };

  return (
    <div className="space-y-2">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <span style={{ fontSize: "9px", fontWeight: 600, color: "#1A7A3C", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {icon} {title}
        </span>
        <button
          onClick={handleAdd}
          className="rounded px-2 py-0.5 text-[9px] font-medium text-[#1A7A3C] transition-colors hover:bg-[#F0FDF4]"
          style={{ border: "0.5px dashed #D1FAE5" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#1A7A3C")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#D1FAE5")}
        >
          {addBtn}
        </button>
      </div>

      {/* Blocks */}
      <div className="space-y-2">
        {blocks.map((block, i) => (
          <TravelBlock
            key={block.id}
            kind={kind}
            block={block}
            index={i}
            canRemove={blocks.length > 1}
            onConfirm={confirm}
            onReopen={reopen}
            onRemove={remove}
          />
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
}
