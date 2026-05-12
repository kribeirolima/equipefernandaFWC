import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const PROMPT = `Analise este voucher e extraia as informações em JSON.

Se for PASSAGEM AÉREA:
{"tipo":"passagem","data":"DD/MM/AAAA","saida":"HH:MM","chegada":"HH:MM","aero_orig":"GRU","cidade_orig":"São Paulo","aero_dest":"JFK","cidade_dest":"Nova York"}

Se for HOSPEDAGEM:
{"tipo":"hospedagem","local":"Nome do Hotel","checkin":"DD/MM/AAAA","checkout":"DD/MM/AAAA","cidade":"Nova York"}

Retorne APENAS o JSON, sem texto adicional.`;

export async function POST(request: Request) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: "GEMINI_API_KEY não configurada" }, { status: 500 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "form data inválido" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "nenhum arquivo enviado" }, { status: 400 });

  const mimeType = file.type;
  if (!mimeType.startsWith("image/") && mimeType !== "application/pdf") {
    return NextResponse.json({ error: "formato não suportado (use imagem ou PDF)" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  const payload = {
    contents: [{
      parts: [
        { inline_data: { mime_type: mimeType, data: base64 } },
        { text: PROMPT },
      ],
    }],
  };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
  );

  if (!res.ok) return NextResponse.json({ error: "erro na API Gemini" }, { status: 502 });

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text as string | undefined;
  if (!text) return NextResponse.json({ error: "resposta vazia do Gemini" }, { status: 502 });

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return NextResponse.json({ error: "não foi possível extrair os dados" }, { status: 422 });

  try {
    const extracted = JSON.parse(jsonMatch[0]) as Record<string, string>;
    return NextResponse.json(extracted);
  } catch {
    return NextResponse.json({ error: "JSON inválido retornado pelo Gemini" }, { status: 422 });
  }
}
