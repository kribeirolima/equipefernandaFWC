export type Difficulty = "facil" | "moderado" | "dificil";
export type AlertCategory = "transito" | "aeroporto" | "estadio" | "geral";
export type DestCategory = "aeroporto" | "estadio" | "ponto_turistico" | "hotel" | "outro";

export interface CityOrigin {
  id: string;
  name: string;
  addr: string;
  lat: number;
  lng: number;
}

export interface CityDestination {
  id: string;
  name: string;
  addr: string;
  lat: number;
  lng: number;
  category?: DestCategory;
}

export interface CityRoute {
  from: string;
  to: string;
  carN: string;
  carH: string;
  tp: string;
  dist: string;
  diff: Difficulty;
  costCar: string;
  costTp: string;
  note?: string;
}

export interface CityAlert {
  category: AlertCategory;
  text: string;
}

export interface CityConfig {
  id: string;
  emoji: string;
  cidade: string;
  periodo?: string;
  origins: CityOrigin[];
  destinations: CityDestination[];
  routes: CityRoute[];
  alerts: CityAlert[];
}

export function originById(config: CityConfig, id: string): CityOrigin | undefined {
  return config.origins.find((o) => o.id === id);
}

export function destinationById(config: CityConfig, id: string): CityDestination | undefined {
  return config.destinations.find((d) => d.id === id);
}

export function routesFromOrigin(config: CityConfig, originId: string): CityRoute[] {
  return config.routes.filter((r) => r.from === originId);
}
