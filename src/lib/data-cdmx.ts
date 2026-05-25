import type { CityBase } from "./types-deslocamentos";

export const CDMX_BASE: CityBase = {
  id: "cdmx",
  emoji: "🌮",
  cidade: "Ciudad de México",
  periodo: "Copa 2026",
  hotel: "Periferico Sur 5530, Coyoacán, CDMX",
  hotelAddr: "Periferico Sur 5530, Coyoacán, CDMX",
  referenciaLabel: "Estádio Copa: Estadio Azteca",
  referenciaAddr: "Calz. de Tlalpan 3465, Sta. Úrsula Coapa, Coyoacán, CDMX",
  routes: [
    {
      destino: "Estadio Azteca (Copa 2026)",
      endereco: "Calz. de Tlalpan 3465, Sta. Úrsula Coapa, Coyoacán",
      carN: "10–15 min",
      carH: "20–35 min",
      tp: "Metro Línea 2 → Tasqueña + ônibus ~20 min / $6 MXN",
      dist: "5 km",
      diff: "facil",
      mapsUrl:
        "https://maps.google.com/?saddr=Periferico+Sur+5530,+Coyoacan,+CDMX&daddr=Calz+de+Tlalpan+3465,+Coyoacan,+CDMX",
    },
    {
      destino: "Aerop. Benito Juárez (MEX)",
      endereco: "Cap. Carlos León S/N, Peñón de los Baños, CDMX",
      carN: "40–55 min",
      carH: "1h10–1h40",
      tp: "Metro Línea 2 + Línea 5 ~50–60 min / $6 MXN",
      dist: "24 km",
      diff: "moderado",
      mapsUrl:
        "https://maps.google.com/?saddr=Periferico+Sur+5530,+Coyoacan,+CDMX&daddr=Aeropuerto+Internacional+Benito+Juarez,+Mexico+City",
    },
    {
      destino: "Aerop. Felipe Ángeles (NLU)",
      endereco: "Carretera Mexiquense km 23.5, Santa Lucía, Méx.",
      carN: "1h15–1h45",
      carH: "1h45–2h30",
      tp: "Tren Suburbano desde Buenavista ~1h30 / $40 MXN",
      dist: "62 km",
      diff: "dificil",
      mapsUrl:
        "https://maps.google.com/?saddr=Periferico+Sur+5530,+Coyoacan,+CDMX&daddr=Aeropuerto+Internacional+Felipe+Angeles,+Santa+Lucia",
    },
    {
      destino: "Centro Histórico / Zócalo",
      endereco: "Plaza de la Constitución, Cuauhtémoc, CDMX",
      carN: "35–50 min",
      carH: "1h–1h30",
      tp: "Metro Línea 2 ~40 min / $6 MXN",
      dist: "18 km",
      diff: "moderado",
      mapsUrl:
        "https://maps.google.com/?saddr=Periferico+Sur+5530,+Coyoacan,+CDMX&daddr=Plaza+de+la+Constitucion,+Mexico+City",
    },
    {
      destino: "Polanco",
      endereco: "Av. Presidente Masaryk, Miguel Hidalgo, CDMX",
      carN: "45–60 min",
      carH: "1h10–1h30",
      tp: "Metro + ônibus ~1h / $10 MXN",
      dist: "22 km",
      diff: "moderado",
      mapsUrl:
        "https://maps.google.com/?saddr=Periferico+Sur+5530,+Coyoacan,+CDMX&daddr=Av+Presidente+Masaryk,+Polanco,+Mexico+City",
    },
    {
      destino: "Televisa San Ángel",
      endereco: "Av. Insurgentes Sur 4121, CDMX",
      carN: "10–15 min",
      carH: "20–30 min",
      tp: "Metrobús Línea 1 ~15 min / $8 MXN",
      dist: "5 km",
      diff: "facil",
      mapsUrl:
        "https://maps.google.com/?saddr=Periferico+Sur+5530,+Coyoacan,+CDMX&daddr=Av+Insurgentes+Sur+4121,+Mexico+City",
    },
    {
      destino: "Santa Fe (hotéis/corporativo)",
      endereco: "Av. Santa Fe, Cuajimalpa, CDMX",
      carN: "40–55 min",
      carH: "1h–1h30",
      tp: "Metrobús + ônibus ~1h15 / $12 MXN",
      dist: "20 km",
      diff: "moderado",
      mapsUrl:
        "https://maps.google.com/?saddr=Periferico+Sur+5530,+Coyoacan,+CDMX&daddr=Av+Santa+Fe,+Cuajimalpa,+Mexico+City",
    },
  ],
  transitoInfo: [
    "Metro Línea 2 mais próxima: Tasqueña (~10 min a pé). Ligações ao Centro, Cuatro Caminos e transbaldeios.",
    "Metrobús Línea 1 (Insurgentes): serve San Ángel, Polanco e Norte. Para na Périférico Sur.",
    "Tarifa metrô: $6 MXN. Metrobús: $8–10 MXN. Comprar cartão STE na bilheteria do metrô.",
    "Uber disponível 24h. Trânsito CDMX: gravíssimo 7h30–10h e 17h–21h em dias úteis.",
  ],
  insights: [
    "Copa 2026 no Estadio Azteca (~5 km). Dias de jogo: ir de metrô (Tasqueña → Azteca, 2 paradas). Sair 2h antes.",
    "MEX (Benito Juárez) a ~24 km. Metro Línea 2 + 5 chega em ~50 min — melhor que carro no pico.",
    "NLU (Felipe Ángeles): 62 km ao norte. Tren Suburbano desde Buenavista ~1h30. Reservar mais tempo.",
    "CDMX tem o trânsito mais intenso da América Latina. Nunca subestime tempo de deslocamento de carro.",
    "Polanco e Reforma: principais hotéis de luxo e emissoras. 45–60 min de carro em horário normal.",
    "Moeda: MXN (peso mexicano). 1 USD ≈ $17–18 MXN. Câmbio: usar ATM de banco local (Banamex, BBVA).",
  ],
};
