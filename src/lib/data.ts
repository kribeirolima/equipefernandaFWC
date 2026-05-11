export type Team = "NJ" | "NYC" | "BOTH";
export type Difficulty = "facil" | "moderado" | "dificil";

export interface Location {
  id: string;
  name: string;
  addr: string;
  team: Team;
  lat: number;
  lng: number;
  isOrigin?: boolean;
  exclusiveNJ?: boolean;
}

export interface Route {
  from: string;
  to: string;
  carN: string;
  carH: string;
  tp: string;
  diff: Difficulty;
  dist: string;
  costCar: string;
  costTp: string;
  note?: string;
}

export const LOCATIONS: Location[] = [
  { id: "renata",   name: "Hotel Renata",                addr: "194 Park Ave, Morristown NJ",                 team: "NJ",   lat: 40.7967, lng: -74.4815, isOrigin: true },
  { id: "ctrb",     name: "CT Red Bulls",                addr: "103 Columbia Rd, Morristown NJ",              team: "NJ",   lat: 40.7800, lng: -74.4710 },
  { id: "brasil",   name: "Hotel Brasil",                addr: "300 N Maple Ave, Basking Ridge NJ 07920",     team: "NJ",   lat: 40.7128, lng: -74.5471 },
  { id: "mmu",      name: "Aeroporto Morristown (MMU)",  addr: "8 Airport Rd, Morristown NJ",                 team: "NJ",   lat: 40.7993, lng: -74.4148, exclusiveNJ: true },
  { id: "fernanda", name: "Airbnb Fernanda",             addr: "401 E 34th Street, New York NY 10016",        team: "NYC",  lat: 40.7440, lng: -73.9745, isOrigin: true },
  { id: "rr",       name: "Airbnb RR",                   addr: "491 2nd Avenue, New York NY 10016",           team: "NYC",  lat: 40.7430, lng: -73.9762, isOrigin: true },
  { id: "lga",      name: "Aeroporto LaGuardia (LGA)",   addr: "LGA, Queens NY",                              team: "BOTH", lat: 40.7769, lng: -73.8740 },
  { id: "jfk",      name: "Aeroporto JFK",               addr: "JFK, Queens NY",                              team: "BOTH", lat: 40.6413, lng: -73.7781 },
  { id: "metlife",  name: "MetLife Stadium",             addr: "East Rutherford, NJ",                         team: "BOTH", lat: 40.8128, lng: -74.0742 },
  { id: "times",    name: "Times Square",                addr: "Midtown Manhattan",                           team: "BOTH", lat: 40.7580, lng: -73.9855 },
  { id: "central",  name: "Central Park",                addr: "Upper Manhattan",                             team: "BOTH", lat: 40.7829, lng: -73.9654 },
  { id: "penn",     name: "Penn Station",                addr: "Midtown Manhattan",                           team: "BOTH", lat: 40.7506, lng: -73.9935 },
];

export const ROUTES: Route[] = [
  { from: "renata", to: "ctrb",     carN: "5–10 min",   carH: "10–20 min",  tp: "20–30 min",    diff: "facil",    dist: "2 mi",  costCar: "~$1",  costTp: "~$3",  note: "" },
  { from: "renata", to: "brasil",   carN: "12–18 min",  carH: "20–35 min",  tp: "1h20–1h50",    diff: "facil",    dist: "9 mi",  costCar: "~$2",  costTp: "~$5",  note: "" },
  { from: "renata", to: "mmu",      carN: "5–10 min",   carH: "10–15 min",  tp: "15–25 min",    diff: "facil",    dist: "3 mi",  costCar: "~$1",  costTp: "~$3",  note: "Exclusivo NJ. Shuttle MMU→LGA: 1h45–2h20." },
  { from: "renata", to: "lga",      carN: "55–75 min",  carH: "1h20–1h55",  tp: "1h50–2h20",    diff: "dificil",  dist: "35 mi", costCar: "~$22", costTp: "~$22", note: "Sem trem direto. Combinação NJT + metrô + Q70." },
  { from: "renata", to: "jfk",      carN: "1h10–1h40",  carH: "1h50–2h30",  tp: "2h–2h40",      diff: "dificil",  dist: "40 mi", costCar: "~$24", costTp: "~$28", note: "NJT Penn Station + metrô E + AirTrain." },
  { from: "renata", to: "metlife",  carN: "35–50 min",  carH: "55–1h20",    tp: "1h30–2h",      diff: "moderado", dist: "22 mi", costCar: "~$4",  costTp: "~$15", note: "Em dias de jogo: trem especial NJT." },
  { from: "renata", to: "times",    carN: "1h10–1h30",  carH: "1h40–2h15",  tp: "1h30–1h50",    diff: "dificil",  dist: "32 mi", costCar: "~$30", costTp: "~$20", note: "Carro: Lincoln Tunnel + congestion pricing." },
  { from: "renata", to: "central",  carN: "1h10–1h35",  carH: "1h40–2h20",  tp: "1h40–2h",      diff: "dificil",  dist: "33 mi", costCar: "~$22", costTp: "~$20", note: "Acima da 60th St: sem congestion pricing." },
  { from: "renata", to: "penn",     carN: "1h–1h20",    carH: "1h30–2h",    tp: "1h10–1h35",    diff: "moderado", dist: "31 mi", costCar: "~$30", costTp: "~$16", note: "TP via NJT direto Morristown→Penn." },
  { from: "renata", to: "fernanda", carN: "1h10–1h30",  carH: "1h40–2h10",  tp: "1h20–1h45",    diff: "dificil",  dist: "32 mi", costCar: "~$30", costTp: "~$20", note: "" },
  { from: "renata", to: "rr",       carN: "1h10–1h30",  carH: "1h40–2h10",  tp: "1h20–1h45",    diff: "dificil",  dist: "32 mi", costCar: "~$30", costTp: "~$20", note: "" },

  { from: "fernanda", to: "ctrb",    carN: "1h10–1h30", carH: "1h50–2h30", tp: "2h–2h40",  diff: "dificil",  dist: "32 mi", costCar: "~$5",  costTp: "~$22", note: "Carro: sem pedágio saindo de NYC." },
  { from: "fernanda", to: "brasil",  carN: "45–60 min", carH: "1h10–1h40", tp: "1h50–2h30", diff: "moderado", dist: "38 mi", costCar: "~$6",  costTp: "~$22", note: "I-78 W; sem Túnel Lincoln." },
  { from: "fernanda", to: "lga",     carN: "25–40 min", carH: "45–75 min", tp: "45–70 min", diff: "moderado", dist: "9 mi",  costCar: "~$8",  costTp: "~$3",  note: "TP: metrô + Q70 (free transfer)." },
  { from: "fernanda", to: "jfk",     carN: "35–55 min", carH: "55–1h20",   tp: "50–1h15",  diff: "moderado", dist: "16 mi", costCar: "~$13", costTp: "~$11", note: "TP: metrô E/J + AirTrain ($8.50)." },
  { from: "fernanda", to: "metlife", carN: "35–55 min", carH: "1h–1h30",   tp: "1h–1h30",  diff: "moderado", dist: "10 mi", costCar: "~$2",  costTp: "~$8",  note: "Em dias de jogo: trem direto Penn→MetLife." },
  { from: "fernanda", to: "times",   carN: "10–20 min", carH: "20–40 min", tp: "10–20 min", diff: "facil",    dist: "2 mi",  costCar: "~$10", costTp: "~$3",  note: "Caminhar/bike também viável." },
  { from: "fernanda", to: "central", carN: "15–25 min", carH: "25–45 min", tp: "15–25 min", diff: "facil",    dist: "2 mi",  costCar: "~$1",  costTp: "~$3",  note: "Acima da 60th: sem congestion." },
  { from: "fernanda", to: "penn",    carN: "10–20 min", carH: "20–35 min", tp: "10–20 min", diff: "facil",    dist: "1 mi",  costCar: "~$10", costTp: "~$3",  note: "" },
  { from: "fernanda", to: "renata",  carN: "1h–1h20",   carH: "1h30–2h",   tp: "1h20–1h40", diff: "dificil",  dist: "32 mi", costCar: "~$5",  costTp: "~$20", note: "Saindo de NYC: sem pedágio." },
  { from: "fernanda", to: "rr",      carN: "3–7 min",   carH: "5–12 min",  tp: "5–12 min",  diff: "facil",    dist: "0.2 mi", costCar: "~$1", costTp: "$0",   note: "Caminhar (~3 min)." },

  { from: "rr", to: "ctrb",     carN: "1h10–1h30", carH: "1h50–2h30", tp: "2h–2h40",  diff: "dificil",  dist: "32 mi", costCar: "~$5",  costTp: "~$22", note: "" },
  { from: "rr", to: "brasil",   carN: "45–60 min", carH: "1h10–1h40", tp: "1h50–2h30", diff: "moderado", dist: "38 mi", costCar: "~$6",  costTp: "~$22", note: "" },
  { from: "rr", to: "lga",      carN: "25–40 min", carH: "45–75 min", tp: "45–70 min", diff: "moderado", dist: "9 mi",  costCar: "~$8",  costTp: "~$3",  note: "" },
  { from: "rr", to: "jfk",      carN: "35–55 min", carH: "55–1h20",   tp: "50–1h15",  diff: "moderado", dist: "16 mi", costCar: "~$13", costTp: "~$11", note: "" },
  { from: "rr", to: "metlife",  carN: "35–55 min", carH: "1h–1h30",   tp: "1h–1h30",  diff: "moderado", dist: "10 mi", costCar: "~$2",  costTp: "~$8",  note: "" },
  { from: "rr", to: "times",    carN: "10–20 min", carH: "20–40 min", tp: "10–20 min", diff: "facil",    dist: "2 mi",  costCar: "~$10", costTp: "~$3",  note: "" },
  { from: "rr", to: "central",  carN: "15–25 min", carH: "25–45 min", tp: "15–25 min", diff: "facil",    dist: "2 mi",  costCar: "~$1",  costTp: "~$3",  note: "" },
  { from: "rr", to: "penn",     carN: "10–20 min", carH: "20–35 min", tp: "10–20 min", diff: "facil",    dist: "1 mi",  costCar: "~$10", costTp: "~$3",  note: "" },
  { from: "rr", to: "renata",   carN: "1h–1h20",   carH: "1h30–2h",   tp: "1h20–1h40", diff: "dificil",  dist: "32 mi", costCar: "~$5",  costTp: "~$20", note: "" },
  { from: "rr", to: "fernanda", carN: "3–7 min",   carH: "5–12 min",  tp: "5–12 min",  diff: "facil",    dist: "0.2 mi", costCar: "~$1", costTp: "$0",   note: "Caminhar (~3 min)." },
];

export const INSIGHTS: string[] = [
  "Túnel Lincoln é o maior gargalo NJ ↔ NYC. Pico adiciona 30–60 min.",
  "LGA não tem conexão ferroviária direta de NJ. De NYC: metrô + Q70 (free transfer) ou M60.",
  "JFK saindo de NYC: metrô E/J + AirTrain é o mais confiável (~$11).",
  "Hotel Brasil ↔ Airbnbs: usar I-78 W evita Túnel Lincoln.",
  "CT Red Bulls e Hotel Renata estão em Morristown — 5–10 min entre si.",
  "Airbnb Fernanda e Airbnb RR ficam a ~2 quarteirões — praticamente o mesmo ponto.",
  "Pedágio de congestionamento ($9) abaixo da 60th St em Manhattan. Dirigir internamente não compensa.",
  "Dias de jogo no MetLife: NJ Transit oferece trens especiais — muito melhor que carro.",
  "Fins de semana: carro 15–30% mais rápido; TP com frequência reduzida.",
];

export function locationById(id: string): Location | undefined {
  return LOCATIONS.find((l) => l.id === id);
}

export function isVisibleForTeam(loc: Location, team: "ALL" | "NJ" | "NYC"): boolean {
  if (team === "ALL") return true;
  if (team === "NJ") return loc.team === "NJ" || loc.team === "BOTH";
  return loc.team === "NYC" || loc.team === "BOTH";
}

export function parseTimeMid(s: string): number {
  const cleaned = s.replace("min", "").trim();
  const parts = cleaned.split("–").map((p) => p.trim());
  const toMinutes = (p: string): number => {
    const h = p.match(/(\d+)h/);
    let total = 0;
    if (h) total += parseInt(h[1], 10) * 60;
    if (h && /h\d+$/.test(p)) {
      const m = p.match(/h(\d+)$/);
      if (m) total += parseInt(m[1], 10);
    } else if (!h) {
      const m = p.match(/^(\d+)$/);
      if (m) total += parseInt(m[1], 10);
    }
    return total;
  };
  const a = toMinutes(parts[0]);
  const b = toMinutes(parts[1] ?? parts[0]);
  return (a + b) / 2;
}

export function formatMinutes(mins: number): string {
  if (mins < 60) return `${Math.round(mins)} min`;
  const h = Math.floor(mins / 60);
  const m = Math.round(mins % 60);
  return m === 0 ? `${h}h` : `${h}h${m.toString().padStart(2, "0")}`;
}
