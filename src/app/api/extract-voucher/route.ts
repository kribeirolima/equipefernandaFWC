import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const PROMPT = `Analise este voucher e extraia as informações em JSON.

Se for PASSAGEM AÉREA:
{"tipo":"passagem","data":"DD/MM/AAAA","saida":"HH:MM","chegada":"HH:MM","aero_orig":"GRU","cidade_orig":"São Paulo","aero_dest":"JFK","cidade_dest":"Nova York"}

Se for HOSPEDAGEM:
{"tipo":"hospedagem","local":"Nome do Hotel","checkin":"DD/MM/AAAA","checkout":"DD/MM/AAAA","cidade":"Nova York"}

Retorne APENAS o JSON, sem texto adicional.`;

async function uploadToGemini(buffer: Buffer, mimeType: string): Promise<string> {
  // Step 1: iniciar upload resumível
  const initRes = await fetch(
    `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "X-Goog-Upload-Protocol": "resumable",
        "X-Goog-Upload-Command": "start",
        "X-Goog-Upload-Header-Content-Length": buffer.byteLength.toString(),
        "X-Goog-Upload-Header-Content-Type": mimeType,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file: { display_name: "voucher" } }),
    }
  );

  if (!initRes.ok) {
    const t = await initRes.text();
    throw new Error(`Gemini init falhou (${initRes.status}): ${t.slice(0, 300)}`);
  }

  const uploadUrl = initRes.headers.get("X-Goog-Upload-URL");
  if (!uploadUrl) throw new Error("Gemini não retornou upload URL");

  // Step 2: enviar bytes do arquivo
  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Length": buffer.byteLength.toString(),
      "X-Goog-Upload-Command": "upload, finalize",
      "X-Goog-Upload-Offset": "0",
    },
    body: new Uint8Array(buffer),
  });

  const text = await uploadRes.text();
  if (!uploadRes.ok) throw new Error(`Gemini upload falhou (${uploadRes.status}): ${text.slice(0, 300)}`);

  const json = JSON.parse(text) as { file?: { uri?: string } };
  if (!json.file?.uri) throw new Error(`Gemini upload sem URI: ${text.slice(0, 300)}`);
  return json.file.uri;
}

async function generateContent(part: Record<string, unknown>): Promise<string> {
  const payload = {
    contents: [{ parts: [part, { text: PROMPT }] }],
  };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
  );

  const text = await res.text();
  if (!res.ok) throw new Error(`Gemini generate falhou (${res.status}): ${text.slice(0, 300)}`);

  const json = JSON.parse(text) as { candidates?: { content: { parts: { text: string }[] } }[] };
  const content = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content) throw new Error(`Gemini sem resposta: ${text.slice(0, 300)}`);
  return content;
}

export async function POST(request: Request) {
  if (!GEMINI_API_KEY) {
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

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    let part: Record<string, unknown>;

    if (mimeType === "application/pdf") {
      const fileUri = await uploadToGemini(buffer, mimeType);
      part = { file_data: { mime_type: mimeType, file_uri: fileUri } };
    } else {
      part = { inline_data: { mime_type: mimeType, data: buffer.toString("base64") } };
    }

    const responseText = await generateContent(part);

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: `Gemini não extraiu JSON. Resposta: ${responseText.slice(0, 200)}` }, { status: 422 });
    }

    const extracted = JSON.parse(jsonMatch[0]) as Record<string, string>;
    return NextResponse.json(extracted);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
