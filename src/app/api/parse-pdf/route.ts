import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const PROMPTS = {
  pass: `Leia este bilhete aéreo e extraia TODOS os trechos de voo.
Para cada trecho, retorne um JSON com os campos:
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
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "ANTHROPIC_API_KEY não configurada" }, { status: 500 });

  let form: FormData;
  try { form = await req.formData(); } catch {
    return NextResponse.json({ error: "form data inválido" }, { status: 400 });
  }

  const file = form.get("file") as File | null;
  const type = (form.get("type") as string) ?? "pass";

  if (!file) return NextResponse.json({ error: "arquivo não enviado" }, { status: 400 });
  if (file.type !== "application/pdf") return NextResponse.json({ error: "Apenas arquivos PDF são aceitos." }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");

  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 1000,
    messages: [{
      role: "user",
      content: [
        { type: "document", source: { type: "base64", media_type: "application/pdf", data: base64 } },
        { type: "text", text: PROMPTS[type as "pass" | "hosp"] ?? PROMPTS.pass },
      ],
    }],
  });

  const text = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");

  const clean = text.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(clean) as Record<string, string>[];
    return NextResponse.json({ blocks: parsed });
  } catch {
    return NextResponse.json({ error: "Não consegui ler os dados deste documento. Preencha manualmente." }, { status: 422 });
  }
}
