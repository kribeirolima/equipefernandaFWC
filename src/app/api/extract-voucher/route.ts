import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { writeFileSync, unlinkSync } from "fs";
import { join } from "path";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const PROMPT = `Analise este voucher e extraia as informações em JSON.

Se for PASSAGEM AÉREA:
{"tipo":"passagem","data":"DD/MM/AAAA","saida":"HH:MM","chegada":"HH:MM","aero_orig":"GRU","cidade_orig":"São Paulo","aero_dest":"JFK","cidade_dest":"Nova York"}

Se for HOSPEDAGEM:
{"tipo":"hospedagem","local":"Nome do Hotel","checkin":"DD/MM/AAAA","checkout":"DD/MM/AAAA","cidade":"Nova York"}

Retorne APENAS o JSON, sem texto adicional.`;

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GEMINI_API_KEY não configurada" }, { status: 500 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (e) {
    return NextResponse.json({ error: `Falha ao ler form: ${e}` }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "nenhum arquivo enviado" }, { status: 400 });

  const mimeType = file.type || "application/octet-stream";
  if (!mimeType.startsWith("image/") && mimeType !== "application/pdf") {
    return NextResponse.json({ error: `Formato não suportado: ${mimeType}` }, { status: 400 });
  }

  const ext = mimeType === "application/pdf" ? "pdf" : mimeType.split("/")[1] ?? "jpg";
  const tmpPath = join("/tmp", `voucher-${Date.now()}.${ext}`);

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    writeFileSync(tmpPath, buffer);

    const fileManager = new GoogleAIFileManager(apiKey);
    const upload = await fileManager.uploadFile(tmpPath, {
      mimeType,
      displayName: "voucher",
    });

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      { fileData: { mimeType, fileUri: upload.file.uri } },
      PROMPT,
    ]);

    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: `Gemini não extraiu JSON. Resposta: ${text.slice(0, 200)}` },
        { status: 422 }
      );
    }

    return NextResponse.json(JSON.parse(jsonMatch[0]) as Record<string, string>);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  } finally {
    try { unlinkSync(tmpPath); } catch {}
  }
}
