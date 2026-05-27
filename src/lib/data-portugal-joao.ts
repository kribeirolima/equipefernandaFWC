export type Difficulty = "facil" | "moderado" | "dificil";

export interface PortugalRoute {
  destino: string;
  endereco: string;
  carN: string;
  carH: string;
  tp: string;
  dist: string;
  diff: Difficulty;
  mapsUrl: string;
}

export interface PortugalBase {
  id: string;
  emoji: string;
  cidade: string;
  periodo: string;
  hotel: string;
  hotelAddr: string;
  nota?: string;
  fuso?: string;
  referenciaLabel?: string;
  referenciaAddr?: string;
  routes: PortugalRoute[];
  transitoInfo?: string[];
  insights: string[];
}

export const PORTUGAL_BASES: PortugalBase[] = [

  // ── BASE 1 — Cidade do México · 08–12 jun ────────────────────
  {
    id: "cdmx",
    emoji: "🌮",
    cidade: "Cidade do México",
    periodo: "08–12 jun",
    hotel: "Hotel Galeria Plaza Reforma",
    hotelAddr: "Hamburgo 195, Colonia Juárez, 06600 CDMX",
    nota: "Mesmo hotel da Equipe Brasil (Defante). Zona Rosa / Paseo de la Reforma — bairro central e seguro. Metrô Insurgentes (Linha 1) a 3 min a pé.",
    fuso: "CDT (UTC -5h) · BRT = CDT +2h · Miami (EDT) = CDT +1h",
    referenciaLabel: "Estádio Copa: Estadio Azteca (Banorte)",
    referenciaAddr: "Calz. de Tlalpan 3465, Coyoacán, CDMX",
    routes: [
      {
        destino: "Estadio Azteca (Banorte)",
        endereco: "Calz. de Tlalpan 3465, Coyoacán, CDMX",
        carN: "40 min",
        carH: "60–90 min",
        tp: "Metrô L2 → Tasqueña + Tren Ligero ~55 min / $6 MXN",
        dist: "22 km",
        diff: "moderado",
        mapsUrl: "https://maps.google.com/?saddr=Hamburgo+195,+Juarez,+CDMX&daddr=Calz+de+Tlalpan+3465,+Santa+Ursula+Coapa,+CDMX",
      },
      {
        destino: "AICM — Aeroporto MEX",
        endereco: "Av. Capitán Carlos León, Peñón de los Baños, CDMX",
        carN: "25 min",
        carH: "40–60 min",
        tp: "Metrô L1 → Terminal Aérea ~30 min / $6 MXN",
        dist: "15 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=Hamburgo+195,+Juarez,+CDMX&daddr=Av+Capitan+Carlos+Leon,+Penon+de+los+Banos,+CDMX",
      },
      {
        destino: "AIFA — Felipe Ángeles",
        endereco: "Carr. Fed. México-Pachuca Km 58, Zumpango, Estado de México",
        carN: "55 min",
        carH: "75–90 min",
        tp: "Ônibus AIFA Bus ~1h / $100 MXN",
        dist: "49 km",
        diff: "moderado",
        mapsUrl: "https://maps.google.com/?saddr=Hamburgo+195,+Juarez,+CDMX&daddr=Aeropuerto+Internacional+Felipe+Angeles,+Estado+de+Mexico",
      },
      {
        destino: "Metrô Insurgentes (L1)",
        endereco: "Metrô Insurgentes, Colonia Juárez, CDMX",
        carN: "3 min",
        carH: "5 min",
        tp: "A pé 3 min / $6 MXN",
        dist: "0,2 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=Hamburgo+195,+Juarez,+CDMX&daddr=Metro+Insurgentes,+CDMX",
      },
      {
        destino: "Paseo de la Reforma",
        endereco: "Paseo de la Reforma, CDMX",
        carN: "5 min",
        carH: "8 min",
        tp: "A pé 5 min / $0",
        dist: "0,4 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=Hamburgo+195,+Juarez,+CDMX&daddr=Paseo+de+la+Reforma,+CDMX",
      },
      {
        destino: "Chapultepec / Bosque",
        endereco: "Bosque de Chapultepec, CDMX",
        carN: "10 min",
        carH: "15 min",
        tp: "Metrô Chapultepec (L1) ~8 min / $6 MXN · A pé 20 min",
        dist: "2 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=Hamburgo+195,+Juarez,+CDMX&daddr=Bosque+de+Chapultepec,+CDMX",
      },
      {
        destino: "Zócalo / Centro Histórico",
        endereco: "Plaza de la Constitución, CDMX",
        carN: "20 min",
        carH: "35 min",
        tp: "Metrô L1 ~15 min / $6 MXN",
        dist: "7 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=Hamburgo+195,+Juarez,+CDMX&daddr=Zocalo,+CDMX",
      },
      {
        destino: "Miami (próxima base)",
        endereco: "Miami International Airport, FL",
        carN: "N/A",
        carH: "N/A",
        tp: "Voo MEX → MIA ~3h / $150–450",
        dist: "—",
        diff: "moderado",
        mapsUrl: "https://maps.google.com/?saddr=Hamburgo+195,+Juarez,+CDMX&daddr=Miami+International+Airport,+FL",
      },
    ],
    transitoInfo: [
      "Metrô CDMX: estação Insurgentes (L1 — Rosa) a 3 min a pé. Tarifa: $6 MXN (~$0,35 USD) — uma das mais baratas do mundo.",
      "Para o Azteca: Metrô L1 → Pino Suárez → L2 → Tasqueña + Tren Ligero até Estadio Azteca. Total: ~55 min / $6 MXN. Muito caótico em dias de Copa.",
      "Para o AICM: Metrô L1 → Pantitlán → L5 até Terminal Aérea. ~30 min / $6 MXN — a opção mais rápida e barata.",
      "Uber e Didi disponíveis em CDMX. Didi tende a ser mais barato. Evitar táxis de rua — turistas são alvos frequentes.",
      "AICM: chegar 3h antes para voos internacionais — filas longas de imigração e check-in.",
    ],
    insights: [
      "🚨 Estadio Azteca em dias de Copa: trânsito caótico no eixo Tlalpan–Periférico. Sair 2h30 antes. Uber recomendado.",
      "⚠️ AICM para o voo a Miami: chegar 3h antes. Metrô L1 é a opção mais rápida e barata.",
      "⚠️ Evitar táxis de rua em CDMX — usar Uber ou Didi exclusivamente.",
      "Metrô Insurgentes (L1) a 3 min a pé do hotel — hub central de toda a rede de metrô.",
      "Fuso: CDMX é CDT (UTC -5h) · BRT = CDT +2h · Ao chegar em Miami: fuso avança 1h → EDT.",
      "Moeda: MXN. ~1 USD = $17–18 MXN. Metrô CDMX: $6 MXN por viagem (~R$2).",
    ],
  },

  // ── BASE PRINCIPAL — Miami, FL · 12 jun–01 jul ────────────────
  {
    id: "miami",
    emoji: "🌴",
    cidade: "Miami FL",
    periodo: "base principal · 12 jun–01 jul",
    hotel: "Airbnb (endereço a confirmar)",
    hotelAddr: "Referência: Brickell / Downtown Miami — será atualizado com endereço exato",
    nota: "Base mais longa — 19 dias com 2 saídas para Houston (15–17 jun e 21–23 jun). Distâncias calculadas a partir de Brickell/Downtown Miami como referência.",
    fuso: "EDT (UTC -4h) · BRT = EDT +1h · CDMX/Houston = EDT -1h",
    referenciaLabel: "Estádio Copa: Hard Rock Stadium ⭐ 4.6",
    referenciaAddr: "347 Don Shula Dr, Miami Gardens, FL 33056",
    routes: [
      {
        destino: "Hard Rock Stadium",
        endereco: "347 Don Shula Dr, Miami Gardens, FL 33056",
        carN: "25 min",
        carH: "35–55 min",
        tp: "Metrorail + shuttle Copa ~40 min / $2,25",
        dist: "23 km",
        diff: "moderado",
        mapsUrl: "https://maps.google.com/?saddr=Brickell,+Miami,+FL&daddr=347+Don+Shula+Dr,+Miami+Gardens,+FL",
      },
      {
        destino: "Miami Intl Airport (MIA)",
        endereco: "2100 NW 42nd Ave, Miami, FL 33142",
        carN: "20 min",
        carH: "30 min",
        tp: "Metrorail Orange Line ~25 min / $2,25",
        dist: "12 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=Brickell,+Miami,+FL&daddr=2100+NW+42nd+Ave,+Miami,+FL",
      },
      {
        destino: "Fort Lauderdale Airport (FLL)",
        endereco: "Fort Lauderdale-Hollywood Intl Airport, FL",
        carN: "40 min",
        carH: "55 min",
        tp: "Tri-Rail ~55 min / $5,25",
        dist: "40 km",
        diff: "moderado",
        mapsUrl: "https://maps.google.com/?saddr=Brickell,+Miami,+FL&daddr=Fort+Lauderdale+Hollywood+Intl+Airport,+FL",
      },
      {
        destino: "Brightline Miami Station",
        endereco: "600 NW 1st Ave, Miami, FL 33136",
        carN: "12 min",
        carH: "18 min",
        tp: "Metrorail / Metromover ~15 min / $2,25",
        dist: "5 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=Brickell,+Miami,+FL&daddr=600+NW+1st+Ave,+Miami,+FL",
      },
      {
        destino: "Metrorail Brickell Station",
        endereco: "Brickell Metrorail Station, Miami, FL",
        carN: "8 min",
        carH: "12 min",
        tp: "Metromover gratuito ~10 min",
        dist: "3 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=Brickell,+Miami,+FL&daddr=Brickell+Metrorail+Station,+Miami,+FL",
      },
      {
        destino: "South Beach",
        endereco: "South Beach, Miami Beach, FL",
        carN: "20 min",
        carH: "30 min",
        tp: "Metrobus ~30 min / $2,25",
        dist: "10 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=Brickell,+Miami,+FL&daddr=South+Beach,+Miami+Beach,+FL",
      },
      {
        destino: "Wynwood",
        endereco: "Wynwood, Miami, FL",
        carN: "12 min",
        carH: "18 min",
        tp: "Metrobus ~20 min / $2,25",
        dist: "5 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=Brickell,+Miami,+FL&daddr=Wynwood,+Miami,+FL",
      },
      {
        destino: "Brickell City Centre",
        endereco: "701 S Miami Ave, Miami, FL 33130",
        carN: "5 min",
        carH: "8 min",
        tp: "Metromover gratuito ~8 min",
        dist: "2 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=Brickell,+Miami,+FL&daddr=701+S+Miami+Ave,+Miami,+FL",
      },
      {
        destino: "Houston — 1ª saída (15 jun) e 2ª saída (21 jun)",
        endereco: "George Bush Intercontinental (IAH) / Hobby Airport (HOU), Houston, TX",
        carN: "N/A",
        carH: "N/A",
        tp: "Voo MIA → HOU ~2h / $100–350 · Preferir HOU para Home2 Suites",
        dist: "—",
        diff: "moderado",
        mapsUrl: "https://maps.google.com/?saddr=Miami+International+Airport,+FL&daddr=George+Bush+Intercontinental+Airport,+Houston,+TX",
      },
    ],
    transitoInfo: [
      "Metrorail Orange Line: conecta MIA Airport ao Downtown / Brickell em ~25 min / $2,25. Linha mais útil para a base.",
      "Metromover: completamente gratuito no Downtown e Brickell. Conecta as estações Metrorail a destinos chave — usar sempre que possível para economizar.",
      "EASY Card (cartão recarga): recomendado para os 19 dias. Passe semanal ~$29. Economiza na bilheteria e agiliza o embarque.",
      "Brightline: trem de alta velocidade. Miami → Fort Lauderdale ~30 min / $10–20. Miami → West Palm Beach ~1h10. Miami → Orlando ~3h / $25–79.",
      "Hard Rock Stadium: Metrorail Orange Line → Hialeah Market Station + shuttle Copa. ~40 min / $2,25. Uber com surge alto em dias de jogo.",
    ],
    insights: [
      "⚠️ Endereço Airbnb a confirmar — links e distâncias serão ajustados com o endereço exato.",
      "Hard Rock Stadium em dias de Copa: Metrorail + shuttle ou Uber 30 min antes. Surge pricing alto — pedir cedo.",
      "19 dias em Miami: considerar EASY Card semanal (~$29) para uso intensivo do Metrorail.",
      "✅ Brightline excelente para day trips durante dias livres — Fort Lauderdale, West Palm Beach e Orlando a poucas horas.",
      "Metromover gratuito no Brickell/Downtown — usar para deslocamentos curtos sem precisar de Uber.",
      "Fuso: Miami é EDT (UTC -4h) · BRT = EDT +1h · Ao ir para Houston: fuso recua 1h → CDT.",
      "⚠️ 2 saídas para Houston programadas: 15 jun (retorna 17 jun) e 21 jun (retorna 23 jun). Confirmar voos com antecedência.",
    ],
  },

  // ── BASE RECORRENTE — Houston, TX · 15–17 jun + 21–23 jun ─────
  {
    id: "houston",
    emoji: "🛢️",
    cidade: "Houston TX",
    periodo: "base recorrente · 15–17 jun · 21–23 jun",
    hotel: "Home2 Suites Hilton (15–17 jun) · Hampton Inn Downtown (21–23 jun)",
    hotelAddr: "1540 Leeland St (Home2 Suites ⭐4.5) · 710 Crawford St (Hampton Inn) — ambos Downtown Houston, < 1 km de distância",
    nota: "Dois hotéis a menos de 1 km de distância no Downtown Houston. Home2 Suites ⭐4.5: café da manhã incluído, bar/restaurante no local. Hampton Inn: localização ultra-central ao lado do Downtown TC. Mesmos deslocamentos práticos para ambos.",
    fuso: "CDT (UTC -5h) · BRT = CDT +2h · Miami = CDT +1h",
    referenciaLabel: "Estádio Copa: NRG Stadium",
    referenciaAddr: "1 NRG Pkwy, Houston, TX 77054",
    routes: [
      {
        destino: "NRG Stadium",
        endereco: "1 NRG Pkwy, Houston, TX 77054",
        carN: "10 min",
        carH: "15–25 min",
        tp: "METRORail Red Line ~15 min / $1,25",
        dist: "7 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=1540+Leeland+St,+Houston,+TX&daddr=1+NRG+Pkwy,+Houston,+TX",
      },
      {
        destino: "Houston IAH (Bush)",
        endereco: "2800 N Terminal Rd, Houston, TX 77032",
        carN: "35 min",
        carH: "50–70 min",
        tp: "Metro + ônibus ~1h20 / $3,50",
        dist: "45 km",
        diff: "moderado",
        mapsUrl: "https://maps.google.com/?saddr=1540+Leeland+St,+Houston,+TX&daddr=2800+N+Terminal+Rd,+Houston,+TX",
      },
      {
        destino: "Hobby Airport (HOU)",
        endereco: "7800 Airport Blvd, Houston, TX 77061",
        carN: "20 min",
        carH: "30 min",
        tp: "METRORail + ônibus ~40 min / $2,50",
        dist: "17 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=1540+Leeland+St,+Houston,+TX&daddr=7800+Airport+Blvd,+Houston,+TX",
      },
      {
        destino: "Houston Amtrak (Union Station)",
        endereco: "902 Washington Ave, Houston, TX 77002",
        carN: "8–10 min",
        carH: "12 min",
        tp: "METRORail ~10 min / $1,25",
        dist: "4–7 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=1540+Leeland+St,+Houston,+TX&daddr=902+Washington+Ave,+Houston,+TX",
      },
      {
        destino: "METRORail Downtown TC",
        endereco: "Main St & Capitol St, Houston, TX 77002",
        carN: "1–3 min",
        carH: "3–5 min",
        tp: "A pé 1–5 min / $0",
        dist: "0,1–0,4 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=1540+Leeland+St,+Houston,+TX&daddr=Main+St+%26+Capitol+St,+Houston,+TX",
      },
      {
        destino: "George R. Brown Convention Center",
        endereco: "1001 Avenida De Las Americas, Houston, TX 77010",
        carN: "3–5 min",
        carH: "5–8 min",
        tp: "A pé / METRORail $1,25",
        dist: "0,4–1 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=1540+Leeland+St,+Houston,+TX&daddr=1001+Avenida+De+Las+Americas,+Houston,+TX",
      },
      {
        destino: "Miami (retorno)",
        endereco: "Miami International Airport, FL",
        carN: "N/A",
        carH: "N/A",
        tp: "Voo HOU/IAH → MIA ~2h / $100–350 · Preferir HOU para retorno",
        dist: "—",
        diff: "moderado",
        mapsUrl: "https://maps.google.com/?saddr=710+Crawford+St,+Houston,+TX&daddr=Miami+International+Airport,+FL",
      },
    ],
    transitoInfo: [
      "METRORail Red Line: liga o Downtown ao NRG Stadium (Reliant Park) em ~15 min / $1,25. Home2 Suites: estação Convention District a 3 min a pé. Hampton Inn: Downtown Transit Center a 1 min a pé.",
      "Tarifa METRORail: $1,25 por viagem. Trens extras em dias de Copa — verificar horários no app METRONext.",
      "HOU (Hobby): preferir para voo de retorno a Miami quando saindo do Home2 Suites — 20 min de carro.",
      "IAH (Bush): usar para voos com conexão ou internacionais — 35 min de carro de ambos os hotéis.",
    ],
    insights: [
      "✅ METRORail a menos de 5 min a pé de ambos os hotéis — acesso direto ao NRG sem Uber.",
      "NRG Stadium em dias de Copa: METRORail obrigatório. Ir 1h30 antes dos portões.",
      "HOU (Hobby) preferível para retorno a Miami — mais próximo do Home2 Suites (20 min de carro).",
      "⚠️ Mudança de fuso ao chegar de Miami: recuar 1h (EDT → CDT). Ao voltar: avançar 1h.",
      "Fuso: Houston é CDT (UTC -5h) · BRT = CDT +2h · Miami = CDT +1h.",
      "Home2 Suites (1ª estadia) ⭐4.5: café da manhã e bar/restaurante incluídos. Hampton Inn (2ª estadia): METRORail Downtown TC a 1 min a pé.",
    ],
  },
];
