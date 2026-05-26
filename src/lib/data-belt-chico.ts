export type Difficulty = "facil" | "moderado" | "dificil";

export interface BeltChicoRoute {
  destino: string;
  endereco: string;
  carN: string;
  carH: string;
  tp: string;
  dist: string;
  diff: Difficulty;
  mapsUrl: string;
}

export interface BeltChicoBase {
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
  routes: BeltChicoRoute[];
  transitoInfo?: string[];
  insights: string[];
}

export const BELT_CHICO_BASES: BeltChicoBase[] = [
  // ── BASE PRINCIPAL — Morristown, NJ ──────────────────────────
  {
    id: "morristown",
    emoji: "🏠",
    cidade: "Morristown NJ",
    periodo: "01–05 · 07–23 · 25–28 jun",
    hotel: "Hyatt House Morristown",
    hotelAddr: "194 Park Ave, Morristown, NJ 07960",
    nota: "Base principal — três períodos distintos no mesmo hotel.",
    fuso: "EDT (UTC -4h) · BRT = EDT +1h",
    referenciaLabel: "Estádio Copa: MetLife Stadium",
    referenciaAddr: "1 MetLife Stadium Dr, East Rutherford, NJ 07073",
    routes: [
      {
        destino: "MetLife Stadium",
        endereco: "1 MetLife Stadium Dr, East Rutherford, NJ 07073",
        carN: "30 min",
        carH: "40–60 min",
        tp: "NJ Transit → Secaucus → shuttle ~55 min / ~$15",
        dist: "45 km",
        diff: "moderado",
        mapsUrl:
          "https://maps.google.com/?saddr=194+Park+Ave,+Morristown,+NJ&daddr=1+MetLife+Stadium+Dr,+East+Rutherford,+NJ",
      },
      {
        destino: "Newark Intl (EWR)",
        endereco: "3 Brewster Rd, Newark, NJ 07114",
        carN: "35 min",
        carH: "45–65 min",
        tp: "NJ Transit → Newark Penn ~50 min / ~$10 + AirTrain $5,50",
        dist: "40 km",
        diff: "moderado",
        mapsUrl:
          "https://maps.google.com/?saddr=194+Park+Ave,+Morristown,+NJ&daddr=Newark+Liberty+International+Airport,+NJ",
      },
      {
        destino: "JFK International",
        endereco: "Queens, NY 11430",
        carN: "55 min",
        carH: "1h15–1h45",
        tp: "NJ Transit + PATH + AirTrain ~90 min / ~$18",
        dist: "65 km",
        diff: "dificil",
        mapsUrl:
          "https://maps.google.com/?saddr=194+Park+Ave,+Morristown,+NJ&daddr=JFK+International+Airport,+Queens,+NY",
      },
      {
        destino: "LaGuardia (LGA)",
        endereco: "Queens, NY 11371",
        carN: "50 min",
        carH: "1h–1h30",
        tp: "NJ Transit + bus ~75 min / ~$10",
        dist: "55 km",
        diff: "dificil",
        mapsUrl:
          "https://maps.google.com/?saddr=194+Park+Ave,+Morristown,+NJ&daddr=LaGuardia+Airport,+Queens,+NY",
      },
      {
        destino: "Penn Station NYC",
        endereco: "4 Pennsylvania Plaza, New York, NY 10001",
        carN: "45 min",
        carH: "55–75 min",
        tp: "NJ Transit → Penn Station ~55 min / ~$14",
        dist: "50 km",
        diff: "moderado",
        mapsUrl:
          "https://maps.google.com/?saddr=194+Park+Ave,+Morristown,+NJ&daddr=Penn+Station,+New+York,+NY",
      },
      {
        destino: "Morristown Station (NJT)",
        endereco: "16 South St, Morristown, NJ 07960",
        carN: "3 min",
        carH: "5 min",
        tp: "A pé 7 min / $0",
        dist: "0,5 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=194+Park+Ave,+Morristown,+NJ&daddr=Morristown+Train+Station,+Morristown,+NJ",
      },
      {
        destino: "Hoboken Terminal",
        endereco: "1 Hudson Pl, Hoboken, NJ 07030",
        carN: "40 min",
        carH: "55 min",
        tp: "NJ Transit → Hoboken ~50 min / ~$9",
        dist: "42 km",
        diff: "moderado",
        mapsUrl:
          "https://maps.google.com/?saddr=194+Park+Ave,+Morristown,+NJ&daddr=Hoboken+Terminal,+Hoboken,+NJ",
      },
      {
        destino: "Times Square",
        endereco: "Times Square, New York, NY 10036",
        carN: "50 min",
        carH: "1h10",
        tp: "NJ Transit → Penn + metrô ~65 min / ~$14",
        dist: "52 km",
        diff: "moderado",
        mapsUrl:
          "https://maps.google.com/?saddr=194+Park+Ave,+Morristown,+NJ&daddr=Times+Square,+New+York,+NY",
      },
      {
        destino: "Central Park",
        endereco: "Central Park, New York, NY",
        carN: "55 min",
        carH: "1h15",
        tp: "NJ Transit → Penn + metrô ~75 min / ~$14",
        dist: "56 km",
        diff: "moderado",
        mapsUrl:
          "https://maps.google.com/?saddr=194+Park+Ave,+Morristown,+NJ&daddr=Central+Park,+New+York,+NY",
      },
      {
        destino: "Philadelphia (base pontual)",
        endereco: "Philadelphia, PA",
        carN: "1h15",
        carH: "1h30",
        tp: "NJ Transit → NYC Penn + Amtrak ~2h / ~$30",
        dist: "110 km",
        diff: "moderado",
        mapsUrl:
          "https://maps.google.com/?saddr=194+Park+Ave,+Morristown,+NJ&daddr=Philadelphia,+PA",
      },
      {
        destino: "Cleveland (transfer)",
        endereco: "Cleveland, OH — voo EWR → CLE",
        carN: "—",
        carH: "—",
        tp: "Voo EWR → CLE ~1h45 / $100–300",
        dist: "—",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=194+Park+Ave,+Morristown,+NJ&daddr=Newark+Liberty+International+Airport,+NJ",
      },
      {
        destino: "Miami (transfer)",
        endereco: "Miami, FL — voo EWR → MIA",
        carN: "—",
        carH: "—",
        tp: "Voo EWR → MIA ~3h / $100–350",
        dist: "—",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=194+Park+Ave,+Morristown,+NJ&daddr=Newark+Liberty+International+Airport,+NJ",
      },
    ],
    transitoInfo: [
      "Morristown Station (NJ Transit) — a 7 min a pé do hotel. Linha Morris & Essex Line.",
      "Destinos diretos: Newark Penn Station, Secaucus Junction, New York Penn Station.",
      "Frequência: a cada 30–60 min. Verificar horários no app NJ Transit antes de sair.",
      "Tarifas: Morristown → Newark Penn ~$7,75 | → NY Penn Station ~$14,00 | → Secaucus ~$12,00.",
      "MetLife Stadium: NJ Transit → Secaucus Junction → shuttle FIFA. Sair antes das 12h30 para jogos às 16h.",
      "Uber de Morristown → MetLife: ~$45–70 (varia muito em dias de Copa — NJ Transit é mais confiável).",
    ],
    insights: [
      "Dias de jogo MetLife: perímetro FIFA fecha às 14h. Sair de Morristown antes das 12h30.",
      "EWR é o aeroporto ideal desta base — mais próximo e mais barato que JFK e LGA.",
      "JFK e LGA: quase 1h em condições normais. Sempre considerar margem extra.",
      "NJ Transit app: baixar antes da viagem para comprar bilhetes e ver horários em tempo real.",
      "Fuso: Morristown é EDT (UTC -4h) — todas as bases desta equipe no mesmo fuso. BRT = EDT +1h.",
    ],
  },

  // ── BASE 2 — Cleveland, OH · 05–07 jun ───────────────────────
  {
    id: "cleveland",
    emoji: "⚡",
    cidade: "Cleveland OH",
    periodo: "05–07 jun",
    hotel: "Crowne Plaza Cleveland at Playhouse Square by IHG",
    hotelAddr: "1260 Euclid Ave, Cleveland, OH 44115",
    nota: "Hotel no Playhouse Square / Theater District — Progressive Field a 5 min a pé.",
    fuso: "EDT (UTC -4h) · BRT = EDT +1h",
    referenciaLabel: "Estádio Copa: Progressive Field",
    referenciaAddr: "2401 Ontario St, Cleveland, OH 44115",
    routes: [
      {
        destino: "Progressive Field",
        endereco: "2401 Ontario St, Cleveland, OH 44115",
        carN: "5 min",
        carH: "8 min",
        tp: "A pé 5–7 min / $0",
        dist: "0,4 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=1260+Euclid+Ave,+Cleveland,+OH&daddr=2401+Ontario+St,+Cleveland,+OH",
      },
      {
        destino: "Cleveland Hopkins Intl (CLE)",
        endereco: "5300 Riverside Dr, Cleveland, OH 44135",
        carN: "25 min",
        carH: "35 min",
        tp: "RTA Red Line ~25 min / $2,50",
        dist: "19 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=1260+Euclid+Ave,+Cleveland,+OH&daddr=5300+Riverside+Dr,+Cleveland,+OH",
      },
      {
        destino: "Tower City Station (RTA)",
        endereco: "230 W Huron Rd, Cleveland, OH 44113",
        carN: "5 min",
        carH: "7 min",
        tp: "A pé 8 min / $0",
        dist: "0,6 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=1260+Euclid+Ave,+Cleveland,+OH&daddr=Tower+City+Station,+Cleveland,+OH",
      },
      {
        destino: "Cleveland Amtrak (Lakefront)",
        endereco: "200 Cleveland Memorial Shoreway, Cleveland, OH 44114",
        carN: "10 min",
        carH: "12 min",
        tp: "Uber ~$10–15 / RTA ~20 min",
        dist: "3,5 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=1260+Euclid+Ave,+Cleveland,+OH&daddr=200+Cleveland+Memorial+Shoreway,+Cleveland,+OH",
      },
      {
        destino: "Rock and Roll Hall of Fame",
        endereco: "1100 Rock and Roll Blvd, Cleveland, OH 44114",
        carN: "8 min",
        carH: "12 min",
        tp: "A pé 15 min / $0",
        dist: "1,2 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=1260+Euclid+Ave,+Cleveland,+OH&daddr=1100+Rock+and+Roll+Blvd,+Cleveland,+OH",
      },
      {
        destino: "Morristown NJ (retorno)",
        endereco: "Newark, NJ — voo CLE → EWR",
        carN: "—",
        carH: "—",
        tp: "Voo CLE → EWR ~1h45 / $100–300",
        dist: "—",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=1260+Euclid+Ave,+Cleveland,+OH&daddr=Cleveland+Hopkins+International+Airport,+OH",
      },
    ],
    transitoInfo: [
      "Tower City / Public Square Station (Red, Green, Blue Lines) — a 8 min a pé do hotel.",
      "RTA Red Line até CLE Airport: Tower City → Hopkins Airport — ~25 min / $2,50 — serviço direto.",
      "Frequência: a cada 15–20 min (pico) / 20–30 min (fora do pico). Horário: ~5h30–0h.",
      "Amtrak Lake Shore Limited: Cleveland → NYC (~13h) / Cleveland → Chicago (~7h) — 1 trem/dia. Impraticável para este trecho.",
      "Greyhound: terminal fica a ~14 km do centro. Usar apenas se necessário.",
    ],
    insights: [
      "Progressive Field a 5 min a pé — deslocamento mais fácil de toda a Copa para esta equipe.",
      "RTA Red Line conecta Tower City direto ao aeroporto CLE — rápido, barato e sem trânsito.",
      "Retorno a Morristown (07 jun): voo CLE → EWR + táxi EWR → Morristown (~$60–80).",
      "Amtrak em Cleveland: estação pequena, horários limitados. Não recomendado para conexão rápida.",
      "Fuso: Cleveland é EDT (UTC -4h) — mesmo fuso que Morristown/NJ. BRT = EDT +1h.",
    ],
  },

  // ── BASE 3 — Philadelphia, PA · 18–19 jun ────────────────────
  {
    id: "philadelphia",
    emoji: "🏛",
    cidade: "Philadelphia PA",
    periodo: "18–19 jun",
    hotel: "Hilton Garden Inn Philadelphia Center City",
    hotelAddr: "1100 Arch St, Philadelphia, PA 19107",
    nota: "Estadia de 1 noite — resumo operacional. Deslocamentos completos disponíveis na Equipe França.",
    fuso: "EDT (UTC -4h) · BRT = EDT +1h",
    referenciaLabel: "Estádio Copa: Lincoln Financial Field",
    referenciaAddr: "One Lincoln Financial Field Way, Philadelphia, PA 19148",
    routes: [
      {
        destino: "Lincoln Financial Field",
        endereco: "1 Lincoln Financial Field Way, Philadelphia, PA 19148",
        carN: "15 min",
        carH: "20 min",
        tp: "SEPTA Broad St Line ~20 min / $2,50",
        dist: "8 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=1100+Arch+St,+Philadelphia,+PA&daddr=1+Lincoln+Financial+Field+Way,+Philadelphia,+PA",
      },
      {
        destino: "Philadelphia Intl (PHL)",
        endereco: "8000 Essington Ave, Philadelphia, PA 19153",
        carN: "20 min",
        carH: "30 min",
        tp: "SEPTA Regional Rail ~25 min / $6,50",
        dist: "14 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=1100+Arch+St,+Philadelphia,+PA&daddr=Philadelphia+International+Airport,+PA",
      },
      {
        destino: "30th Street Station (Amtrak)",
        endereco: "2955 Market St, Philadelphia, PA 19104",
        carN: "8 min",
        carH: "12 min",
        tp: "SEPTA Market-Frankford ~15 min / $2,50",
        dist: "3 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=1100+Arch+St,+Philadelphia,+PA&daddr=30th+Street+Station,+Philadelphia,+PA",
      },
      {
        destino: "Penn Station NYC",
        endereco: "4 Pennsylvania Plaza, New York, NY 10001",
        carN: "—",
        carH: "—",
        tp: "Amtrak NE Regional ~1h30 / $30–80",
        dist: "145 km",
        diff: "moderado",
        mapsUrl:
          "https://maps.google.com/?saddr=1100+Arch+St,+Philadelphia,+PA&daddr=Penn+Station,+New+York,+NY",
      },
      {
        destino: "Morristown NJ (retorno)",
        endereco: "194 Park Ave, Morristown, NJ 07960",
        carN: "1h15",
        carH: "1h30",
        tp: "Amtrak + NJ Transit ~2h / ~$30",
        dist: "110 km",
        diff: "moderado",
        mapsUrl:
          "https://maps.google.com/?saddr=1100+Arch+St,+Philadelphia,+PA&daddr=194+Park+Ave,+Morristown,+NJ",
      },
    ],
    transitoInfo: [
      "SEPTA Broad St Line: Downtown ↔ Lincoln Financial Field em ~20 min / $2,50.",
      "SEPTA Regional Rail: Center City ↔ PHL Airport em ~25 min / $6,50.",
      "SEPTA Market-Frankford Line: Center City ↔ 30th Street Station em ~15 min / $2,50.",
      "Amtrak NE Regional: Philly 30th St → NYC Penn Station em ~1h30 / $30–80.",
      "Retorno a Morristown (19 jun): Amtrak 30th St → NYC Penn + NJ Transit → Morristown — ~2h total / ~$30.",
    ],
    insights: [
      "Lincoln Financial Field a ~20 min de SEPTA — transporte público simples e direto.",
      "SEPTA Broad St Line é o modal ideal para o estádio — sem trânsito e barato.",
      "PHL Airport: SEPTA Regional Rail direto do Center City em ~25 min / $6,50.",
      "Retorno a Morristown (19 jun): Amtrak + NJ Transit ~2h. Carro direto ~1h15 pela I-95 N.",
      "Fuso: Philadelphia é EDT (UTC -4h) — mesmo fuso que Morristown/NJ. BRT = EDT +1h.",
    ],
  },

  // ── BASE 4 — Miami, FL · 23–25 jun ──────────────────────────
  {
    id: "miami",
    emoji: "🌴",
    cidade: "Miami FL",
    periodo: "23–25 jun",
    hotel: "Hampton Inn & Suites Miami Wynwood Design District",
    hotelAddr: "3450 Biscayne Blvd, Miami, FL 33137",
    nota: "Hotel no Wynwood / Biscayne Corridor — entre o Downtown e o Design District.",
    fuso: "EDT (UTC -4h) · BRT = EDT +1h",
    referenciaLabel: "Estádio Copa: Hard Rock Stadium",
    referenciaAddr: "347 Don Shula Dr, Miami Gardens, FL 33056",
    routes: [
      {
        destino: "Hard Rock Stadium",
        endereco: "347 Don Shula Dr, Miami Gardens, FL 33056",
        carN: "30 min",
        carH: "45 min",
        tp: "Metrorail + shuttle ~45 min / $2,25",
        dist: "22 km",
        diff: "moderado",
        mapsUrl:
          "https://maps.google.com/?saddr=3450+Biscayne+Blvd,+Miami,+FL&daddr=347+Don+Shula+Dr,+Miami+Gardens,+FL",
      },
      {
        destino: "Miami Intl Airport (MIA)",
        endereco: "2100 NW 42nd Ave, Miami, FL 33142",
        carN: "20 min",
        carH: "30 min",
        tp: "Metrorail Orange Line ~25 min / $2,25",
        dist: "11 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=3450+Biscayne+Blvd,+Miami,+FL&daddr=2100+NW+42nd+Ave,+Miami,+FL",
      },
      {
        destino: "Fort Lauderdale Airport (FLL)",
        endereco: "100 Terminal Dr, Fort Lauderdale, FL 33315",
        carN: "40 min",
        carH: "55 min",
        tp: "Tri-Rail ~55 min / $5,25",
        dist: "40 km",
        diff: "moderado",
        mapsUrl:
          "https://maps.google.com/?saddr=3450+Biscayne+Blvd,+Miami,+FL&daddr=100+Terminal+Dr,+Fort+Lauderdale,+FL",
      },
      {
        destino: "Brightline Miami Central",
        endereco: "600 NW 1st Ave, Miami, FL 33136",
        carN: "12 min",
        carH: "18 min",
        tp: "Metrorail ~15 min / $2,25",
        dist: "5 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=3450+Biscayne+Blvd,+Miami,+FL&daddr=600+NW+1st+Ave,+Miami,+FL",
      },
      {
        destino: "Wynwood Walls",
        endereco: "2520 NW 2nd Ave, Miami, FL 33127",
        carN: "5 min",
        carH: "8 min",
        tp: "A pé 8 min / $0",
        dist: "0,6 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=3450+Biscayne+Blvd,+Miami,+FL&daddr=2520+NW+2nd+Ave,+Miami,+FL",
      },
      {
        destino: "South Beach",
        endereco: "South Beach, Miami Beach, FL 33139",
        carN: "20 min",
        carH: "30 min",
        tp: "Metrobus ~30 min / $2,25",
        dist: "10 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=3450+Biscayne+Blvd,+Miami,+FL&daddr=South+Beach,+Miami+Beach,+FL",
      },
      {
        destino: "Brickell / Downtown",
        endereco: "Brickell, Miami, FL 33131",
        carN: "12 min",
        carH: "18 min",
        tp: "Metrorail ~15 min / $2,25",
        dist: "5 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=3450+Biscayne+Blvd,+Miami,+FL&daddr=Brickell,+Miami,+FL",
      },
      {
        destino: "Morristown NJ (retorno)",
        endereco: "Newark, NJ — voo MIA → EWR",
        carN: "—",
        carH: "—",
        tp: "Voo MIA → EWR ~3h / $100–350",
        dist: "—",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=3450+Biscayne+Blvd,+Miami,+FL&daddr=Miami+International+Airport,+FL",
      },
    ],
    transitoInfo: [
      "Metrorail Orange Line: liga MIA Airport ao Downtown em ~25 min / $2,25.",
      "Brightline: trem de alta velocidade Miami → Fort Lauderdale (~30 min / $10–20).",
      "Tri-Rail: Miami → Fort Lauderdale → West Palm Beach. Conecta com Metrorail no Government Center.",
      "Uber/Lyft amplamente disponíveis — principal modal para Hard Rock Stadium em dias de Copa.",
      "Hard Rock Stadium: sem transporte público direto adequado. Uber obrigatório. Pedir 30 min antes.",
      "Wynwood Walls a 8 min a pé do hotel — bairro seguro e caminhável durante o dia.",
    ],
    insights: [
      "Hard Rock Stadium: Uber obrigatório em dias de Copa. Pedir com 30 min de antecedência.",
      "EWR é preferível a JFK para o retorno a Morristown — mais próximo e mais direto.",
      "Wynwood é bairro seguro e ativo à noite — hotel bem localizado para a estadia.",
      "MIA Airport para retorno (25 jun): usar voo MIA → EWR. Chegar 2h30 antes.",
      "Fuso: Miami é EDT (UTC -4h) — mesmo fuso que Morristown/NJ. BRT = EDT +1h.",
    ],
  },
];
