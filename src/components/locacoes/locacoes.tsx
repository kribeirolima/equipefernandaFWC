"use client";

import { useMemo, useState } from "react";
import { VENUES, type LocationCategory } from "@/lib/locations";
import { VenueCard } from "./venue-card";
import { cn } from "@/lib/utils";
import { Building2, Trees, UtensilsCrossed, Beer, Telescope, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type CategoryFilter = "all" | LocationCategory;

const CATEGORY_TABS: { value: CategoryFilter; label: string; Icon: LucideIcon }[] = [
  { value: "all",         label: "Todas",          Icon: Layers },
  { value: "rooftop",     label: "Rooftops",       Icon: Building2 },
  { value: "park",        label: "Parques",        Icon: Trees },
  { value: "brazilian",   label: "Brasileiros",    Icon: UtensilsCrossed },
  { value: "sports_bar",  label: "Sports bars",    Icon: Beer },
  { value: "observatory", label: "Observatórios",  Icon: Telescope },
];

interface ToggleFilters {
  day: boolean;
  night: boolean;
  free: boolean;
  noPermit: boolean;
}

const TOGGLE_TABS: { key: keyof ToggleFilters; label: string }[] = [
  { key: "day",      label: "Bom de dia" },
  { key: "night",    label: "Bom à noite" },
  { key: "free",     label: "Gratuito" },
  { key: "noPermit", label: "Sem permit" },
];

export function Locacoes() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [toggles, setToggles] = useState<ToggleFilters>({
    day: false,
    night: false,
    free: false,
    noPermit: false,
  });

  const filtered = useMemo(() => {
    return VENUES.filter((v) => {
      if (category !== "all" && v.category !== category) return false;
      if (toggles.day && v.goodDay !== "yes") return false;
      if (toggles.night && v.goodNight !== "yes") return false;
      if (toggles.free && v.cost !== "free") return false;
      if (toggles.noPermit && v.permit !== "none") return false;
      return true;
    });
  }, [category, toggles]);

  const toggle = (key: keyof ToggleFilters) =>
    setToggles((s) => ({ ...s, [key]: !s[key] }));

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Locações para gravações ao vivo
        </h1>
        <p className="text-sm text-muted-foreground">
          Rooftops, parques, restaurantes brasileiros, bares esportivos e observatórios
          em NYC e NJ. Filtre por categoria, período do dia, custo e necessidade de permit.
        </p>
      </div>

      <div className="space-y-3 rounded-lg border bg-card p-4 shadow-sm">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Categoria
          </p>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORY_TABS.map((tab) => {
              const Icon = tab.Icon;
              const active = category === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setCategory(tab.value)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "border-blue-200 bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:border-blue-500/30 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-500/30"
                      : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Filtros rápidos
          </p>
          <div className="flex flex-wrap gap-1.5">
            {TOGGLE_TABS.map((tab) => {
              const active = toggles[tab.key];
              return (
                <button
                  key={tab.key}
                  onClick={() => toggle(tab.key)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30"
                      : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
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
          {filtered.map((v) => (
            <VenueCard key={v.id} venue={v} />
          ))}
        </div>
      )}

      <div className="space-y-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm dark:border-amber-500/30 dark:bg-amber-500/10">
        <p className="font-semibold text-amber-900 dark:text-amber-200">
          Permit para filmagem comercial
        </p>
        <ul className="ml-4 list-disc space-y-1 text-xs text-amber-900/90 dark:text-amber-200/90">
          <li>
            <strong>NYC público:</strong> NYC MOME (nyc.gov/film) — gratuito, prazo
            3–5 dias úteis, exige seguro de responsabilidade civil (~$1M).
          </li>
          <li>
            <strong>NJ público:</strong> Cada município tem processo próprio (Hoboken,
            Weehawken, Jersey City). Geralmente $25–$150, prazo 5–10 dias úteis.
          </li>
          <li>
            <strong>Privado:</strong> Negociar diretamente com o estabelecimento.
            Top of the Rock e SUMMIT cobram taxas específicas para uso comercial.
          </li>
        </ul>
      </div>
    </main>
  );
}
