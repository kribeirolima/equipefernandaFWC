"use client";

export function ParseSpinner({ fileName }: { fileName: string }) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
      style={{ background: "#FAFAFA", border: "0.5px solid #E5E7EB" }}
    >
      <svg
        className="shrink-0 animate-spin"
        width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <span className="text-[11px] text-gray-500 truncate">
        Lendo <span className="font-medium text-gray-700">{fileName}</span>...
      </span>
    </div>
  );
}
