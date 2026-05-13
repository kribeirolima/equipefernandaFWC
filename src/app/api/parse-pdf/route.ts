export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;
  const type = form.get("type") as string;

  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(new Uint8Array(bytes)).toString("base64");

  const prompts: Record<string, string> = {
    pass: `
Leia este bilhete eletrônico de passagem aérea.
Extraia TODOS os trechos de voo e retorne um array JSON.
Cada objeto deve ter exatamente estes campos:
{
  "voo":        "AA 904",
  "data":       "01 jun 2026",
  "saida":      "22h10",
  "chegada":    "02 jun · 05h45",
  "origem_cod": "GIG",
  "origem_cidade": "Rio de Janeiro",
  "origem_pais":   "Brasil",
  "destino_cod":   "MIA",
  "destino_cidade": "Miami",
  "destino_pais":   "EUA",
  "bagagem":    "02 peças"
}
Retorne APENAS o array JSON, sem texto, sem markdown, sem explicações.`,

    hosp: `
Leia esta confirmação de hospedagem.
Extraia TODAS as reservas e retorne um array JSON.
Cada objeto deve ter exatamente estes campos:
{
  "hotel":      "Suites Perisur Apartamentos Amueblados",
  "checkin":    "09 jun 2026",
  "checkout":   "11 jun 2026",
  "cidade":     "Cidade do México",
  "pais":       "México",
  "endereco":   "Calle Alba No. 15, Col. Insurgentes Cuicuilco, CDMX",
  "quarto":     "Master Suite King",
  "confirmacao":"rev-2438902325"
}
Retorne APENAS o array JSON, sem texto, sem markdown, sem explicações.`,
  };

  let text: string;
  try {
    const apiKey = process.env.GEMINI_API_KEY!;
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { inline_data: { mime_type: "application/pdf", data: base64 } },
                { text: prompts[type] },
              ],
            },
          ],
          generationConfig: { response_mime_type: "application/json" },
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gemini ${res.status}: ${errText.slice(0, 300)}`);
    }

    const json = await res.json();
    text = json.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[parse-pdf] error:", msg);
    return Response.json(
      { ok: false, error: `Erro ao processar o PDF: ${msg}` },
      { status: 422 }
    );
  }

  console.log("[parse-pdf] raw text:", text.slice(0, 500));

  const stripped = text.replace(/```(?:json)?/g, "").trim();
  const match = stripped.match(/\[[\s\S]*\]/);
  const clean = match ? match[0] : stripped;

  try {
    const parsed = JSON.parse(clean);
    const blocks = Array.isArray(parsed) ? parsed : Object.values(parsed)[0];
    return Response.json({ ok: true, blocks });
  } catch (e) {
    console.error("[parse-pdf] JSON.parse failed. clean was:", clean.slice(0, 300));
    return Response.json(
      { ok: false, error: "Não foi possível extrair os dados deste PDF." },
      { status: 422 }
    );
  }
}
