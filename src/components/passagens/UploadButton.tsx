"use client";
import { useRef, useState } from "react";
import { FileUp, Loader2 } from "lucide-react";

interface Props {
  label: string;
  type: "pass" | "hosp";
  onSuccess: (blocks: unknown[]) => void;
  onError: (msg: string) => void;
}

export function UploadButton({ label, type, onSuccess, onError }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleFile(file: File) {
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      onError("Apenas arquivos .pdf são aceitos.");
      return;
    }
    setLoading(true);
    try {
      const form = new FormData();
      form.set("file", file);
      form.set("type", type);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60_000);

      let res: Response;
      try {
        res = await fetch("/api/parse-pdf", {
          method: "POST",
          body: form,
          signal: controller.signal,
        });
      } catch (err: unknown) {
        clearTimeout(timeout);
        if (err instanceof Error && err.name === "AbortError") {
          onError("Tempo esgotado. Tente novamente.");
        } else {
          onError("Erro de conexão. Verifique sua internet e tente novamente.");
        }
        return;
      }
      clearTimeout(timeout);

      let json: { ok: boolean; blocks?: unknown[]; error?: string };
      try {
        json = await res.json();
      } catch {
        onError("Resposta inválida do servidor. Tente novamente.");
        return;
      }

      if (!res.ok || !json.ok) {
        onError(json.error ?? "Não consegui ler os dados deste PDF. Tente novamente ou adicione manualmente.");
        return;
      }

      const blocks = json.blocks ?? [];
      if (!Array.isArray(blocks) || blocks.length === 0) {
        onError("Nenhum dado encontrado no PDF. Verifique o documento e tente novamente.");
        return;
      }

      onSuccess(blocks);
    } catch (err: unknown) {
      onError(`Erro inesperado: ${err instanceof Error ? err.message : "tente novamente."}`);
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
      <button
        disabled={loading}
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] rounded-lg border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 disabled:opacity-50 transition-colors"
      >
        {loading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <FileUp className="h-3.5 w-3.5" />
        )}
        {loading ? "Lendo documento..." : label}
      </button>
    </>
  );
}
