import { NextResponse } from "next/server";
import type { BlockItem } from "@/hooks/useTravelSection";

export const dynamic = "force-dynamic";

const SHEET_ID = process.env.SHEET_ID;

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQ && text[i + 1] === '"') { cell += '"'; i++; } else inQ = !inQ;
    } else if (c === "," && !inQ) {
      row.push(cell); cell = "";
    } else if ((c === "\n" || c === "\r") && !inQ) {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); cell = "";
      if (row.some((v) => v !== "")) rows.push(row);
      row = [];
    } else {
      cell += c;
    }
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

export async function GET(request: Request) {
  if (!SHEET_ID) return NextResponse.json([]);

  const { searchParams } = new URL(request.url);
  const grupo = searchParams.get("grupo") ?? "";
  const tipo  = searchParams.get("tipo")  ?? "";

  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=dados`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return NextResponse.json([]);

    const text = await res.text();
    const [headerRow, ...dataRows] = parseCSV(text);
    const col = (name: string) => headerRow.indexOf(name);

    const PASS_KEYS = ["data", "saida", "chegada", "aero_orig", "cidade_orig", "aero_dest", "cidade_dest"];
    const HOSP_KEYS = ["local", "checkin", "checkout", "cidade"];

    const blocks: BlockItem[] = dataRows
      .filter((row) => row[col("grupo")] === grupo && row[col("tipo")] === tipo)
      .map((row) => {
        const ts = row[col("timestamp")];
        const id = ts ? new Date(ts).getTime() : Date.now() + Math.random();
        const keys = tipo === "passagem" ? PASS_KEYS : HOSP_KEYS;
        const data: Record<string, string> = {};
        keys.forEach((k) => { data[k] = row[col(k)] ?? ""; });
        return { id, confirmed: true, data };
      });

    return NextResponse.json(blocks);
  } catch {
    return NextResponse.json([]);
  }
}
