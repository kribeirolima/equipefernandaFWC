"use client";
import { useRef, useState } from "react";
import { useTravelSection } from "@/hooks/useTravelSection";
import { TravelBlock } from "./TravelBlock";
import { ParseSpinner } from "./ParseSpinner";

interface Props {
  kind: "passagem" | "hospedagem";
  storageKey: string;
  group: string;
}

const LABELS = {
  passagem:   { icon: "✈", title: "PASSAGENS",   addBtn: "+ trecho"     },
  hospedagem: { icon: "🛏", title: "HOSPEDAGENS", addBtn: "+ hospedagem" },
};

export function TravelSection({ kind, storageKey, group }: Props) {
  const { blocks, add, remove, confirm, reopen, addBlocksFromPDF } = useTravelSection(storageKey);
  const endRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [parsing, setParsing] = useState(false);
  const [parsingName, setParsingName] = useState("");
  const [parseError, setParseError] = useState("");
  const { icon, title, addBtn } = LABELS[kind];
  const tipo = kind === "passagem" ? "pass" : "hosp";

  const handleAdd = () => {
    add();
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50);
  };

  const handlePDF = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    if (file.type !== "application/pdf") { alert("Apenas arquivos PDF são aceitos."); return; }

    setParseError("");
    setParsing(true);
    setParsingName(file.name.replace(/\.pdf$/i, ""));

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 55000);

      const res = await fetch("/api/parse-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64, mimeType: file.type, type: tipo, group }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const json = await res.json() as { blocks?: Record<string, string>[]; error?: string };

      if (!res.ok || json.error) {
        setParseError(json.error ?? "Não consegui ler os dados deste documento. Preencha manualmente.");
        return;
      }

      if (!json.blocks?.length) {
        setParseError("Não consegui ler os dados deste documento. Preencha manualmente.");
        return;
      }

      addBlocksFromPDF(json.blocks);
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50);
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        setParseError("Tempo esgotado. Tente novamente ou preencha manualmente.");
      } else {
        setParseError("Não consegui ler os dados deste documento. Preencha manualmente.");
      }
    } finally {
      setParsing(false);
      setParsingName("");
    }
  };

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <span style={{ fontSize: "9px", fontWeight: 600, color: "#1A7A3C", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {icon} {title}
        </span>
        <div className="flex items-center gap-1.5">
          <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={handlePDF} />
          <label
            onClick={() => fileRef.current?.click()}
            className="cursor-pointer rounded px-2 py-0.5 text-[9px] font-medium transition-colors"
            style={{ background: "#F0FDF4", border: "0.5px solid #BBF7D0", color: "#1A7A3C" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#DCFCE7")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F0FDF4")}
          >
            📄 subir PDF
          </label>
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
        {parsing && <ParseSpinner fileName={parsingName} />}
        {parseError && <p className="text-[10px] text-red-500 px-1">{parseError}</p>}
        <div ref={endRef} />
      </div>
    </div>
  );
}
