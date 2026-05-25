import type { CityBase } from "./types-deslocamentos";

export const MIAMI_BASE: CityBase = {
  id: "miami",
  emoji: "🌴",
  cidade: "Miami",
  periodo: "Copa 2026",
  hotel: "3450 Biscayne Blvd, Miami, FL 33137",
  hotelAddr: "3450 Biscayne Blvd, Miami, FL 33137",
  referenciaLabel: "Estádio Copa: Hard Rock Stadium",
  referenciaAddr: "347 Don Shula Dr, Miami Gardens, FL 33056",
  routes: [
    {
      destino: "Hard Rock Stadium (Copa 2026)",
      endereco: "347 Don Shula Dr, Miami Gardens, FL",
      carN: "35–45 min",
      carH: "50–70 min",
      tp: "Metrobus 27 + transferência ~1h30 / $2,25",
      dist: "31 km",
      diff: "moderado",
      mapsUrl:
        "https://maps.google.com/?saddr=3450+Biscayne+Blvd,+Miami,+FL&daddr=347+Don+Shula+Dr,+Miami+Gardens,+FL",
    },
    {
      destino: "Miami Intl (MIA)",
      endereco: "2100 NW 42nd Ave, Miami, FL 33142",
      carN: "20–25 min",
      carH: "30–45 min",
      tp: "Metrobus 3 + Metrorail ~40 min / $2,25",
      dist: "13 km",
      diff: "facil",
      mapsUrl:
        "https://maps.google.com/?saddr=3450+Biscayne+Blvd,+Miami,+FL&daddr=2100+NW+42nd+Ave,+Miami,+FL",
    },
    {
      destino: "Fort Lauderdale Intl (FLL)",
      endereco: "100 Terminal Dr, Fort Lauderdale, FL 33315",
      carN: "40–55 min",
      carH: "55–75 min",
      tp: "Tri-Rail ~55 min / $5,65",
      dist: "47 km",
      diff: "moderado",
      mapsUrl:
        "https://maps.google.com/?saddr=3450+Biscayne+Blvd,+Miami,+FL&daddr=100+Terminal+Dr,+Fort+Lauderdale,+FL",
    },
    {
      destino: "Miami Beach (South Beach)",
      endereco: "Lincoln Rd, Miami Beach, FL 33139",
      carN: "15–25 min",
      carH: "25–45 min",
      tp: "Metrobus 119 ~30 min / $2,25",
      dist: "10 km",
      diff: "facil",
      mapsUrl:
        "https://maps.google.com/?saddr=3450+Biscayne+Blvd,+Miami,+FL&daddr=Lincoln+Rd,+Miami+Beach,+FL",
    },
    {
      destino: "Downtown Miami / Brickell",
      endereco: "Brickell Ave, Miami, FL 33131",
      carN: "10–15 min",
      carH: "20–35 min",
      tp: "Metromover (gratuito) + Metrorail ~20 min / $2,25",
      dist: "5 km",
      diff: "facil",
      mapsUrl:
        "https://maps.google.com/?saddr=3450+Biscayne+Blvd,+Miami,+FL&daddr=Brickell+Ave,+Miami,+FL",
    },
    {
      destino: "Wynwood Arts District",
      endereco: "NW 2nd Ave & NW 26th St, Miami, FL 33127",
      carN: "5–10 min",
      carH: "10–20 min",
      tp: "Caminhada ou Metrobus ~15 min / $2,25",
      dist: "2 km",
      diff: "facil",
      mapsUrl:
        "https://maps.google.com/?saddr=3450+Biscayne+Blvd,+Miami,+FL&daddr=NW+2nd+Ave+%26+NW+26th+St,+Miami,+FL",
    },
    {
      destino: "PortMiami (logística/cruzeiros)",
      endereco: "1015 N America Way, Miami, FL 33132",
      carN: "15–20 min",
      carH: "25–40 min",
      tp: "Metrobus + Brickell ~35 min / $2,25",
      dist: "8 km",
      diff: "facil",
      mapsUrl:
        "https://maps.google.com/?saddr=3450+Biscayne+Blvd,+Miami,+FL&daddr=1015+N+America+Way,+Miami,+FL",
    },
  ],
  transitoInfo: [
    "Metrorail cobre Airport–Downtown–Kendall. Metromover gratuito no loop do Downtown.",
    "Uber/Lyft amplamente disponíveis 24h. Tempo médio de espera: 4–8 min.",
    "I-95 e US-1 são os principais gargalos. Evitar 7h–9h e 17h–19h.",
    "Tri-Rail liga o downtown de Miami ao FLL e West Palm Beach. Não opera madrugada.",
  ],
  insights: [
    "Copa 2026 no Hard Rock Stadium (Miami Gardens). Via I-95 N — sem pedágio. Dias de jogo: sair 2h antes pelo trânsito.",
    "MIA x FLL: MIA (~13 km) é principal para internacionais; FLL (~47 km) é mais barato para low-cost domésticos.",
    "Tri-Rail: FLL → Miami Airport Station (Metrorail) ~55 min / $5,65. Frequência horária.",
    "Uber aeroporto: ~$25–35 para MIA, ~$50–70 para FLL. Dias de jogo: surge pricing frequente.",
    "Miami Beach: evitar carro em dias de jogo no Hard Rock — trânsito na I-195 colapsa.",
    "Hard Rock Stadium: sem transporte público direto. Shuttle fretado ou Uber são as melhores opções.",
  ],
};
