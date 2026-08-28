export type NearbyLocale = "pt" | "es" | "en";

export interface NearbyAddress {
  id: string;
  name?: string;
  address: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  locale: NearbyLocale;
  note?: string;
}

export interface NearbyCategory {
  id: "hospitais" | "farmacias" | "supermercados" | "restaurantes" | "policia";
  label: string;
  description: string;
}

export const NEARBY_ADDRESSES: NearbyAddress[] = [
  {
    id: "bh",
    name: "Hilton Garden Inn BH",
    address: "Av. Prudente de Morais, 520, Cidade Jardim, Belo Horizonte - MG, 30380-002",
    city: "Belo Horizonte",
    country: "Brasil",
    lat: -19.9373,
    lng: -43.9472,
    locale: "pt",
  },
  {
    id: "poa",
    name: "Hotel Intercity Praia de Belas",
    address: "Av. Borges de Medeiros, 2145, Praia de Belas, Porto Alegre - RS, 90110-150",
    city: "Porto Alegre",
    country: "Brasil",
    lat: -30.0453,
    lng: -51.2292,
    locale: "pt",
  },
  {
    id: "cwb",
    name: "Novotel Curitiba Batel",
    address: "R. Dr. Pedrosa, 288, Centro, Curitiba - PR, 80420-120",
    city: "Curitiba",
    country: "Brasil",
    lat: -25.43811,
    lng: -49.27723,
    locale: "pt",
  },
  {
    id: "chapeco",
    name: "Mogano Premium Hotel",
    address: "Av. Fernando Machado, 574, Centro, Chapecó - SC, 89814-210",
    city: "Chapecó",
    country: "Brasil",
    lat: -27.0975,
    lng: -52.6188,
    locale: "pt",
  },
  {
    id: "riopreto",
    name: "Hilton Garden Inn São José do Rio Preto",
    address: "Av. Anísio Haddad, 8001, São José do Rio Preto - SP, 15090-365",
    city: "São José do Rio Preto",
    country: "Brasil",
    lat: -20.7891,
    lng: -49.4029,
    locale: "pt",
  },
];

export const NEARBY_CATEGORIES: NearbyCategory[] = [
  { id: "hospitais",      label: "Hospitais",       description: "Hospitais e prontos-socorros" },
  { id: "farmacias",      label: "Farmácias",       description: "Farmácias e drogarias 24h" },
  { id: "supermercados",  label: "Supermercados",   description: "Mercados e supermercados" },
  { id: "restaurantes",   label: "Restaurantes",    description: "Restaurantes próximos" },
  { id: "policia",        label: "Bases policiais", description: "Delegacias e bases de polícia" },
];

const QUERY_BY_LOCALE: Record<NearbyLocale, Record<NearbyCategory["id"], string>> = {
  pt: {
    hospitais: "hospital",
    farmacias: "farmacia",
    supermercados: "supermercado",
    restaurantes: "restaurante",
    policia: "delegacia",
  },
  es: {
    hospitais: "hospital",
    farmacias: "farmacia",
    supermercados: "supermercado",
    restaurantes: "restaurante",
    policia: "policia",
  },
  en: {
    hospitais: "hospital",
    farmacias: "pharmacy",
    supermercados: "supermarket",
    restaurantes: "restaurant",
    policia: "police+station",
  },
};

export function nearbySearchUrl(
  category: NearbyCategory["id"],
  addr: NearbyAddress,
  zoom = 15
): string {
  const query = QUERY_BY_LOCALE[addr.locale][category];
  return `https://www.google.com/maps/search/${query}/@${addr.lat},${addr.lng},${zoom}z`;
}
