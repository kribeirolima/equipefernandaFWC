import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const PROMPT = `Analise este voucher e extraia as informações em JSON.

Se for PASSAGEM AÉREA:
{"tipo":"passagem","data":"DD/MM/AAAA","saida":"HH:MM","chegada":"HH:MM","aero_orig":"GRU","cidade_orig":"São Paulo","aero_dest":"JFK","cidade_dest":"Nova York"}

Se for HOSPEDAGEM:
{"tipo":"hospedagem","local":"Nome do Hotel","checkin":"DD/MM/AAAA","checkout":"DD/MM/AAAA","cidade":"Nova York"}

Retorne APENAS o JSON, sem texto adicional.`;

async function uploadFile(buffer: Buffer, mimeType: string): Promise<string> {
  const boundary = "gemini_upload_boundary";
  const metadata = JSON.stringify({ file: { display_name: "voucher" } });

  const body = Buffer.concat([
    Buffer.from(`--${boundary}\r\nContent-Type: application/json\r\n\r\n${metadata}\r\n--${boundary}\r\nContent-Type: ${mimeType}\r\n\r\n`),
    buffer,
    Buffer.from(`\r\n--${boundary}--`),
  ]);

  const res = await fetch(
    `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": `multipart/related; boundary=${boundary}` },
      body,
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Upload falhou: ${err}`);
  }

  const json = await res.json() as { file: { uri: string } };
  return json.file.uri;
}

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
  const buffer = Buffer.from(arrayBuffer);

  let part: Record<string, unknown>;

  if (mimeType === "application/pdf") {
    // PDFs precisam ser enviados via Files API
    const fileUri = await uploadFile(buffer, mimeType);
    part = { file_data: { mime_type: mimeType, file_uri: fileUri } };
  } else {
    // Imagens podem usar inline base64
    part = { inline_data: { mime_type: mimeType, data: buffer.toString("base64") } };
  }

  const payload = {
    contents: [{
      parts: [part, { text: PROMPT }],
    }],
  };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
  );

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: `Erro na API Gemini: ${err}` }, { status: 502 });
  }

  const data = await res.json() as { candidates?: { content: { parts: { text: string }[] } }[] };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
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
