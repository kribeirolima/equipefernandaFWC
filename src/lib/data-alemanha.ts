export type Difficulty = "facil" | "moderado" | "dificil";

export interface AlemanhaRoute {
  destino: string;
  endereco: string;
  carN: string;
  carH: string;
  tp: string;
  dist: string;
  diff: Difficulty;
  mapsUrl: string;
}

export interface AlemanhaBase {
  id: string;
  emoji: string;
  cidade: string;
  periodo: string;
  hotel: string;
  hotelAddr: string;
  referenciaLabel?: string;
  referenciaAddr?: string;
  routes: AlemanhaRoute[];
  transitoInfo?: string[];
  insights: string[];
}

export const ALEMANHA_BASES: AlemanhaBase[] = [
  {
    id: "winston-salem",
    emoji: "🎓",
    cidade: "Winston-Salem",
    periodo: "09–12 jun",
    hotel: "235 N Cherry St, Winston-Salem, NC 27101",
    hotelAddr: "235 N Cherry St, Winston-Salem, NC 27101",
    referenciaLabel: "CT da Alemanha: Wake Forest University",
    referenciaAddr: "1834 Wake Forest Rd, Winston-Salem, NC 27109",
    routes: [
      {
        destino: "Wake Forest University (CT)",
        endereco: "1834 Wake Forest Rd, Winston-Salem, NC",
        carN: "10 min",
        carH: "15 min",
        tp: "Sem TP direto",
        dist: "6 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=235+N+Cherry+St,+Winston-Salem,+NC&daddr=1834+Wake+Forest+Rd,+Winston-Salem,+NC",
      },
      {
        destino: "Piedmont Triad Intl (GSO)",
        endereco: "1000 Ted Johnson Pkwy, Greensboro, NC",
        carN: "40 min",
        carH: "55 min",
        tp: "Sem trem",
        dist: "48 km",
        diff: "moderado",
        mapsUrl:
          "https://maps.google.com/?saddr=235+N+Cherry+St,+Winston-Salem,+NC&daddr=1000+Ted+Johnson+Pkwy,+Greensboro,+NC",
      },
      {
        destino: "Charlotte Douglas Intl (CLT)",
        endereco: "5501 Josh Birmingham Pkwy, Charlotte, NC",
        carN: "1h40",
        carH: "2h",
        tp: "Sem trem",
        dist: "155 km",
        diff: "dificil",
        mapsUrl:
          "https://maps.google.com/?saddr=235+N+Cherry+St,+Winston-Salem,+NC&daddr=5501+Josh+Birmingham+Pkwy,+Charlotte,+NC",
      },
      {
        destino: "Raleigh-Durham Intl (RDU)",
        endereco: "1000 Trade Dr, Morrisville, NC",
        carN: "1h35",
        carH: "2h",
        tp: "Sem trem",
        dist: "150 km",
        diff: "dificil",
        mapsUrl:
          "https://maps.google.com/?saddr=235+N+Cherry+St,+Winston-Salem,+NC&daddr=1000+Trade+Dr,+Morrisville,+NC",
      },
      {
        destino: "Greyhound Bus Station",
        endereco: "100 W 5th St, Winston-Salem, NC",
        carN: "5 min",
        carH: "8 min",
        tp: "~$30 (ônibus)",
        dist: "3 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=235+N+Cherry+St,+Winston-Salem,+NC&daddr=100+W+5th+St,+Winston-Salem,+NC",
      },
    ],
    transitoInfo: [
      "Sem Amtrak em Winston-Salem. Estação mais próxima: High Point (~30 min / 32 km) ou Greensboro (~40 min).",
      "Sem metrô ou trem urbano. WSTA bus local (limitado). Recomendado: Uber ou carro.",
      "Uber disponível 24h. Tempo médio de espera 5–10 min.",
    ],
    insights: [
      "Aeroporto principal: GSO (Greensboro). Voos internacionais geralmente via CLT com conexão.",
      "Trânsito baixo na maioria dos horários. Pico leve 7h30–9h e 17h–18h30 na US-421.",
      "Winston-Salem não tem Amtrak. Para viajar de trem, ir até High Point ou Greensboro.",
      "Uber disponível 24h na área. Tempo médio de espera 5–10 min.",
    ],
  },
  {
    id: "houston",
    emoji: "🤠",
    cidade: "Houston",
    periodo: "12–15 jun",
    hotel: "2515 Caroline St, Houston, TX 77004",
    hotelAddr: "2515 Caroline St, Houston, TX 77004",
    referenciaLabel: "Estádio Copa: NRG Stadium",
    referenciaAddr: "1 NRG Pkwy, Houston, TX 77054",
    routes: [
      {
        destino: "NRG Stadium (Copa)",
        endereco: "1 NRG Pkwy, Houston, TX",
        carN: "8 min",
        carH: "15–25 min",
        tp: "METRORail Red Line ~12 min / $1,25",
        dist: "6 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=2515+Caroline+St,+Houston,+TX&daddr=1+NRG+Pkwy,+Houston,+TX",
      },
      {
        destino: "George Bush Intl (IAH)",
        endereco: "2800 N Terminal Rd, Houston, TX",
        carN: "35 min",
        carH: "50–70 min",
        tp: "Metro + ônibus ~1h20 / $3,50",
        dist: "45 km",
        diff: "moderado",
        mapsUrl:
          "https://maps.google.com/?saddr=2515+Caroline+St,+Houston,+TX&daddr=2800+N+Terminal+Rd,+Houston,+TX",
      },
      {
        destino: "Hobby Airport (HOU)",
        endereco: "7800 Airport Blvd, Houston, TX",
        carN: "18 min",
        carH: "25–40 min",
        tp: "METRORail + ônibus ~45 min / $2,50",
        dist: "16 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=2515+Caroline+St,+Houston,+TX&daddr=7800+Airport+Blvd,+Houston,+TX",
      },
      {
        destino: "Houston Amtrak (Union Station)",
        endereco: "902 Washington Ave, Houston, TX",
        carN: "10 min",
        carH: "15 min",
        tp: "METRORail Red Line ~15 min / $1,25",
        dist: "7 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=2515+Caroline+St,+Houston,+TX&daddr=902+Washington+Ave,+Houston,+TX",
      },
      {
        destino: "Downtown Houston",
        endereco: "Main St & Texas Ave, Houston, TX",
        carN: "8 min",
        carH: "12 min",
        tp: "METRORail ~10 min / $1,25",
        dist: "5 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=2515+Caroline+St,+Houston,+TX&daddr=Main+St+%26+Texas+Ave,+Houston,+TX",
      },
      {
        destino: "Houston Greyhound",
        endereco: "2121 S Main St, Houston, TX",
        carN: "5 min",
        carH: "8 min",
        tp: "METRORail ~8 min / $1,25",
        dist: "3 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=2515+Caroline+St,+Houston,+TX&daddr=2121+S+Main+St,+Houston,+TX",
      },
    ],
    transitoInfo: [
      "Estação mais próxima do hotel: Hermann Park/Rice U (5 min a pé).",
      "Até NRG Stadium: descer em Reliant Park — 4 paradas / ~12 min.",
      "Até Downtown/Amtrak: 5 paradas / ~15 min.",
      "Tarifa METRORail: $1,25 por viagem.",
    ],
    insights: [
      "Dias de jogo no NRG: estacionar perto é difícil. METRORail é a melhor opção — ir 1h antes.",
      "IAH x HOU: para voos domésticos, HOU (Hobby) é mais próximo e mais fácil. IAH para internacionais.",
      "Trânsito pesado na I-610 e US-59. Pico 7h–9h e 16h30–18h30.",
      "Uber/Lyft amplamente disponíveis. Média $8–15 para destinos locais.",
    ],
  },
  {
    id: "toronto",
    emoji: "🍁",
    cidade: "Toronto",
    periodo: "15–21 jun",
    hotel: "12 York St, Toronto, ON M5J 0A9",
    hotelAddr: "12 York St, Toronto, ON M5J 0A9",
    referenciaLabel: "Estádio Copa: BMO Field",
    referenciaAddr: "170 Princes' Blvd, Toronto, ON M6K 3C3",
    routes: [
      {
        destino: "BMO Field (Copa)",
        endereco: "170 Princes' Blvd, Toronto, ON",
        carN: "10 min",
        carH: "15–25 min",
        tp: "Ônibus 509/511 ~15 min / $3,30 CAD",
        dist: "4 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=12+York+St,+Toronto,+ON&daddr=170+Princes+Blvd,+Toronto,+ON",
      },
      {
        destino: "Union Station",
        endereco: "55 Front St W, Toronto, ON",
        carN: "5 min",
        carH: "8 min",
        tp: "A pé 10 min / $0",
        dist: "1 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=12+York+St,+Toronto,+ON&daddr=55+Front+St+W,+Toronto,+ON",
      },
      {
        destino: "Toronto Pearson Intl (YYZ)",
        endereco: "6301 Silver Dart Dr, Mississauga, ON",
        carN: "25 min",
        carH: "40–60 min",
        tp: "UP Express de Union ~25 min / $12,35 CAD",
        dist: "28 km",
        diff: "moderado",
        mapsUrl:
          "https://maps.google.com/?saddr=12+York+St,+Toronto,+ON&daddr=6301+Silver+Dart+Dr,+Mississauga,+ON",
      },
      {
        destino: "Billy Bishop City Airport (YTZ)",
        endereco: "2 Eireann Quay, Toronto, ON",
        carN: "5 min",
        carH: "8 min",
        tp: "Ferry ou túnel gratuito / ~10 min",
        dist: "2 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=12+York+St,+Toronto,+ON&daddr=2+Eireann+Quay,+Toronto,+ON",
      },
      {
        destino: "Downtown Toronto (CN Tower)",
        endereco: "290 Bremner Blvd, Toronto, ON",
        carN: "5 min",
        carH: "8 min",
        tp: "A pé 12 min / $0",
        dist: "1 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=12+York+St,+Toronto,+ON&daddr=290+Bremner+Blvd,+Toronto,+ON",
      },
      {
        destino: "Via Rail / GO Train (Union)",
        endereco: "55 Front St W, Toronto, ON",
        carN: "5 min",
        carH: "8 min",
        tp: "A pé 10 min / $0",
        dist: "1 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=12+York+St,+Toronto,+ON&daddr=55+Front+St+W,+Toronto,+ON",
      },
    ],
    transitoInfo: [
      "Estação TTC mais próxima: Union Station (Line 1 Yonge–University).",
      "Até BMO Field: ônibus 509 Harbourfront ou 511 Bathurst a partir de Union.",
      "Tarifa TTC: $3,30 CAD por viagem (cartão Presto recomendado).",
      "UP Express Union → YYZ: 25 min / $12,35 CAD. Trens a cada 15 min, 5h30–0h30.",
    ],
    insights: [
      "Documentação: passagem EUA–Canadá exige passaporte + eTA (ca$7). Providenciar com antecedência.",
      "Dias de jogo no BMO Field: área do Exhibition Place fica congestionada. Streetcar 509 é a melhor opção.",
      "UP Express: mais confiável do que Uber para YYZ em horário de rush. Comprar antecipado no app.",
      "Billy Bishop (YTZ): ideal para voos domésticos Canada (Air Canada, Porter). 5 min do hotel.",
      "Moeda: Canadá usa CAD. Cartão funciona em todo lugar. ATM disponível em Union Station.",
    ],
  },
  {
    id: "hoboken",
    emoji: "🗽",
    cidade: "Hoboken NJ",
    periodo: "21–26 jun",
    hotel: "406 Jefferson St, Hoboken, NJ 07030",
    hotelAddr: "406 Jefferson St, Hoboken, NJ 07030",
    referenciaLabel: "Estádio Copa: MetLife Stadium",
    referenciaAddr: "1 MetLife Stadium Dr, East Rutherford, NJ 07073",
    routes: [
      {
        destino: "MetLife Stadium (Copa)",
        endereco: "1 MetLife Stadium Dr, East Rutherford, NJ",
        carN: "15 min",
        carH: "20–40 min",
        tp: "NJ Transit trem ~20 min / $8",
        dist: "18 km",
        diff: "moderado",
        mapsUrl:
          "https://maps.google.com/?saddr=406+Jefferson+St,+Hoboken,+NJ&daddr=1+MetLife+Stadium+Dr,+East+Rutherford,+NJ",
      },
      {
        destino: "Times Square",
        endereco: "Times Square, New York, NY",
        carN: "20 min",
        carH: "30–50 min",
        tp: "PATH → 33rd St ~20 min / $2,10",
        dist: "8 km",
        diff: "moderado",
        mapsUrl:
          "https://maps.google.com/?saddr=406+Jefferson+St,+Hoboken,+NJ&daddr=Times+Square,+New+York,+NY",
      },
      {
        destino: "Central Park",
        endereco: "Central Park, New York, NY",
        carN: "25 min",
        carH: "35–55 min",
        tp: "PATH + metrô ~30 min / $2,10",
        dist: "10 km",
        diff: "moderado",
        mapsUrl:
          "https://maps.google.com/?saddr=406+Jefferson+St,+Hoboken,+NJ&daddr=Central+Park,+New+York,+NY",
      },
      {
        destino: "230 Fifth Rooftop / Midtown",
        endereco: "230 5th Ave, New York, NY",
        carN: "20 min",
        carH: "30–50 min",
        tp: "PATH → 33rd St ~20 min / $2,10",
        dist: "8 km",
        diff: "moderado",
        mapsUrl:
          "https://maps.google.com/?saddr=406+Jefferson+St,+Hoboken,+NJ&daddr=230+5th+Ave,+New+York,+NY",
      },
      {
        destino: "Newark Intl (EWR)",
        endereco: "Newark Liberty International Airport, NJ",
        carN: "15 min",
        carH: "20–35 min",
        tp: "NJ Transit + AirTrain ~35 min / $14",
        dist: "12 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=406+Jefferson+St,+Hoboken,+NJ&daddr=Newark+Liberty+International+Airport,+NJ",
      },
      {
        destino: "JFK International",
        endereco: "JFK Airport, Queens, NY",
        carN: "45 min",
        carH: "60–90 min",
        tp: "PATH + LIRR/AirTrain ~70 min / $15",
        dist: "35 km",
        diff: "dificil",
        mapsUrl:
          "https://maps.google.com/?saddr=406+Jefferson+St,+Hoboken,+NJ&daddr=JFK+International+Airport,+Queens,+NY",
      },
      {
        destino: "LaGuardia (LGA)",
        endereco: "LaGuardia Airport, East Elmhurst, NY",
        carN: "35 min",
        carH: "50–80 min",
        tp: "PATH + Q70 ônibus ~60 min / $5",
        dist: "22 km",
        diff: "dificil",
        mapsUrl:
          "https://maps.google.com/?saddr=406+Jefferson+St,+Hoboken,+NJ&daddr=LaGuardia+Airport,+East+Elmhurst,+NY",
      },
      {
        destino: "Penn Station NYC",
        endereco: "Penn Station, New York, NY",
        carN: "20 min",
        carH: "30–50 min",
        tp: "PATH → 33rd St ~20 min / $2,10",
        dist: "8 km",
        diff: "moderado",
        mapsUrl:
          "https://maps.google.com/?saddr=406+Jefferson+St,+Hoboken,+NJ&daddr=Penn+Station,+New+York,+NY",
      },
      {
        destino: "Hoboken Terminal (PATH/NJT)",
        endereco: "Hoboken Terminal, Hoboken, NJ",
        carN: "5 min",
        carH: "5 min",
        tp: "A pé 5 min / $0",
        dist: "0,5 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=406+Jefferson+St,+Hoboken,+NJ&daddr=Hoboken+Terminal,+Hoboken,+NJ",
      },
      {
        destino: "Hoboken Waterfront",
        endereco: "Hudson St, Hoboken, NJ",
        carN: "8 min",
        carH: "8 min",
        tp: "A pé 10 min / $0",
        dist: "1 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=406+Jefferson+St,+Hoboken,+NJ&daddr=Hudson+St,+Hoboken,+NJ",
      },
      {
        destino: "Weehawken Waterfront",
        endereco: "Lincoln Harbor, Weehawken, NJ",
        carN: "8 min",
        carH: "10 min",
        tp: "A pé 15 min / $0",
        dist: "1,5 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=406+Jefferson+St,+Hoboken,+NJ&daddr=Lincoln+Harbor,+Weehawken,+NJ",
      },
      {
        destino: "Jersey City (Exchange Place)",
        endereco: "Exchange Place, Jersey City, NJ",
        carN: "10 min",
        carH: "12 min",
        tp: "PATH ~8 min / $2,10",
        dist: "5 km",
        diff: "facil",
        mapsUrl:
          "https://maps.google.com/?saddr=406+Jefferson+St,+Hoboken,+NJ&daddr=Exchange+Place,+Jersey+City,+NJ",
      },
    ],
    transitoInfo: [
      "Estação PATH: Hoboken Terminal (5 min a pé do hotel). Destinos diretos: WTC, 9th St, 14th St, 23rd St, 33rd St.",
      "Tarifa PATH: $2,10 por viagem. Frequência: 3–10 min no pico, 15–20 min na madrugada. 24 horas.",
      "Hoboken Terminal → MetLife: NJ Transit + shuttle / ~20 min / ~$8.",
      "Hoboken Terminal → Newark EWR: NJT linha PE ~25 min / ~$5,50 (+ AirTrain $5,50 = ~$11).",
    ],
    insights: [
      "Dias de jogo MetLife: perímetro de segurança FIFA fecha às 14h. Sair ANTES das 13h30.",
      "EWR é o aeroporto mais perto de Hoboken — preferir para voos. JFK e LGA custam mais caro de Uber (~$60–90).",
      "Túnel Lincoln (carro para NYC): gargalo. Pico adiciona 30–60 min. PATH é sempre mais rápido.",
      "Uber de Hoboken → NYC: ~$25–45 dependendo do horário. PATH ~$2,10 e mais rápido na maioria das vezes.",
      "Hoboken Terminal é o hub central — NJ Transit, PATH e ferries saem daqui.",
    ],
  },
];
