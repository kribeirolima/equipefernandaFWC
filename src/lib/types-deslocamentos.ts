export type Difficulty = "facil" | "moderado" | "dificil";

export interface CityRoute {
  destino: string;
  endereco: string;
  carN: string;
  carH: string;
  tp: string;
  dist: string;
  diff: Difficulty;
  mapsUrl: string;
}

export interface CityBase {
  id: string;
  emoji: string;
  cidade: string;
  periodo?: string;
  hotel: string;
  hotelAddr: string;
  referenciaLabel?: string;
  referenciaAddr?: string;
  routes: CityRoute[];
  transitoInfo?: string[];
  insights: string[];
}
