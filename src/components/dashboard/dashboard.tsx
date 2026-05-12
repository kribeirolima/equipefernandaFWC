"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  LOCATIONS,
  ROUTES,
  INSIGHTS,
  locationById,
  parseTimeMid,
  formatMinutes,
} from "@/lib/data";
import type { TeamKey } from "./team-filter";
import { OriginSelector } from "./origin-selector";
import { RouteCard } from "./route-card";
import { AlertRail } from "./alert-rail";
import { TimesChart } from "./times-chart";
import {
  Building2,
  Car,
  Route as RouteIcon,
  Train,
  TriangleAlert,
  MapPin,
} from "lucide-react";

const RouteMap = dynamic(() => import("./route-map").then((m) => m.RouteMap), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] w-full animate-pulse bg-gray-100" />
  ),
});

function TeamFilter({
  value,
  onChange,
}: {
  value: TeamKey;
  onChange: (v: TeamKey) => void;
}) {
  const OPTIONS: { value: TeamKey; label: string }[] = [
    { value: "ALL", label: "Todas" },
    { value: "NJ", label: "NJ" },
    { value: "NYC", label: "NYC" },
  ];
  return (
    <div className="inline-flex rounded-lg bg-gray-100 border border-gray-200 p-0.5 text-[13px]">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className="px-3.5 py-1.5 rounded-md font-medium transition-all"
          style={
            value === opt.value
              ? { background: "#1A7A3C", color: "#FFFFFF" }
              : { color: "#6B7280" }
          }
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function KpiCard({
  label,
  value,
  hint,
  icon,
  topColor,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: React.ReactNode;
  topColor: string;
}) {
  return (
    <div
      className="relative rounded-lg bg-white overflow-hidden p-4"
      style={{ border: "0.5px solid #E5E7EB" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: topColor }}
      />
      <div className="flex items-start justify-between mb-2">
        <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
          {label}
        </span>
        <div className="text-gray-300">{icon}</div>
      </div>
      <div className="text-[22px] font-medium text-gray-900 tracking-tight">{value}</div>
      {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

export function Dashboard() {
  const [team, setTeam] = useState<TeamKey>("ALL");
  const [originId, setOriginId] = useState<string>("renata");

  const origins = useMemo(() => LOCATIONS.filter((l) => l.isOrigin), []);

  const visibleOrigins = useMemo(
    () => origins.filter((o) => team === "ALL" || o.team === team),
    [origins, team]
  );

  if (visibleOrigins.length > 0 && !visibleOrigins.find((o) => o.id === originId)) {
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
    const visibleLocs = LOCATIONS.filter(
      (l) => team === "ALL" || l.team === team || l.team === "BOTH"
    );
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
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[18px] font-medium text-gray-900">Deslocamentos NYC / NJ</h1>
          <p className="text-[13px] text-gray-400 mt-0.5">
            Filtre por equipe · selecione a origem · explore tempos e rotas
          </p>
        </div>
        <TeamFilter value={team} onChange={setTeam} />
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <KpiCard label="Locais" value={String(stats.locais)} icon={<Building2 className="h-4 w-4" />} topColor="#1A7A3C" />
        <KpiCard label="Rotas" value={String(stats.rotas)} icon={<RouteIcon className="h-4 w-4" />} topColor="#D1D5DB" />
        <KpiCard label="Média carro" value={formatMinutes(stats.mediaCarro)} hint="trânsito normal" icon={<Car className="h-4 w-4" />} topColor="#B8860B" />
        <KpiCard label="Média TP" value={formatMinutes(stats.mediaTp)} hint="transporte público" icon={<Train className="h-4 w-4" />} topColor="#1565C0" />
        <KpiCard label="Difíceis" value={String(stats.dificeis)} hint="alta variabilidade" icon={<TriangleAlert className="h-4 w-4" />} topColor="#DC2626" />
      </div>

      {/* Mapa */}
      <div
        className="rounded-xl bg-white overflow-hidden"
        style={{ border: "0.5px solid #E5E7EB" }}
      >
        <div
          className="px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderBottom: "0.5px solid #E5E7EB" }}
        >
          <div>
            <h2 className="text-[13px] font-medium text-gray-900">Mapa de rotas</h2>
            <p className="text-[11px] text-gray-400">Cor = dificuldade a partir da origem</p>
          </div>
          <OriginSelector origins={origins} value={originId} onChange={setOriginId} team={team} />
        </div>
        <RouteMap originId={originId} team={team} />
      </div>

      {/* Route cards */}
      <div
        className="rounded-xl bg-white overflow-hidden"
        style={{ border: "0.5px solid #E5E7EB" }}
      >
        <div
          className="px-4 py-3 flex items-center gap-2"
          style={{ borderBottom: "0.5px solid #E5E7EB" }}
        >
          <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: "#1A7A3C" }} />
          <h2 className="text-[13px] font-medium text-gray-900">
            Saindo de{" "}
            <span style={{ color: "#1A7A3C" }}>{origin?.name ?? "—"}</span>
          </h2>
          <span className="ml-auto text-[11px] text-gray-400 shrink-0">
            {visibleRoutesForOrigin.length} destinos
          </span>
        </div>
        {/* Col headers */}
        <div
          className="hidden sm:flex items-center gap-3 px-4 py-2 text-[9px] font-medium text-gray-400 uppercase tracking-wider"
          style={{ borderBottom: "0.5px solid #E5E7EB", background: "#F9FAFB" }}
        >
          <div className="w-7 shrink-0" />
          <div className="flex-1">Destino</div>
          <div className="min-w-[72px] text-center hidden sm:block">Normal</div>
          <div className="min-w-[72px] text-center hidden md:block">Pico</div>
          <div className="min-w-[72px] text-center hidden md:block">TP</div>
          <div className="min-w-[64px] text-center hidden lg:block">Custo</div>
          <div className="w-20 text-center">Dific.</div>
          <div className="w-20 text-center">Maps</div>
        </div>
        {visibleRoutesForOrigin.length === 0 ? (
          <div className="py-10 text-center text-[13px] text-gray-400">
            Nenhuma rota para os filtros atuais.
          </div>
        ) : (
          origin &&
          visibleRoutesForOrigin.map((r, i) => (
            <RouteCard key={r.to} route={r} originAddr={origin.addr} index={i} />
          ))
        )}
      </div>

      {/* Chart + Alertas */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div
          className="rounded-xl bg-white overflow-hidden"
          style={{ border: "0.5px solid #E5E7EB" }}
        >
          <div className="px-4 py-3" style={{ borderBottom: "0.5px solid #E5E7EB" }}>
            <h2 className="text-[13px] font-medium text-gray-900">
              Tempo de carro · de {origin?.name ?? "—"}
            </h2>
            <p className="text-[11px] text-gray-400">Normal vs. horário de pico</p>
          </div>
          <div className="p-4">
            <TimesChart routes={visibleRoutesForOrigin} />
          </div>
        </div>

        <div
          className="rounded-xl bg-white overflow-hidden"
          style={{ border: "0.5px solid #E5E7EB" }}
        >
          <div className="px-4 py-3" style={{ borderBottom: "0.5px solid #E5E7EB" }}>
            <h2 className="text-[13px] font-medium text-gray-900">Alertas operacionais</h2>
            <p className="text-[11px] text-gray-400">Pontos de atenção para deslocamentos</p>
          </div>
          <div className="p-4">
            <AlertRail insights={INSIGHTS} />
          </div>
        </div>
      </div>
    </div>
  );
}
