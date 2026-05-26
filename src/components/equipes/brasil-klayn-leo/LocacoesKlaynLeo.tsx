"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Trees,
  UtensilsCrossed,
  Beer,
  Telescope,
  Layers,
  Star,
  Sun,
  Moon,
  Clock,
  ExternalLink,
  AlertTriangle,
  XCircle,
  MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BELT_CHICO_VENUES,
  BELT_CHICO_PERMIT_LABEL,
  type BeltChicoVenueItem,
  type BeltChicoPermit,
} from "@/lib/data-belt-chico-locacoes";
import type { LocationCategory, DayNight } from "@/lib/locations";
import { googleMapsPlaceUrl } from "@/lib/maps";
import { GoogleMapsIcon } from "@/components/dashboard/google-maps-icon";

const CATEGORY_VISUAL: Record<
  LocationCategory,
  { Icon: LucideIcon; label: string; tone: string }
> = {
  rooftop:     { Icon: Building2,       label: "Rooftop",      tone: "bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300" },
  park:        { Icon: Trees,           label: "Parque",       tone: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300" },
  brazilian:   { Icon: UtensilsCrossed, label: "Brasileiro",   tone: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300" },
  sports_bar:  { Icon: Beer,            label: "Sports Bar",   tone: "bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-300" },
  observatory: { Icon: Telescope,       label: "Observatório", tone: "bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300" },
};

const PERMIT_TONE = {
  green:  "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  amber:  "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  orange: "bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-300",
} as const;

const COST_LABEL: Record<string, string> = {
  free: "Gratuito",
  $:    "Pago $",
  $$:   "Pago $$",
  $$$:  "Pago $$$",
  paid: "Pago",
};

function PeriodBadge({ status, Icon, label }: { status: DayNight; Icon: LucideIcon; label: string }) {
  const tone =
    status === "yes"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30"
      : status === "warning"
      ? "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30"
      : "bg-zinc-100 text-zinc-500 ring-zinc-200 dark:bg-zinc-500/10 dark:text-zinc-500 dark:ring-zinc-500/20";
  const StatusIcon = status === "yes" ? Icon : status === "warning" ? AlertTriangle : XCircle;
  return (
    <span
      className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1", tone)}
      title={status === "yes" ? `${label} — recomendado` : status === "warning" ? `${label} — com ressalvas` : `${label} — não recomendado`}
    >
      <StatusIcon className="h-3 w-3" />
      {label}
    </span>
  );
}

function VenueCard({ venue }: { venue: BeltChicoVenueItem }) {
  const visual = CATEGORY_VISUAL[venue.category];
  const CategoryIcon = visual.Icon;
  const permit = BELT_CHICO_PERMIT_LABEL[venue.permit as BeltChicoPermit];
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
            <span className="text-[11px] font-normal text-muted-foreground">({venue.reviewCount})</span>
          </span>
        </div>
        <div>
          <h3 className="text-base font-semibold leading-tight">{venue.name}</h3>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {venue.area} · {venue.cidadeLabel}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">{venue.address}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <PeriodBadge status={venue.goodDay} Icon={Sun} label="Dia" />
          <PeriodBadge status={venue.goodNight} Icon={Moon} label="Noite" />
          <Badge
            variant="outline"
            className={cn("font-medium", venue.cost === "free" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300" : "bg-zinc-100 text-zinc-700 dark:bg-zinc-500/15 dark:text-zinc-300")}
          >
            {COST_LABEL[venue.cost] ?? venue.cost}
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
        {venue.costNote && <p className="text-[11px] italic text-muted-foreground">{venue.costNote}</p>}
        <p className="flex-1 text-xs leading-relaxed text-foreground/80">{venue.tips}</p>
        <div className="mt-auto flex items-center justify-between border-t pt-3">
          <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
            {venue.permitNote ?? permit.label}
          </span>
          <a
            href={googleMapsPlaceUrl(venue.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200 transition-colors hover:bg-blue-100 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-500/30 dark:hover:bg-blue-500/25"
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

type CategoryFilter = "all" | LocationCategory;
type CidadeFilter = "all" | BeltChicoVenueItem["cidade"];

const CATEGORY_TABS: { value: CategoryFilter; label: string; Icon: LucideIcon }[] = [
  { value: "all",         label: "Todas",         Icon: Layers },
  { value: "rooftop",     label: "Rooftops",      Icon: Building2 },
  { value: "park",        label: "Parques",       Icon: Trees },
  { value: "brazilian",   label: "Brasileiros",   Icon: UtensilsCrossed },
  { value: "sports_bar",  label: "Sports bars",   Icon: Beer },
  { value: "observatory", label: "Observatórios", Icon: Telescope },
];

const CIDADE_TABS: { value: CidadeFilter; label: string; periodo: string }[] = [
  { value: "all",          label: "Todas",         periodo: "" },
  { value: "morristown",   label: "Morristown NJ", periodo: "01–05 · 07–23 · 25–28 jun" },
  { value: "cleveland",    label: "Cleveland",     periodo: "05–07 jun" },
  { value: "philadelphia", label: "Philadelphia",  periodo: "18–19 jun" },
  { value: "miami",        label: "Miami",         periodo: "23–25 jun" },
];

interface ToggleFilters { day: boolean; night: boolean; free: boolean; noPermit: boolean; }

const TOGGLE_TABS: { key: keyof ToggleFilters; label: string }[] = [
  { key: "day",      label: "Bom de dia" },
  { key: "night",    label: "Bom à noite" },
  { key: "free",     label: "Gratuito" },
  { key: "noPermit", label: "Sem permit" },
];

export function LocacoesKlaynLeo() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [cidade, setCidade] = useState<CidadeFilter>("all");
  const [toggles, setToggles] = useState<ToggleFilters>({ day: false, night: false, free: false, noPermit: false });

  const filtered = useMemo(() => {
    return BELT_CHICO_VENUES.filter((v) => {
      if (category !== "all" && v.category !== category) return false;
      if (cidade !== "all" && v.cidade !== cidade) return false;
      if (toggles.day && v.goodDay !== "yes") return false;
      if (toggles.night && v.goodNight !== "yes") return false;
      if (toggles.free && v.cost !== "free") return false;
      if (toggles.noPermit && v.permit !== "none") return false;
      return true;
    });
  }, [category, cidade, toggles]);

  const toggle = (key: keyof ToggleFilters) => setToggles((s) => ({ ...s, [key]: !s[key] }));

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Locações para gravações ao vivo</h1>
        <p className="text-sm text-muted-foreground">
          Rooftops, parques, restaurantes brasileiros, bares esportivos e observatórios
          nas cidades do roteiro da Equipe Brasil · Klayn e Leo. Filtre por cidade, categoria, período do dia e permit.
        </p>
      </div>

      <div className="space-y-3 rounded-lg border bg-card p-4 shadow-sm">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Cidade</p>
          <div className="flex flex-wrap gap-1.5">
            {CIDADE_TABS.map((tab) => {
              const active = cidade === tab.value;
              return (
                <button key={tab.value} onClick={() => setCidade(tab.value)}
                  className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    active ? "border-blue-200 bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:border-blue-500/30 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-500/30"
                           : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground")}
                >
                  {tab.label}
                  {tab.periodo && <span className="font-mono text-[10px] opacity-70">{tab.periodo}</span>}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Categoria</p>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORY_TABS.map((tab) => {
              const Icon = tab.Icon;
              const active = category === tab.value;
              return (
                <button key={tab.value} onClick={() => setCategory(tab.value)}
                  className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    active ? "border-blue-200 bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:border-blue-500/30 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-500/30"
                           : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground")}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Filtros rápidos</p>
          <div className="flex flex-wrap gap-1.5">
            {TOGGLE_TABS.map((tab) => {
              const active = toggles[tab.key];
              return (
                <button key={tab.key} onClick={() => toggle(tab.key)}
                  className={cn("rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    active ? "border-emerald-200 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30"
                           : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <strong className="font-semibold text-foreground">{filtered.length}</strong>{" "}
          {filtered.length === 1 ? "locação" : "locações"} encontradas
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed bg-muted/30 px-4 py-12 text-center text-sm text-muted-foreground">
          Nenhuma locação atende a todos os filtros. Experimente afrouxar alguma opção.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((v) => <VenueCard key={v.id} venue={v} />)}
        </div>
      )}

      <div className="space-y-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm dark:border-amber-500/30 dark:bg-amber-500/10">
        <p className="font-semibold text-amber-900 dark:text-amber-200">Permit para filmagem comercial</p>
        <ul className="ml-4 list-disc space-y-1 text-xs text-amber-900/90 dark:text-amber-200/90">
          <li><strong>New Jersey — espaços públicos:</strong> Morris County Office of Tourism and Film para Morristown Green e Lewis Morris County Park. Contato via morriscountynj.gov.</li>
          <li><strong>Cleveland:</strong> Greater Cleveland Film Commission (clevelandfilm.com) para Edgewater Park e espaços públicos do condado.</li>
          <li><strong>Philadelphia:</strong> Philadelphia Film Office (film.org) para Love Park e JFK Plaza. Gratuito para espaços públicos — prazo recomendado de 5–10 dias úteis.</li>
          <li><strong>Miami:</strong> Miami-Dade Film Office (filmiami.org) para Margaret Pace Park e espaços públicos do município. Miami Beach Film &amp; Print Office para locações em Miami Beach (The Broken Shaker).</li>
          <li><strong>Privado (qualquer cidade):</strong> Negociar diretamente — Assembly Rooftop (Logan Hotel), Platform Beer Co., Jockey Hollow e The Broken Shaker têm tarifas específicas para uso comercial.</li>
        </ul>
      </div>
    </main>
  );
}
