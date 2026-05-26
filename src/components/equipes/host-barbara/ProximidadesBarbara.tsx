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

const BARBARA_ADDRESSES: (NearbyAddress & { periodo: string })[] = [
  // ── Toronto ON ────────────────────────────────────────────────
  {
    id: "bc-tor-hotel",
    name: "Holiday Inn Express Toronto Downtown",
    address: "111 Lombard St, Toronto, ON M5C 2T9",
    city: "Toronto",
    country: "Canadá",
    lat: 43.6488,
    lng: -79.3726,
    locale: "en",
    periodo: "09–13 jun",
  },
  {
    id: "bc-bmo-field",
    name: "BMO Field (Copa)",
    address: "170 Princes' Blvd, Toronto, ON M6K 3C3",
    city: "Toronto",
    country: "Canadá",
    lat: 43.6333,
    lng: -79.4189,
    locale: "en",
    periodo: "dias de jogo",
  },
  // ── Atlanta GA ────────────────────────────────────────────────
  {
    id: "bc-atl-indigo",
    name: "Hotel Indigo Atlanta Downtown (13–15 jun)",
    address: "230 Peachtree Rd NE, Atlanta, GA 30303",
    city: "Atlanta",
    country: "Estados Unidos",
    lat: 33.757,
    lng: -84.3878,
    locale: "en",
    periodo: "13–15 jun",
  },
  {
    id: "bc-atl-courtyard",
    name: "Courtyard Atlanta Downtown (20–21 jun)",
    address: "133 Carnegie Way NW, Atlanta, GA 30303",
    city: "Atlanta",
    country: "Estados Unidos",
    lat: 33.7569,
    lng: -84.3956,
    locale: "en",
    periodo: "20–21 jun",
  },
  {
    id: "bc-mercedes-benz",
    name: "Mercedes-Benz Stadium (Copa)",
    address: "1 AMB Dr NW, Atlanta, GA 30313",
    city: "Atlanta",
    country: "Estados Unidos",
    lat: 33.7554,
    lng: -84.4009,
    locale: "en",
    periodo: "dias de jogo",
  },
  // ── Kansas City MO ────────────────────────────────────────────
  {
    id: "bc-kc-hotel",
    name: "Hotel Phillips Kansas City",
    address: "106 W 12th St, Kansas City, MO 64105",
    city: "Kansas City",
    country: "Estados Unidos",
    lat: 39.1043,
    lng: -94.5808,
    locale: "en",
    periodo: "15–17 jun",
  },
  {
    id: "bc-arrowhead",
    name: "GEHA Field at Arrowhead (Copa)",
    address: "1 Arrowhead Dr, Kansas City, MO 64129",
    city: "Kansas City",
    country: "Estados Unidos",
    lat: 39.0489,
    lng: -94.4839,
    locale: "en",
    periodo: "15–17 jun",
  },
  // ── Boston MA ─────────────────────────────────────────────────
  {
    id: "bc-bos-hotel",
    name: "Aloft Boston Seaport District",
    address: "401-403 D St, Boston, MA 02210",
    city: "Boston",
    country: "Estados Unidos",
    lat: 42.3446,
    lng: -71.0449,
    locale: "en",
    periodo: "17–20 jun",
  },
  {
    id: "bc-gillette",
    name: "Gillette Stadium (Copa)",
    address: "1 Patriot Pl, Foxborough, MA 02035",
    city: "Foxborough",
    country: "Estados Unidos",
    lat: 41.7735,
    lng: -71.1972,
    locale: "en",
    periodo: "17–20 jun",
  },
  // ── Dallas TX ─────────────────────────────────────────────────
  {
    id: "bc-dal-hotel",
    name: "AC Hotel Dallas Downtown",
    address: "1712 Commerce St, Dallas, TX 75201",
    city: "Dallas",
    country: "Estados Unidos",
    lat: 32.7819,
    lng: -96.7953,
    locale: "en",
    periodo: "21–22 · 27–29 jun",
  },
  {
    id: "bc-att-stadium",
    name: "AT&T Stadium Arlington (Copa)",
    address: "1 AT&T Way, Arlington, TX 76011",
    city: "Arlington",
    country: "Estados Unidos",
    lat: 32.7484,
    lng: -97.0942,
    locale: "en",
    periodo: "dias de jogo",
  },
  // ── Houston TX ────────────────────────────────────────────────
  {
    id: "bc-hou-hotel",
    name: "Hampton Inn Houston Downtown",
    address: "710 Crawford St, Houston, TX 77002",
    city: "Houston",
    country: "Estados Unidos",
    lat: 29.7555,
    lng: -95.3661,
    locale: "en",
    periodo: "22–24 jun",
  },
  {
    id: "bc-nrg-stadium",
    name: "NRG Stadium (Copa)",
    address: "1 NRG Pkwy, Houston, TX 77054",
    city: "Houston",
    country: "Estados Unidos",
    lat: 29.685,
    lng: -95.4104,
    locale: "en",
    periodo: "22–24 jun",
  },
  // ── Guadalajara Jalisco ───────────────────────────────────────
  {
    id: "bc-gdl-hotel",
    name: "Becquer Hotel Guadalajara",
    address: "Av. Guadalupe 596, Chapalita, 44500 Guadalajara, Jal.",
    city: "Guadalajara",
    country: "México",
    lat: 20.6588,
    lng: -103.3897,
    locale: "es",
    periodo: "24–27 jun",
  },
  {
    id: "bc-akron",
    name: "Estadio Akron Zapopan (Copa)",
    address: "Cto. J.V.C. 2800, El Bajío, 45014 Zapopan, Jal.",
    city: "Zapopan",
    country: "México",
    lat: 20.6891,
    lng: -103.467,
    locale: "es",
    periodo: "24–27 jun",
  },
];

export function ProximidadesBarbara() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Locais próximos</h1>
        <p className="text-sm text-muted-foreground">
          Para cada endereço, abre o Google Maps já filtrando por categoria — hospitais,
          farmácias, supermercados, restaurantes e bases policiais nas proximidades.
          Equipe Host · Bárbara Coelho · 7 cidades.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {BARBARA_ADDRESSES.map((addr) => (
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
