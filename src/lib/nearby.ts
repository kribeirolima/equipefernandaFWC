export type NearbyLocale = "es" | "en";

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
    id: "cdmx",
    address: "Periferico Sur 5530, Coyoacán",
    city: "Ciudad de México",
    country: "México",
    lat: 19.3088,
    lng: -99.1779,
    locale: "es",
  },
  {
    id: "renata",
    name: "Hotel Renata",
    address: "194 Park Ave, Morristown, NJ",
    city: "Morristown",
    country: "Estados Unidos",
    lat: 40.7967,
    lng: -74.4815,
    locale: "en",
  },
  {
    id: "brasil",
    name: "Hotel Brasil",
    address: "300 N Maple Ave, Basking Ridge, NJ 07920",
    city: "Basking Ridge",
    country: "Estados Unidos",
    lat: 40.7128,
    lng: -74.5471,
    locale: "en",
  },
  {
    id: "fernanda",
    name: "Airbnb Fernanda",
    address: "401 E 34th Street, New York, NY 10016",
    city: "Manhattan",
    country: "Estados Unidos",
    lat: 40.7440,
    lng: -73.9745,
    locale: "en",
  },
  {
    id: "rr",
    name: "Airbnb RR",
    address: "491 2nd Avenue, New York, NY 10016",
    city: "Manhattan",
    country: "Estados Unidos",
    lat: 40.7430,
    lng: -73.9762,
    locale: "en",
    note: "A ~2 quarteirões do Airbnb Fernanda — resultados muito similares.",
  },
  {
    id: "miami",
    address: "3450 Biscayne Blvd, Miami, FL",
    city: "Miami",
    country: "Estados Unidos",
    lat: 25.806,
    lng: -80.1865,
    locale: "en",
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
