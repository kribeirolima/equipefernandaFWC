import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Trees,
  UtensilsCrossed,
  Beer,
  Telescope,
  Star,
  Sun,
  Moon,
  Clock,
  ExternalLink,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  COST_LABEL,
  PERMIT_LABEL,
  type DayNight,
  type LocationCategory,
  type Venue,
} from "@/lib/locations";
import { googleMapsPlaceUrl } from "@/lib/maps";
import { GoogleMapsIcon } from "@/components/dashboard/google-maps-icon";

const CATEGORY_VISUAL: Record<
  LocationCategory,
  { Icon: LucideIcon; label: string; tone: string }
> = {
  rooftop: {
    Icon: Building2,
    label: "Rooftop",
    tone: "bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300",
  },
  park: {
    Icon: Trees,
    label: "Parque",
    tone: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  brazilian: {
    Icon: UtensilsCrossed,
    label: "Brasileiro",
    tone: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  },
  sports_bar: {
    Icon: Beer,
    label: "Sports Bar",
    tone: "bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-300",
  },
  observatory: {
    Icon: Telescope,
    label: "Observatório",
    tone: "bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300",
  },
};

const PERMIT_TONE = {
  green: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  amber: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  orange: "bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-300",
} as const;

function PeriodBadge({
  status,
  Icon,
  label,
}: {
  status: DayNight;
  Icon: LucideIcon;
  label: string;
}) {
  const tone =
    status === "yes"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30"
      : status === "warning"
        ? "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30"
        : "bg-zinc-100 text-zinc-500 ring-zinc-200 dark:bg-zinc-500/10 dark:text-zinc-500 dark:ring-zinc-500/20";

  const StatusIcon =
    status === "yes" ? Icon : status === "warning" ? AlertTriangle : XCircle;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1",
        tone
      )}
      title={
        status === "yes"
          ? `${label} — recomendado`
          : status === "warning"
            ? `${label} — com ressalvas`
            : `${label} — não recomendado`
      }
    >
      <StatusIcon className="h-3 w-3" />
      {label}
    </span>
  );
}

export function VenueCard({ venue }: { venue: Venue }) {
  const visual = CATEGORY_VISUAL[venue.category];
  const CategoryIcon = visual.Icon;
  const permit = PERMIT_LABEL[venue.permit];

  return (
    <Card className="flex flex-col overflow-hidden p-0">
      <CardHeader className="space-y-2.5 border-b bg-muted/30 p-4">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="outline" className={cn("font-medium", visual.tone)}>
            <CategoryIcon className="mr-1 h-3 w-3" />
            {visual.label}
          </Badge>
          <span className="inline-flex items-center gap-1 text-sm font-semibold">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {venue.rating.toFixed(1)}
            <span className="text-[11px] font-normal text-muted-foreground">
              ({venue.reviewCount})
            </span>
          </span>
        </div>
        <div>
          <h3 className="text-base font-semibold leading-tight">{venue.name}</h3>
          <p className="text-xs text-muted-foreground">{venue.area}</p>
        </div>
        <p className="text-xs text-muted-foreground">{venue.address}</p>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <PeriodBadge status={venue.goodDay} Icon={Sun} label="Dia" />
          <PeriodBadge status={venue.goodNight} Icon={Moon} label="Noite" />
          <Badge
            variant="outline"
            className={cn(
              "font-medium",
              venue.cost === "free"
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300"
                : "bg-zinc-100 text-zinc-700 dark:bg-zinc-500/15 dark:text-zinc-300"
            )}
          >
            {COST_LABEL[venue.cost]}
          </Badge>
          <Badge
            variant="outline"
            className={cn("font-medium", PERMIT_TONE[permit.tone])}
            title={venue.permitNote ?? permit.label}
          >
            {permit.label}
          </Badge>
        </div>

        <div className="flex items-start gap-2 rounded-md bg-muted/40 px-2.5 py-2 text-[11px] leading-snug text-muted-foreground">
          <Clock className="mt-0.5 h-3 w-3 flex-shrink-0" />
          <span>{venue.hours}</span>
        </div>

        {venue.costNote && (
          <p className="text-[11px] italic text-muted-foreground">{venue.costNote}</p>
        )}

        <p className="flex-1 text-xs leading-relaxed text-foreground/80">{venue.tips}</p>

        <div className="mt-auto flex items-center justify-between border-t pt-3">
          <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
            {venue.permitNote ?? "Permit"}
          </span>
          <a
            href={googleMapsPlaceUrl(venue.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200 transition-colors hover:bg-blue-100 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-500/30 dark:hover:bg-blue-500/25"
            aria-label={`Abrir ${venue.name} no Google Maps`}
          >
            <GoogleMapsIcon className="h-3.5 w-3.5" />
            <span>Abrir no Maps</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
