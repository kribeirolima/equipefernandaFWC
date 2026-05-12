"use client";
import { useRef, useState } from "react";
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

const PASS_KEYS = ["data", "saida", "chegada", "aero_orig", "cidade_orig", "aero_dest", "cidade_dest"];
const HOSP_KEYS = ["local", "checkin", "checkout", "cidade"];

export function TravelSection({ kind, storageKey }: Props) {
  const { blocks, add, addConfirmed, remove, confirm, reopen } = useTravelSection(storageKey);
  const endRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const { icon, title, addBtn } = LABELS[kind];

  const handleAdd = () => {
    add();
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setUploadError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/extract-voucher", { method: "POST", body: formData });
      const json = await res.json() as Record<string, string>;
      if (!res.ok) { setUploadError(json.error ?? "Erro ao processar voucher"); return; }
      const keys = kind === "passagem" ? PASS_KEYS : HOSP_KEYS;
      const data: Record<string, string> = {};
      keys.forEach((k) => { data[k] = json[k] ?? ""; });
      addConfirmed(data);
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50);
    } catch {
      setUploadError("Erro ao enviar arquivo");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {/* Section header */}
      <div className="flex items-center justify-between gap-2">
        <span style={{ fontSize: "9px", fontWeight: 600, color: "#1A7A3C", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {icon} {title}
        </span>
        <div className="flex items-center gap-1.5">
          <input ref={fileRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={handleFileChange} />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="rounded px-2 py-0.5 text-[9px] font-medium text-[#1A7A3C] transition-colors hover:bg-[#F0FDF4] disabled:opacity-50"
            style={{ border: "0.5px dashed #D1FAE5" }}
            onMouseEnter={(e) => { if (!uploading) e.currentTarget.style.borderColor = "#1A7A3C"; }}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#D1FAE5")}
          >
            {uploading ? "lendo voucher..." : "📎 voucher"}
          </button>
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
      </div>
      {uploadError && (
        <p className="text-[9px] text-red-500">{uploadError}</p>
      )}

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
