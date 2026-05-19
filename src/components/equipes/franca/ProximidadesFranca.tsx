import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Heart,
  Pill,
  ShoppingCart,
  UtensilsCrossed,
  Shield,
  MapPin,
} from "lucide-react";
import {
  NEARBY_CATEGORIES,
  nearbySearchUrl,
  type NearbyAddress,
  type NearbyCategory,
} from "@/lib/nearby";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORY_VISUAL: Record<
  NearbyCategory["id"],
  { Icon: LucideIcon; tone: string; ring: string }
> = {
  hospitais: {
    Icon: Heart,
    tone: "text-red-700 dark:text-red-300",
    ring: "ring-red-200 hover:bg-red-50 dark:ring-red-500/30 dark:hover:bg-red-500/10",
  },
  farmacias: {
    Icon: Pill,
    tone: "text-emerald-700 dark:text-emerald-300",
    ring: "ring-emerald-200 hover:bg-emerald-50 dark:ring-emerald-500/30 dark:hover:bg-emerald-500/10",
  },
  supermercados: {
    Icon: ShoppingCart,
    tone: "text-amber-700 dark:text-amber-300",
    ring: "ring-amber-200 hover:bg-amber-50 dark:ring-amber-500/30 dark:hover:bg-amber-500/10",
  },
  restaurantes: {
    Icon: UtensilsCrossed,
    tone: "text-orange-700 dark:text-orange-300",
    ring: "ring-orange-200 hover:bg-orange-50 dark:ring-orange-500/30 dark:hover:bg-orange-500/10",
  },
  policia: {
    Icon: Shield,
    tone: "text-blue-700 dark:text-blue-300",
    ring: "ring-blue-200 hover:bg-blue-50 dark:ring-blue-500/30 dark:hover:bg-blue-500/10",
  },
};

const FRANCA_ADDRESSES: (NearbyAddress & { periodo: string })[] = [
  // ── Los Angeles ─────────────────────────────────────────────
  {
    id: "la-hotel",
    name: "The O Hotel (Los Angeles)",
    address: "819 Flower St, Los Angeles, CA 90017",
    city: "Los Angeles",
    country: "Estados Unidos",
    lat: 34.0493,
    lng: -118.2573,
    locale: "en",
    periodo: "09–13 jun",
  },
  {
    id: "la-sofi",
    name: "SoFi Stadium (Copa)",
    address: "1001 S Stadium Dr, Inglewood, CA 90301",
    city: "Inglewood",
    country: "Estados Unidos",
    lat: 33.9534,
    lng: -118.339,
    locale: "en",
    periodo: "09–13 jun",
  },
  // ── Boston Seaport I ─────────────────────────────────────────
  {
    id: "bos1-hotel",
    name: "Aloft Boston Seaport",
    address: "401-403 D St, Boston, MA 02210",
    city: "Boston Seaport",
    country: "Estados Unidos",
    lat: 42.3465,
    lng: -71.0489,
    locale: "en",
    periodo: "13–14 jun",
  },
  {
    id: "bos1-gillette",
    name: "Gillette Stadium (Copa)",
    address: "1 Patriot Pl, Foxborough, MA 02035",
    city: "Foxborough",
    country: "Estados Unidos",
    lat: 42.0909,
    lng: -71.2643,
    locale: "en",
    periodo: "13–14 jun",
  },
  // ── New Jersey ───────────────────────────────────────────────
  {
    id: "nj-hoboken",
    name: "Referência: Hoboken Terminal",
    address: "Hudson Pl, Hoboken, NJ 07030",
    city: "Hoboken",
    country: "Estados Unidos",
    lat: 40.7357,
    lng: -74.0281,
    locale: "en",
    note: "Airbnb pendente — buscas a partir de Hoboken Terminal",
    periodo: "14–17 jun",
  },
  {
    id: "nj-metlife",
    name: "MetLife Stadium (Copa)",
    address: "1 MetLife Stadium Dr, East Rutherford, NJ 07073",
    city: "East Rutherford",
    country: "Estados Unidos",
    lat: 40.8135,
    lng: -74.0745,
    locale: "en",
    periodo: "14–17 jun",
  },
  // ── Boston Midtown ───────────────────────────────────────────
  {
    id: "bos2-hotel",
    name: "The Midtown Hotel",
    address: "220 Huntington Ave, Boston, MA 02115",
    city: "Boston Midtown",
    country: "Estados Unidos",
    lat: 42.3434,
    lng: -71.0855,
    locale: "en",
    periodo: "16–20 jun",
  },
  {
    id: "bos2-gillette",
    name: "Gillette Stadium (Copa)",
    address: "1 Patriot Pl, Foxborough, MA 02035",
    city: "Foxborough",
    country: "Estados Unidos",
    lat: 42.0909,
    lng: -71.2643,
    locale: "en",
    periodo: "16–20 jun",
  },
  // ── Philadelphia ─────────────────────────────────────────────
  {
    id: "phl-hotel",
    name: "Hilton Garden Inn Philly",
    address: "1100 Arch St, Philadelphia, PA 19107",
    city: "Philadelphia",
    country: "Estados Unidos",
    lat: 39.9531,
    lng: -75.1575,
    locale: "en",
    periodo: "20–23 jun",
  },
  {
    id: "phl-lincoln",
    name: "Lincoln Financial Field (Copa)",
    address: "One Lincoln Financial Field Way, Philadelphia, PA 19148",
    city: "Philadelphia",
    country: "Estados Unidos",
    lat: 39.9006,
    lng: -75.1676,
    locale: "en",
    periodo: "20–23 jun",
  },
  // ── Boston Seaport II ────────────────────────────────────────
  {
    id: "bos3-hotel",
    name: "Homewood Suites Seaport",
    address: "670 Summer St, Boston, MA 02210",
    city: "Boston Seaport",
    country: "Estados Unidos",
    lat: 42.3461,
    lng: -71.047,
    locale: "en",
    periodo: "23–28 jun",
  },
  {
    id: "bos3-gillette",
    name: "Gillette Stadium (Copa)",
    address: "1 Patriot Pl, Foxborough, MA 02035",
    city: "Foxborough",
    country: "Estados Unidos",
    lat: 42.0909,
    lng: -71.2643,
    locale: "en",
    periodo: "23–28 jun",
  },
];

export function ProximidadesFranca() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Locais próximos</h1>
        <p className="text-sm text-muted-foreground">
          Para cada endereço, abre o Google Maps já filtrando por categoria — hospitais,
          farmácias, supermercados, restaurantes e bases policiais nas proximidades.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {FRANCA_ADDRESSES.map((addr) => (
          <Card key={addr.id} className="overflow-hidden">
            <CardHeader className="space-y-2 border-b bg-muted/30">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  {addr.name ?? addr.city}
                </CardTitle>
                <Badge variant="outline" className="font-mono text-[10px] uppercase whitespace-nowrap">
                  {addr.periodo}
                </Badge>
              </div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {addr.city} · {addr.country}
              </p>
              <p className="text-xs text-muted-foreground">{addr.address}</p>
              {addr.note && (
                <p className="text-[11px] text-amber-700 bg-amber-50 rounded px-2 py-1">
                  ⚠ {addr.note}
                </p>
              )}
            </CardHeader>
            <CardContent className="space-y-2 p-4">
              {NEARBY_CATEGORIES.map((cat) => {
                const visual = CATEGORY_VISUAL[cat.id];
                const Icon = visual.Icon;
                return (
                  <a
                    key={cat.id}
                    href={nearbySearchUrl(cat.id, addr)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group flex items-center justify-between gap-3 rounded-lg bg-card px-3 py-2.5 ring-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      visual.ring
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-md bg-background ring-1",
                          visual.ring
                        )}
                      >
                        <Icon className={cn("h-4 w-4", visual.tone)} />
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{cat.label}</span>
                        <span className="text-[11px] text-muted-foreground">
                          {cat.description}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                  </a>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
