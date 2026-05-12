import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const PROMPTS = {
  pass: `Leia este bilhete aéreo e extraia TODOS os trechos de voo.
Para cada trecho, retorne um objeto JSON com os campos:
voo (número do voo), data (DD mmm YYYY), saida (HHhMM),
chegada (HHhMM), orig (código IATA — cidade), dest (código IATA — cidade).
Retorne um array JSON. Apenas o JSON, sem texto extra.`,

  hosp: `Leia esta confirmação de hospedagem e extraia os dados.
Retorne um array JSON com objetos contendo:
local (nome do hotel/local), end (endereço completo),
checkin (DD mmm YYYY), checkout (DD mmm YYYY).
Apenas o JSON, sem texto extra.`,
};

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "GEMINI_API_KEY não configurada" }, { status: 500 });

  let body: { base64: string; mimeType: string; type: string };
  try {
    body = await req.json() as typeof body;
  } catch {
    return NextResponse.json({ error: "body inválido" }, { status: 400 });
  }

  const { base64, mimeType, type } = body;
  if (!base64 || mimeType !== "application/pdf") {
    return NextResponse.json({ error: "Apenas arquivos PDF são aceitos." }, { status: 400 });
  }

  const prompt = PROMPTS[type as "pass" | "hosp"] ?? PROMPTS.pass;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      { inlineData: { data: base64, mimeType: "application/pdf" } },
      prompt,
    ]);

    const text = result.response.text();
    const clean = text.replace(/```json|```/g, "").trim();
    const jsonMatch = clean.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: `Não consegui ler os dados deste documento. Preencha manualmente.` },
        { status: 422 }
      );
    }

    const parsed = JSON.parse(jsonMatch[0]) as Record<string, string>[];
    return NextResponse.json({ blocks: parsed });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
