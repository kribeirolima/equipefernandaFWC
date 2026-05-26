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

const BELT_CHICO_ADDRESSES: (NearbyAddress & { periodo: string })[] = [
  // ── Morristown NJ — base principal ───────────────────────────
  {
    id: "bc-morristown-hotel",
    name: "Hyatt House Morristown",
    address: "194 Park Ave, Morristown, NJ 07960",
    city: "Morristown",
    country: "Estados Unidos",
    lat: 40.7967,
    lng: -74.4815,
    locale: "en",
    periodo: "01–05 · 07–23 · 25–28 jun",
  },
  // ── MetLife Stadium — Copa ────────────────────────────────────
  {
    id: "bc-metlife",
    name: "MetLife Stadium (Copa)",
    address: "1 MetLife Stadium Dr, East Rutherford, NJ 07073",
    city: "East Rutherford",
    country: "Estados Unidos",
    lat: 40.8135,
    lng: -74.0745,
    locale: "en",
    periodo: "dias de jogo",
  },
  // ── Cleveland OH ──────────────────────────────────────────────
  {
    id: "bc-cleveland-hotel",
    name: "Crowne Plaza Cleveland — Playhouse Square",
    address: "1260 Euclid Ave, Cleveland, OH 44115",
    city: "Cleveland",
    country: "Estados Unidos",
    lat: 41.5022,
    lng: -81.6797,
    locale: "en",
    periodo: "05–07 jun",
  },
  {
    id: "bc-progressive-field",
    name: "Progressive Field (Copa)",
    address: "2401 Ontario St, Cleveland, OH 44115",
    city: "Cleveland",
    country: "Estados Unidos",
    lat: 41.4962,
    lng: -81.6852,
    locale: "en",
    periodo: "05–07 jun",
  },
  // ── Philadelphia PA ──────────────────────────────────────────
  {
    id: "bc-philadelphia-hotel",
    name: "Hilton Garden Inn Philadelphia Center City",
    address: "1100 Arch St, Philadelphia, PA 19107",
    city: "Philadelphia",
    country: "Estados Unidos",
    lat: 39.9534,
    lng: -75.1586,
    locale: "en",
    periodo: "18–19 jun",
  },
  {
    id: "bc-lincoln-financial",
    name: "Lincoln Financial Field (Copa)",
    address: "1 Lincoln Financial Field Way, Philadelphia, PA 19148",
    city: "Philadelphia",
    country: "Estados Unidos",
    lat: 39.9008,
    lng: -75.1676,
    locale: "en",
    periodo: "18–19 jun",
  },
  // ── Miami FL ─────────────────────────────────────────────────
  {
    id: "bc-miami-hotel",
    name: "Hampton Inn Miami Wynwood",
    address: "3450 Biscayne Blvd, Miami, FL 33137",
    city: "Miami",
    country: "Estados Unidos",
    lat: 25.806,
    lng: -80.1865,
    locale: "en",
    periodo: "23–25 jun",
  },
  {
    id: "bc-hard-rock",
    name: "Hard Rock Stadium (Copa)",
    address: "347 Don Shula Dr, Miami Gardens, FL 33056",
    city: "Miami Gardens",
    country: "Estados Unidos",
    lat: 25.9579,
    lng: -80.2389,
    locale: "en",
    periodo: "23–25 jun",
  },
];

export function ProximidadesBeltChico() {
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
        {BELT_CHICO_ADDRESSES.map((addr) => (
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
