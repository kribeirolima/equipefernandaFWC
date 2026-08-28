"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  Building2,
  Car,
  Route as RouteIcon,
  TriangleAlert,
  MapPin,
  Navigation,
  Train,
  Info,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";
import type { CityAlert, CityConfig } from "@/lib/types-deslocamentos";
import { destinationById, originById, routesFromOrigin } from "@/lib/types-deslocamentos";
import { parseTimeMid, formatMinutes } from "@/lib/time-utils";
import { googleMapsUrl } from "@/lib/maps";
import { GoogleMapsIcon } from "./google-maps-icon";
import { CityTimesChart } from "./city-times-chart";

const CityRouteMap = dynamic(
  () => import("./city-route-map").then((m) => m.CityRouteMap),
  {
    ssr: false,
    loading: () => <div className="h-[460px] w-full animate-pulse bg-gray-100" />,
  }
);

const DIFF_LABEL = { facil: "Fácil", moderado: "Moderado", dificil: "Difícil" } as const;
const DIFF_STYLE = {
  facil: "bg-[#DCFCE7] text-[#166534]",
  moderado: "bg-[#FFFBEB] text-[#92400E]",
  dificil: "bg-[#FEF2F2] text-[#DC2626]",
} as const;

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
    <div className="relative rounded-lg bg-white overflow-hidden p-4" style={{ border: "0.5px solid #E5E7EB" }}>
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: topColor }} />
      <div className="flex items-start justify-between mb-2">
        <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">{label}</span>
        <div className="text-gray-300">{icon}</div>
      </div>
      <div className="text-[22px] font-medium text-gray-900 tracking-tight">{value}</div>
      {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

function OriginFilter({
  config,
  value,
  onChange,
}: {
  config: CityConfig;
  value: string;
  onChange: (id: string) => void;
}) {
  if (config.origins.length <= 1) return null;
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {config.origins.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            className="px-3 py-1.5 rounded-full text-[13px] font-medium border transition-all"
            style={
              active
                ? { background: "#1A7A3C", color: "#FFFFFF", borderColor: "#1A7A3C" }
                : { background: "#F3F4F6", color: "#6B7280", borderColor: "#E5E7EB" }
            }
          >
            {o.name}
          </button>
        );
      })}
    </div>
  );
}

function RouteRow({
  originAddr,
  destName,
  destAddr,
  dist,
  note,
  carN,
  carH,
  tp,
  costCar,
  costTp,
  diff,
}: {
  originAddr: string;
  destName: string;
  destAddr: string;
  dist: string;
  note?: string;
  carN: string;
  carH: string;
  tp: string;
  costCar: string;
  costTp: string;
  diff: "facil" | "moderado" | "dificil";
}) {
  const drivingUrl = googleMapsUrl(originAddr, destAddr, "driving");
  const transitUrl = googleMapsUrl(originAddr, destAddr, "transit");

  return (
    <div className="group relative flex items-center gap-3 px-4 py-3 border-b border-gray-100 transition-all duration-150 hover:bg-gray-50">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 scale-y-0 group-hover:scale-y-100 transition-transform origin-center duration-150" style={{ background: "#1A7A3C" }} />
      <div className="w-7 h-7 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
        <Navigation className="h-3.5 w-3.5 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[13px] font-medium text-gray-900 truncate">{destName}</span>
          <span className="text-[11px] text-gray-400 shrink-0">{dist}</span>
        </div>
        {note && (
          <p className="text-[11px] text-gray-400 mt-0.5 truncate" title={note}>
            {note}
          </p>
        )}
      </div>
      <div className="hidden sm:flex flex-col items-center gap-0.5 min-w-[72px] text-center">
        <div className="flex items-center gap-1 text-gray-400">
          <Car className="h-3 w-3" />
          <span className="text-[9px] uppercase tracking-wide font-medium">Normal</span>
        </div>
        <span className="text-[12px] font-medium text-gray-700">{carN}</span>
      </div>
      <div className="hidden md:flex flex-col items-center gap-0.5 min-w-[72px] text-center">
        <div className="flex items-center gap-1 text-[#B8860B]">
          <Car className="h-3 w-3" />
          <span className="text-[9px] uppercase tracking-wide font-medium">Pico</span>
        </div>
        <span className="text-[12px] font-medium text-gray-700">{carH}</span>
      </div>
      <div className="hidden md:flex flex-col items-center gap-0.5 min-w-[72px] text-center">
        <div className="flex items-center gap-1 text-[#1565C0]">
          <Train className="h-3 w-3" />
          <span className="text-[9px] uppercase tracking-wide font-medium">TP</span>
        </div>
        <span className="text-[11px] font-medium text-gray-700 leading-tight text-center">{tp}</span>
      </div>
      <div className="hidden lg:flex flex-col items-center gap-0.5 min-w-[64px] text-center">
        <span className="text-[9px] uppercase tracking-wide font-medium text-gray-400">Custo</span>
        <div className="flex flex-col items-center gap-px">
          <span className="text-[11px] text-gray-700">{costCar}</span>
          <span className="text-[11px] text-gray-400">{costTp} TP</span>
        </div>
      </div>
      <div className="shrink-0">
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${DIFF_STYLE[diff]}`}>{DIFF_LABEL[diff]}</span>
      </div>
      <div className="shrink-0 flex items-center gap-1.5">
        <a href={drivingUrl} target="_blank" rel="noopener noreferrer" title={`Maps — carro · ${destName}`} className="p-1.5 rounded-md bg-white border border-gray-200 text-gray-500 hover:border-[#1A7A3C] hover:text-[#1A7A3C] transition-colors">
          <GoogleMapsIcon className="h-4 w-4" />
        </a>
        <a href={transitUrl} target="_blank" rel="noopener noreferrer" title={`Maps — transporte público · ${destName}`} className="p-1.5 rounded-md bg-white border border-gray-200 text-gray-500 hover:border-[#1A7A3C] hover:text-[#1A7A3C] transition-colors">
          <Train className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

const ALERT_META = {
  transito: { label: "Trânsito", type: "warn" as const },
  aeroporto: { label: "Aeroporto", type: "info" as const },
  estadio: { label: "Estádio", type: "info" as const },
  geral: { label: "Geral", type: "info" as const },
  seguranca: { label: "Segurança", type: "danger" as const },
};

const ALERT_STYLE = {
  warn: { border: "#B8860B", bg: "#FFFBEB", icon: AlertTriangle, iconColor: "#B8860B", tagBg: "#FFFBEB", tagColor: "#92400E" },
  info: { border: "#1565C0", bg: "#EFF6FF", icon: Info, iconColor: "#1565C0", tagBg: "#EFF6FF", tagColor: "#1E40AF" },
  danger: { border: "#DC2626", bg: "#FEF2F2", icon: ShieldAlert, iconColor: "#DC2626", tagBg: "#FEF2F2", tagColor: "#DC2626" },
};

function AlertCard({ alert }: { alert: CityAlert }) {
  const meta = ALERT_META[alert.category];
  const style = ALERT_STYLE[meta.type];
  const Icon = style.icon;
  const dotIdx = alert.text.indexOf(". ");
  const title = dotIdx > 0 ? alert.text.slice(0, dotIdx) : alert.text.slice(0, 60);
  const body = dotIdx > 0 ? alert.text.slice(dotIdx + 2).trim() : "";
  return (
    <div className="flex gap-2.5 px-3 py-2.5" style={{ background: style.bg, borderLeft: `2px solid ${style.border}`, borderRadius: "0 6px 6px 0" }}>
      <Icon className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: style.iconColor }} />
      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[11px] font-medium text-gray-900 leading-snug">{title}</p>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0" style={{ background: style.tagBg, color: style.tagColor }}>
            {meta.label}
          </span>
        </div>
        {body && <p className="text-[11px] text-gray-500 leading-relaxed">{body}</p>}
      </div>
    </div>
  );
}

export function CityPanel({ config }: { config: CityConfig }) {
  const [originId, setOriginId] = useState(config.origins[0]?.id ?? "");
  const origin = originById(config, originId);

  const routes = useMemo(() => routesFromOrigin(config, originId), [config, originId]);

  const stats = useMemo(() => {
    const carTimes = routes.map((r) => parseTimeMid(r.carN));
    const avg = carTimes.length === 0 ? 0 : carTimes.reduce((s, n) => s + n, 0) / carTimes.length;
    return {
      locais: config.destinations.length,
      rotas: routes.length,
      mediaCarro: avg,
      dificeis: routes.filter((r) => r.diff === "dificil").length,
    };
  }, [config, routes]);

  return (
    <div className="space-y-5">
      <OriginFilter config={config} value={originId} onChange={setOriginId} />

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard label="Locais" value={String(stats.locais)} icon={<Building2 className="h-4 w-4" />} topColor="#1A7A3C" />
        <KpiCard label="Rotas" value={String(stats.rotas)} icon={<RouteIcon className="h-4 w-4" />} topColor="#D1D5DB" />
        <KpiCard label="Média carro" value={formatMinutes(stats.mediaCarro)} hint="trânsito normal" icon={<Car className="h-4 w-4" />} topColor="#B8860B" />
        <KpiCard label="Difíceis" value={String(stats.dificeis)} hint="alta variabilidade" icon={<TriangleAlert className="h-4 w-4" />} topColor="#DC2626" />
      </div>

      {/* Mapa */}
      <div className="rounded-xl bg-white overflow-hidden" style={{ border: "0.5px solid #E5E7EB" }}>
        <div className="px-4 py-3" style={{ borderBottom: "0.5px solid #E5E7EB" }}>
          <h2 className="text-[13px] font-medium text-gray-900">Mapa de rotas</h2>
          <p className="text-[11px] text-gray-400">Cor = dificuldade a partir da origem</p>
        </div>
        <CityRouteMap config={config} originId={originId} />
      </div>

      {/* Route list */}
      <div className="rounded-xl bg-white overflow-hidden" style={{ border: "0.5px solid #E5E7EB" }}>
        <div className="px-4 py-3 flex items-center gap-2" style={{ borderBottom: "0.5px solid #E5E7EB" }}>
          <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: "#1A7A3C" }} />
          <h2 className="text-[13px] font-medium text-gray-900">
            Saindo de <span style={{ color: "#1A7A3C" }}>{origin?.name ?? "—"}</span>
          </h2>
          <span className="ml-auto text-[11px] text-gray-400 shrink-0">{routes.length} destinos</span>
        </div>
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
        {routes.length === 0 ? (
          <div className="py-10 text-center text-[13px] text-gray-400">Nenhuma rota mapeada para esta origem.</div>
        ) : (
          origin &&
          routes.map((r) => {
            const dest = destinationById(config, r.to);
            if (!dest) return null;
            return (
              <RouteRow
                key={r.to}
                originAddr={origin.addr}
                destName={dest.name}
                destAddr={dest.addr}
                dist={r.dist}
                note={r.note}
                carN={r.carN}
                carH={r.carH}
                tp={r.tp}
                costCar={r.costCar}
                costTp={r.costTp}
                diff={r.diff}
              />
            );
          })
        )}
      </div>

      {/* Chart + Alertas */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl bg-white overflow-hidden" style={{ border: "0.5px solid #E5E7EB" }}>
          <div className="px-4 py-3" style={{ borderBottom: "0.5px solid #E5E7EB" }}>
            <h2 className="text-[13px] font-medium text-gray-900">Tempo de carro · de {origin?.name ?? "—"}</h2>
            <p className="text-[11px] text-gray-400">Normal vs. horário de pico</p>
          </div>
          <div className="p-4">
            <CityTimesChart config={config} originId={originId} />
          </div>
        </div>

        <div className="rounded-xl bg-white overflow-hidden" style={{ border: "0.5px solid #E5E7EB" }}>
          <div className="px-4 py-3" style={{ borderBottom: "0.5px solid #E5E7EB" }}>
            <h2 className="text-[13px] font-medium text-gray-900">Alertas operacionais</h2>
            <p className="text-[11px] text-gray-400">Pontos de atenção · {config.cidade}</p>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {config.alerts.map((a, i) => (
              <AlertCard key={i} alert={a} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
