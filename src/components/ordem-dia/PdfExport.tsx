"use client";
import { FileText } from "lucide-react";

export function PdfExport() {
  return (
    <button
      onClick={() => window.print()}
      className="od-screen-only flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium text-white transition-colors"
      style={{ background: "#1A7A3C" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#166534")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#1A7A3C")}
    >
      <FileText className="h-3.5 w-3.5" />
      Gerar PDF
    </button>
  );
}
