"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { LOCATIONS, ROUTES, INSIGHTS, locationById, parseTimeMid } from "@/lib/data";
import { TeamFilter, type TeamKey } from "./team-filter";
import { KpiRow } from "./kpi-row";
import { OriginTable } from "./origin-table";
import { TimesChart } from "./times-chart";
import { InsightsPanel } from "./insights-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RouteMap = dynamic(() => import("./route-map").then((m) => m.RouteMap), {
  ssr: false,
  loading: () => (
    <div className="h-[460px] w-full animate-pulse rounded-lg bg-muted" />
  ),
});

export function Dashboard() {
  const [team, setTeam] = useState<TeamKey>("ALL");
  const [originId, setOriginId] = useState<string>("renata");

  const origins = useMemo(() => LOCATIONS.filter((l) => l.isOrigin), []);

  const visibleOrigins = useMemo(
    () => origins.filter((o) => team === "ALL" || o.team === team),
    [origins, team]
  );

  if (
    visibleOrigins.length > 0 &&
    !visibleOrigins.find((o) => o.id === originId)
  ) {
    setOriginId(visibleOrigins[0].id);
  }

  const origin = locationById(originId);

  const visibleRoutesForOrigin = useMemo(() => {
    if (!origin) return [];
    return ROUTES.filter((r) => {
      if (r.from !== origin.id) return false;
      const dest = locationById(r.to);
      if (!dest) return false;
      if (team === "ALL") return true;
      return dest.team === team || dest.team === "BOTH";
    });
  }, [origin, team]);

  const stats = useMemo(() => {
    const visibleRoutes = ROUTES.filter((r) => {
      const o = locationById(r.from);
      const d = locationById(r.to);
      if (!o || !d) return false;
      if (team !== "ALL" && o.team !== team) return false;
      if (team !== "ALL" && d.team !== team && d.team !== "BOTH") return false;
      return true;
    });
    const carTimes = visibleRoutes.map((r) => parseTimeMid(r.carN));
    const tpTimes = visibleRoutes.map((r) => parseTimeMid(r.tp));
    const dificeis = visibleRoutes.filter((r) => r.diff === "dificil").length;
    const visibleLocs = LOCATIONS.filter((l) => {
      if (team === "ALL") return true;
      return l.team === team || l.team === "BOTH";
    });
    const avg = (arr: number[]) =>
      arr.length === 0 ? 0 : arr.reduce((s, n) => s + n, 0) / arr.length;
    return {
      locais: visibleLocs.length,
      rotas: visibleRoutes.length,
      mediaCarro: avg(carTimes),
      mediaTp: avg(tpTimes),
      dificeis,
    };
  }, [team]);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Deslocamentos NYC / NJ</h1>
            <p className="text-sm text-muted-foreground">
              Filtre por equipe e selecione a origem para explorar tempos, custos e rotas no mapa.
            </p>
          </div>
          <TeamFilter value={team} onChange={setTeam} />
        </div>

        <KpiRow
          locais={stats.locais}
          rotas={stats.rotas}
          mediaCarro={stats.mediaCarro}
          mediaTp={stats.mediaTp}
          dificeis={stats.dificeis}
        />

        <Card className="overflow-hidden p-0">
          <CardHeader className="flex flex-col gap-3 border-b sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <CardTitle className="text-base">Mapa de rotas</CardTitle>
              <p className="text-xs text-muted-foreground">
                Linhas saem da origem selecionada. Cor = dificuldade do trajeto.
              </p>
            </div>
            <Select
              value={originId}
              onValueChange={(v) => {
                if (typeof v === "string") setOriginId(v);
              }}
            >
              <SelectTrigger className="w-full sm:w-[260px]">
                <SelectValue placeholder="Escolha a origem" />
              </SelectTrigger>
              <SelectContent>
                {origins.map((o) => (
                  <SelectItem
                    key={o.id}
                    value={o.id}
                    disabled={team !== "ALL" && o.team !== team}
                  >
                    {o.name} <span className="text-muted-foreground">· {o.team}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="p-0">
            <RouteMap originId={originId} team={team} />
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">
                Tempo médio de carro · saindo de {origin?.name ?? "—"}
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Comparação visual entre carro normal e horário de pico.
              </p>
            </CardHeader>
            <CardContent>
              <TimesChart routes={visibleRoutesForOrigin} />
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Alertas operacionais</CardTitle>
              <p className="text-xs text-muted-foreground">
                Pontos de atenção pra planejar deslocamentos.
              </p>
            </CardHeader>
            <CardContent>
              <InsightsPanel insights={INSIGHTS} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold tracking-tight">Tabelas por origem</h3>
          {visibleOrigins.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-sm text-muted-foreground">
                Nenhuma origem visível para os filtros atuais.
              </CardContent>
            </Card>
          ) : (
            visibleOrigins.map((o) => (
              <OriginTable key={o.id} origin={o} team={team} />
            ))
          )}
        </div>
    </main>
  );
}
