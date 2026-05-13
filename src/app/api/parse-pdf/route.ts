import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;
  const type = form.get("type") as string;

  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

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

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: "application/pdf",
        data: base64,
      },
    },
    { text: prompts[type] },
  ]);

  let text: string;
  try {
    text = result.response.text();
  } catch {
    return Response.json(
      { ok: false, error: "Não foi possível extrair os dados deste PDF." },
      { status: 422 }
    );
  }

  // Remove markdown fences if present, then find the JSON array
  const stripped = text.replace(/```(?:json)?/g, "").trim();
  const match = stripped.match(/\[[\s\S]*\]/);
  const clean = match ? match[0] : stripped;

  try {
    const parsed = JSON.parse(clean);
    const blocks = Array.isArray(parsed) ? parsed : Object.values(parsed)[0];
    return Response.json({ ok: true, blocks });
  } catch {
    return Response.json(
      { ok: false, error: "Não foi possível extrair os dados deste PDF." },
      { status: 422 }
    );
  }
}
