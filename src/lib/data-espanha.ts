export type Difficulty = "facil" | "moderado" | "dificil";

export interface EspanhaRoute {
  destino: string;
  endereco: string;
  carN: string;
  carH: string;
  tp: string;
  dist: string;
  diff: Difficulty;
  mapsUrl: string;
}

export interface EspanhaBase {
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
  routes: EspanhaRoute[];
  transitoInfo?: string[];
  insights: string[];
}

export const ESPANHA_BASES: EspanhaBase[] = [
  // ── BASE 1 — Chattanooga ──────────────────────────────────────
  {
    id: "chattanooga",
    emoji: "🎸",
    cidade: "Chattanooga",
    periodo: "10–13 jun",
    hotel: "Spark by Hilton Chattanooga Downtown",
    hotelAddr: "100 W 21st St, Chattanooga, TN 37408",
    fuso: "EDT (UTC -4h) · BRT = EDT +1h",
    routes: [
      {
        destino: "Chattanooga Metro Airport (CHA)",
        endereco: "1001 Airport Rd, Chattanooga, TN 37421",
        carN: "18 min",
        carH: "25 min",
        tp: "Uber recomendado (~$20–30)",
        dist: "15 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=100+W+21st+St,+Chattanooga,+TN&daddr=1001+Airport+Rd,+Chattanooga,+TN",
      },
      {
        destino: "Nashville Intl Airport (BNA)",
        endereco: "One Terminal Dr, Nashville, TN 37214",
        carN: "2h",
        carH: "2h20",
        tp: "Carro ou Greyhound ~2h20 / ~$25",
        dist: "190 km",
        diff: "moderado",
        mapsUrl: "https://maps.google.com/?saddr=100+W+21st+St,+Chattanooga,+TN&daddr=One+Terminal+Dr,+Nashville,+TN",
      },
      {
        destino: "Atlanta Hartsfield-Jackson (ATL)",
        endereco: "6000 N Terminal Pkwy, Atlanta, GA 30320",
        carN: "1h40",
        carH: "2h",
        tp: "Carro (I-75 S) ou Greyhound ~2h30 / ~$30",
        dist: "175 km",
        diff: "moderado",
        mapsUrl: "https://maps.google.com/?saddr=100+W+21st+St,+Chattanooga,+TN&daddr=6000+N+Terminal+Pkwy,+Atlanta,+GA",
      },
      {
        destino: "Greyhound Chattanooga",
        endereco: "740 E 12th St, Chattanooga, TN 37403",
        carN: "8 min",
        carH: "10 min",
        tp: "A pé ~15 min / Uber $8",
        dist: "1,5 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=100+W+21st+St,+Chattanooga,+TN&daddr=740+E+12th+St,+Chattanooga,+TN",
      },
      {
        destino: "Chattanooga Choo Choo Historic District",
        endereco: "1400 Market St, Chattanooga, TN 37402",
        carN: "5 min",
        carH: "7 min",
        tp: "A pé 10 min / $0",
        dist: "0,8 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=100+W+21st+St,+Chattanooga,+TN&daddr=1400+Market+St,+Chattanooga,+TN",
      },
      {
        destino: "Tennessee Aquarium",
        endereco: "1 Broad St, Chattanooga, TN 37402",
        carN: "5 min",
        carH: "7 min",
        tp: "A pé 12 min / $0",
        dist: "0,9 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=100+W+21st+St,+Chattanooga,+TN&daddr=1+Broad+St,+Chattanooga,+TN",
      },
      {
        destino: "Lookout Mountain",
        endereco: "Lookout Mountain, TN 37350",
        carN: "15 min",
        carH: "20 min",
        tp: "Uber ~$15–25",
        dist: "10 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=100+W+21st+St,+Chattanooga,+TN&daddr=Lookout+Mountain,+TN",
      },
      {
        destino: "Atlanta (próxima base)",
        endereco: "1365 Peachtree St NE, Atlanta, GA 30309",
        carN: "1h40",
        carH: "2h",
        tp: "Carro (I-75 S) / Greyhound ~2h30",
        dist: "175 km",
        diff: "moderado",
        mapsUrl: "https://maps.google.com/?saddr=100+W+21st+St,+Chattanooga,+TN&daddr=1365+Peachtree+St+NE,+Atlanta,+GA",
      },
    ],
    transitoInfo: [
      "Sem metrô ou trem urbano em Chattanooga. Transporte público local: CARTA (ônibus municipais) — cobertura limitada.",
      "CARTA Electric Shuttle: gratuito no Downtown Chattanooga — cobre pontos turísticos e o hotel.",
      "Uber/Lyft: disponíveis e recomendados para qualquer deslocamento fora do Downtown.",
      "Para Atlanta: carro pela I-75 S (1h40) é a opção mais prática. Greyhound sai da 740 E 12th St (~2h30). Não há Amtrak direto Chattanooga–Atlanta.",
    ],
    insights: [
      "CHA é aeroporto pequeno — poucos voos diretos. Para voos internacionais usar ATL (1h40 de carro). BNA (Nashville) também é opção.",
      "Trânsito em Chattanooga é leve — sem horários críticos como em grandes cidades.",
      "Greyhound Chattanooga: estação em área de risco — evitar chegada ou espera noturna a pé.",
      "CARTA Shuttle elétrico gratuito é útil para explorar o Downtown sem Uber.",
      "Fuso: Chattanooga é EDT (UTC -4h). Horário do Brasil: BRT = EDT +1h.",
      "Conexão para Atlanta (13 jun): I-75 S é o caminho mais prático. Sair cedo para evitar trânsito na entrada de Atlanta.",
    ],
  },

  // ── BASE 2 — Atlanta ──────────────────────────────────────────
  {
    id: "atlanta",
    emoji: "🍑",
    cidade: "Atlanta",
    periodo: "13–25 jun",
    hotel: "Residence Inn Atlanta Midtown/Peachtree",
    hotelAddr: "1365 Peachtree St NE, Atlanta, GA 30309",
    nota: "Base mais longa — 12 dias. Sede de jogos da Copa do Mundo 2026.",
    fuso: "EDT (UTC -4h) · BRT = EDT +1h",
    referenciaLabel: "Estádio Copa: Mercedes-Benz Stadium",
    referenciaAddr: "1 AMB Dr NW, Atlanta, GA 30313",
    routes: [
      {
        destino: "Mercedes-Benz Stadium (Copa)",
        endereco: "1 AMB Dr NW, Atlanta, GA 30313",
        carN: "10 min",
        carH: "15–25 min",
        tp: "MARTA Red/Gold → State Farm Arena/GWCC ~15 min / $2,50",
        dist: "5 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=1365+Peachtree+St+NE,+Atlanta,+GA&daddr=1+AMB+Dr+NW,+Atlanta,+GA",
      },
      {
        destino: "Hartsfield-Jackson ATL",
        endereco: "6000 N Terminal Pkwy, Atlanta, GA 30320",
        carN: "25 min",
        carH: "35–55 min",
        tp: "MARTA Red/Gold Line → Airport Station ~25 min / $2,50",
        dist: "22 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=1365+Peachtree+St+NE,+Atlanta,+GA&daddr=6000+N+Terminal+Pkwy,+Atlanta,+GA",
      },
      {
        destino: "Amtrak — Peachtree Station",
        endereco: "1688 Peachtree Rd NW, Atlanta, GA 30309",
        carN: "5 min",
        carH: "8 min",
        tp: "A pé 12 min / $0",
        dist: "0,8 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=1365+Peachtree+St+NE,+Atlanta,+GA&daddr=1688+Peachtree+Rd+NW,+Atlanta,+GA",
      },
      {
        destino: "Greyhound Atlanta",
        endereco: "232 Forsyth St SW, Atlanta, GA 30303",
        carN: "10 min",
        carH: "15 min",
        tp: "MARTA → Five Points ~15 min / $2,50",
        dist: "4 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=1365+Peachtree+St+NE,+Atlanta,+GA&daddr=232+Forsyth+St+SW,+Atlanta,+GA",
      },
      {
        destino: "MARTA Midtown Station",
        endereco: "30 10th St NE, Atlanta, GA 30309",
        carN: "3 min",
        carH: "5 min",
        tp: "A pé 8 min / $0",
        dist: "0,6 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=1365+Peachtree+St+NE,+Atlanta,+GA&daddr=Midtown+MARTA+Station,+Atlanta,+GA",
      },
      {
        destino: "Downtown Atlanta / CNN Center",
        endereco: "1 CNN Center NW, Atlanta, GA 30303",
        carN: "8 min",
        carH: "12 min",
        tp: "MARTA Red/Gold → Five Points ~10 min / $2,50",
        dist: "4 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=1365+Peachtree+St+NE,+Atlanta,+GA&daddr=1+CNN+Center+NW,+Atlanta,+GA",
      },
      {
        destino: "Buckhead",
        endereco: "Buckhead, Atlanta, GA 30305",
        carN: "12 min",
        carH: "18 min",
        tp: "MARTA Red/Gold direto ~15 min / $2,50",
        dist: "7 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=1365+Peachtree+St+NE,+Atlanta,+GA&daddr=Buckhead,+Atlanta,+GA",
      },
      {
        destino: "Georgia Aquarium",
        endereco: "225 Baker St NW, Atlanta, GA 30313",
        carN: "10 min",
        carH: "15 min",
        tp: "MARTA → World Congress Center ~12 min / $2,50",
        dist: "4 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=1365+Peachtree+St+NE,+Atlanta,+GA&daddr=225+Baker+St+NW,+Atlanta,+GA",
      },
      {
        destino: "Chattanooga (base anterior)",
        endereco: "100 W 21st St, Chattanooga, TN 37408",
        carN: "1h40",
        carH: "2h",
        tp: "Carro (I-75 N) / Greyhound ~2h30",
        dist: "175 km",
        diff: "moderado",
        mapsUrl: "https://maps.google.com/?saddr=1365+Peachtree+St+NE,+Atlanta,+GA&daddr=100+W+21st+St,+Chattanooga,+TN",
      },
    ],
    transitoInfo: [
      "Estação mais próxima do hotel: Midtown Station (MARTA Red + Gold Lines) — a 8 min a pé.",
      "Para o Mercedes-Benz Stadium: MARTA Red/Gold → State Farm Arena/GWCC ~15 min / $2,50. Obrigatório em dias de jogo — estacionamentos esgotam.",
      "Para ATL Airport: MARTA Red/Gold Line direto → Airport Station ~25 min / $2,50. Mais rápido que carro no horário de pico.",
      "Tarifa MARTA: $2,50 por viagem. Cartão Breeze recomendado (recarregável).",
      "Horário MARTA: 5h–1h (Seg–Sex) / 6h–0h30 (Sáb–Dom).",
    ],
    insights: [
      "Mercedes-Benz Stadium em dias de jogo: usar MARTA obrigatoriamente. Sair com 90 min de antecedência mínima.",
      "ATL é o aeroporto mais movimentado do mundo. Chegar 2h30 (doméstico) ou 3h (internacional) antes.",
      "Trânsito em Atlanta: I-75/I-85 (Downtown Connector) é crítico. Evitar de carro 7h–10h e 16h–20h.",
      "Amtrak Crescent passa por Atlanta — 1 trem/dia para NYC (~19h / $80–200) e New Orleans (~10h / $50–130). Peachtree Station a 12 min a pé do hotel.",
      "Greyhound Atlanta fica no Downtown — zona de alto risco. Evitar chegada noturna sozinho.",
      "Fuso: Atlanta é EDT (UTC -4h). Horário do Brasil: BRT = EDT +1h.",
      "Conexão para Guadalajara (25 jun): voo ATL → GDL ~3h30 (direto). Chegar 3h antes ao terminal internacional.",
    ],
  },

  // ── BASE 3 — Guadalajara ──────────────────────────────────────
  {
    id: "guadalajara",
    emoji: "🌮",
    cidade: "Guadalajara",
    periodo: "25–28 jun",
    hotel: "Becquer Hotel Guadalajara",
    hotelAddr: "Av. Guadalupe 596, Chapalita, 44500 Guadalajara, Jal.",
    nota: "Uber e Didi proibidos no desembarque do aeroporto GDL — usar táxi credenciado do counter oficial dentro do terminal.",
    fuso: "CDT (UTC -5h) · BRT = CDT +2h | EDT = CDT +1h",
    referenciaLabel: "Estádio Copa: Estadio Akron",
    referenciaAddr: "Cto. J.V.C. 2800, El Bajío, 45014 Zapopan, Jal.",
    routes: [
      {
        destino: "Estadio Akron (Copa)",
        endereco: "Cto. J.V.C. 2800, El Bajío, 45014 Zapopan, Jal.",
        carN: "20 min",
        carH: "30–45 min",
        tp: "Uber ~$150–250 MXN / Táxi ~$350–450 MXN",
        dist: "18 km",
        diff: "moderado",
        mapsUrl: "https://maps.google.com/?saddr=Av+Guadalupe+596,+Chapalita,+Guadalajara&daddr=Cto+JVC+2800,+El+Bajío,+Zapopan",
      },
      {
        destino: "Aeroporto GDL (Miguel Hidalgo)",
        endereco: "Carr. Guadalajara-Chapala km 17.5, Jalisco",
        carN: "25 min",
        carH: "35 min",
        tp: "Táxi oficial do counter ~$350–500 MXN / Uber ~$150–200 MXN (fora do terminal)",
        dist: "20 km",
        diff: "moderado",
        mapsUrl: "https://maps.google.com/?saddr=Av+Guadalupe+596,+Chapalita,+Guadalajara&daddr=Carr+Guadalajara-Chapala+km+17.5,+Jalisco",
      },
      {
        destino: "Terminal Nueva Central de Autobuses",
        endereco: "Av. de las Torres 4831, San Pedro Tlaquepaque, Jal.",
        carN: "20 min",
        carH: "30 min",
        tp: "Uber ~$100–150 MXN / Táxi ~$200–300 MXN",
        dist: "15 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=Av+Guadalupe+596,+Chapalita,+Guadalajara&daddr=Av+de+las+Torres+4831,+San+Pedro+Tlaquepaque",
      },
      {
        destino: "Centro Histórico de Guadalajara",
        endereco: "Centro Histórico, Guadalajara, Jal.",
        carN: "15 min",
        carH: "25 min",
        tp: "Uber ~$80–120 MXN / Metrô Linha 1 ~30 min / $10,50 MXN",
        dist: "10 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=Av+Guadalupe+596,+Chapalita,+Guadalajara&daddr=Centro+Historico,+Guadalajara",
      },
      {
        destino: "San Pedro Tlaquepaque",
        endereco: "San Pedro Tlaquepaque, Jalisco, México",
        carN: "20 min",
        carH: "30 min",
        tp: "Uber ~$100–150 MXN",
        dist: "12 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=Av+Guadalupe+596,+Chapalita,+Guadalajara&daddr=San+Pedro+Tlaquepaque,+Jalisco",
      },
      {
        destino: "Zapopan Centro",
        endereco: "Zapopan Centro, Jalisco, México",
        carN: "20 min",
        carH: "30 min",
        tp: "Macrobús ~25 min / $15 MXN / Uber ~$80–130 MXN",
        dist: "12 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=Av+Guadalupe+596,+Chapalita,+Guadalajara&daddr=Zapopan+Centro,+Jalisco",
      },
      {
        destino: "Tequila (passeio)",
        endereco: "Tequila, Jalisco, México",
        carN: "1h",
        carH: "1h15",
        tp: "Ônibus ~$80–120 MXN / Tequila Express (~$500–800 MXN)",
        dist: "65 km",
        diff: "moderado",
        mapsUrl: "https://maps.google.com/?saddr=Av+Guadalupe+596,+Chapalita,+Guadalajara&daddr=Tequila,+Jalisco",
      },
    ],
    transitoInfo: [
      "Hotel em Chapalita não tem metrô direto. Usar Macrobús (BRT) na Av. Vallarta ou Uber para conexões centrais.",
      "Uber e Didi: amplamente disponíveis e mais baratos que táxi em GDL — opção recomendada no bairro.",
      "ATENÇÃO aeroporto GDL: Uber e Didi são PROIBIDOS na área de desembarque. Usar exclusivamente táxi credenciado do counter oficial dentro do terminal (~$350–500 MXN).",
      "Estadio Akron: sem estação de metrô próxima. Uber ou táxi oficial são as únicas opções viáveis para o estádio.",
      "Metrô Tren Ligero (Linhas 1 e 2): cobre centro e eixos principais. Tarifa $10,50 MXN (~$0,60 USD).",
    ],
    insights: [
      "Aeroporto GDL: Uber/Didi proibidos no desembarque. Usar táxi credenciado do counter oficial. Fora do terminal (~200m) é possível chamar Uber.",
      "Estadio Akron em dia de jogo: trânsito muito intenso em Zapopan. Sair 2h antes. Uber é a melhor opção.",
      "Moeda: México usa MXN (Peso Mexicano). ~$17–18 MXN = $1 USD / ~$3,30 MXN = $1 BRL (jun/2026).",
      "Segurança: Chapalita e Zapopan são bairros seguros. Cautela no Centro Histórico à noite.",
      "Fuso: Guadalajara é CDT (UTC -5h). BRT = CDT +2h — 1h atrás de Atlanta (EDT).",
      "Uber e Didi amplamente disponíveis em GDL — mais baratos e confiáveis que táxi para trajetos no bairro.",
    ],
  },
];
