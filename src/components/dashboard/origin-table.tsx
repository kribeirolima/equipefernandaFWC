import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ROUTES, locationById, type Location } from "@/lib/data";
import { googleMapsUrl, type TravelMode } from "@/lib/maps";
import type { TeamKey } from "./team-filter";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { GoogleMapsIcon } from "./google-maps-icon";

const DIFF_LABEL = { facil: "Fácil", moderado: "Moderado", dificil: "Difícil" } as const;
const DIFF_CLASS = {
  facil: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300 border-transparent",
  moderado: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300 border-transparent",
  dificil: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300 border-transparent",
} as const;

const TEAM_CLASS = {
  NJ: "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300 border-transparent",
  NYC: "bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-300 border-transparent",
  BOTH: "bg-zinc-100 text-zinc-800 dark:bg-zinc-500/15 dark:text-zinc-300 border-transparent",
} as const;

const PILL_TONE = {
  blue: "bg-blue-50 ring-blue-200 hover:bg-blue-100 dark:bg-blue-500/10 dark:ring-blue-500/30 dark:hover:bg-blue-500/20",
  orange: "bg-orange-50 ring-orange-200 hover:bg-orange-100 dark:bg-orange-500/10 dark:ring-orange-500/30 dark:hover:bg-orange-500/20",
  emerald: "bg-emerald-50 ring-emerald-200 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:ring-emerald-500/30 dark:hover:bg-emerald-500/20",
} as const;

function MapsLinkPill({
  origin,
  destination,
  mode,
  tone,
  ariaLabel,
}: {
  origin: string;
  destination: string;
  mode: TravelMode;
  tone: keyof typeof PILL_TONE;
  ariaLabel: string;
}) {
  return (
    <a
      href={googleMapsUrl(origin, destination, mode)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      title={ariaLabel}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md ring-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        PILL_TONE[tone]
      )}
    >
      <GoogleMapsIcon className="h-4 w-4" />
    </a>
  );
}

export function OriginTable({ origin, team }: { origin: Location; team: TeamKey }) {
  const routes = ROUTES.filter((r) => {
    if (r.from !== origin.id) return false;
    const dest = locationById(r.to);
    if (!dest) return false;
    if (team === "ALL") return true;
    return dest.team === team || dest.team === "BOTH";
  });

  if (routes.length === 0) return null;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="flex flex-col gap-1 border-b bg-muted/30 sm:flex-row sm:items-center sm:gap-3">
        <Badge variant="outline" className={cn("font-semibold", TEAM_CLASS[origin.team])}>
          {origin.team}
        </Badge>
        <CardTitle className="text-base">De {origin.name}</CardTitle>
        <span className="text-xs text-muted-foreground">{origin.addr}</span>
      </CardHeader>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="w-[24%]">Destino</TableHead>
              <TableHead>Carro normal</TableHead>
              <TableHead>Carro pesado</TableHead>
              <TableHead>Transp. público</TableHead>
              <TableHead>Custo</TableHead>
              <TableHead className="text-right">Dificuldade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.map((r) => {
              const dest = locationById(r.to);
              if (!dest) return null;
              return (
                <TableRow
                  key={r.to}
                  className={cn(dest.exclusiveNJ && "bg-blue-50/50 dark:bg-blue-500/5")}
                >
                  <TableCell className="align-top">
                    <div className="flex items-center gap-1.5 font-medium">
                      {dest.name}
                      {dest.exclusiveNJ && <Star className="h-3.5 w-3.5 fill-current text-amber-500" />}
                    </div>
                    <div className="text-xs text-muted-foreground">{r.dist}</div>
                    {r.note && (
                      <div className="mt-1 text-xs italic text-muted-foreground">{r.note}</div>
                    )}
                  </TableCell>
                  <TableCell className="align-top">
                    <MapsLinkPill
                      origin={origin.addr}
                      destination={dest.addr}
                      mode="driving"
                      tone="blue"
                      ariaLabel={`Abrir Google Maps · carro · ${origin.name} para ${dest.name}`}
                    />
                  </TableCell>
                  <TableCell className="align-top">
                    <MapsLinkPill
                      origin={origin.addr}
                      destination={dest.addr}
                      mode="driving"
                      tone="orange"
                      ariaLabel={`Abrir Google Maps · carro (estimativa de pico) · ${origin.name} para ${dest.name}`}
                    />
                  </TableCell>
                  <TableCell className="align-top">
                    <MapsLinkPill
                      origin={origin.addr}
                      destination={dest.addr}
                      mode="transit"
                      tone="emerald"
                      ariaLabel={`Abrir Google Maps · transporte público · ${origin.name} para ${dest.name}`}
                    />
                  </TableCell>
                  <TableCell className="align-top">
                    <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                      <span>Carro <strong className="text-foreground font-semibold">{r.costCar}</strong></span>
                      <span>TP <strong className="text-foreground font-semibold">{r.costTp}</strong></span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right align-top">
                    <Badge variant="outline" className={cn("font-medium", DIFF_CLASS[r.diff])}>
                      {DIFF_LABEL[r.diff]}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
