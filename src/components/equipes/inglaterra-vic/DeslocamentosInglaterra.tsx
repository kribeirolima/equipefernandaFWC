"use client";

import { useState } from "react";
import { Car, Train, Navigation, MapPin, AlertTriangle, Info, AlertCircle } from "lucide-react";
import { INGLATERRA_BASES, type InglaterraRoute, type Difficulty } from "@/lib/data-inglaterra-vic";

const DIFF_LABEL: Record<Difficulty, string> = {
  facil: "Fácil",
  moderado: "Moderado",
  dificil: "Difícil",
};

const DIFF_STYLE: Record<Difficulty, string> = {
  facil: "bg-[#DCFCE7] text-[#166534]",
  moderado: "bg-[#FFFBEB] text-[#92400E]",
  dificil: "bg-[#EFF6FF] text-[#1E40AF]",
};

function RouteRow({ route, index }: { route: InglaterraRoute; index: number }) {
  return (
    <div
      className={`group relative flex items-center gap-3 px-4 py-3 border-b border-gray-100 transition-all duration-150 hover:bg-gray-50 ${
        index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
      }`}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 scale-y-0 group-hover:scale-y-100 transition-transform origin-center duration-150"
        style={{ background: "#003082" }}
      />

      <div className="w-7 h-7 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
        <Navigation className="h-3.5 w-3.5 text-gray-400" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[13px] font-medium text-gray-900 truncate">{route.destino}</span>
          <span className="text-[11px] text-gray-400 shrink-0">{route.dist}</span>
        </div>
        <p className="text-[11px] text-gray-400 mt-0.5 truncate" title={route.endereco}>
          {route.endereco}
        </p>
      </div>

      <div className="hidden sm:flex flex-col items-center gap-0.5 min-w-[72px] text-center">
        <div className="flex items-center gap-1 text-gray-400">
          <Car className="h-3 w-3" />
          <span className="text-[9px] uppercase tracking-wide font-medium">Normal</span>
        </div>
        <span className="text-[12px] font-medium text-gray-700">{route.carN}</span>
      </div>

      <div className="hidden md:flex flex-col items-center gap-0.5 min-w-[72px] text-center">
        <div className="flex items-center gap-1 text-[#B8860B]">
          <Car className="h-3 w-3" />
          <span className="text-[9px] uppercase tracking-wide font-medium">Pico</span>
        </div>
        <span className="text-[12px] font-medium text-gray-700">{route.carH}</span>
      </div>

      <div className="hidden lg:flex flex-col items-center gap-0.5 min-w-[100px] text-center">
        <div className="flex items-center gap-1 text-[#1565C0]">
          <Train className="h-3 w-3" />
          <span className="text-[9px] uppercase tracking-wide font-medium">TP</span>
        </div>
        <span className="text-[11px] font-medium text-gray-700 leading-tight text-center">
          {route.tp}
        </span>
      </div>

      <div className="shrink-0">
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${DIFF_STYLE[route.diff]}`}>
          {DIFF_LABEL[route.diff]}
        </span>
      </div>

      <a
        href={route.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`Google Maps — ${route.destino}`}
        className="shrink-0 p-1.5 rounded-md bg-white border border-gray-200 text-gray-500 hover:border-[#003082] hover:text-[#003082] transition-colors"
      >
        <MapPin className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}

type AlertType = "warn" | "error" | "info";

const ALERT_PATTERNS: { pattern: RegExp; tag: string; type: AlertType }[] = [
  { pattern: /Airbnb.*confirmar|endereço.*confirmar|distâncias.*ajustadas/i,                                         tag: "Pendente",   type: "error" },
  { pattern: /Valet.*confirmar|cobrança.*verificar|pool.*confirmar/i,                                                tag: "Atenção",    type: "error" },
  { pattern: /Surge pricing|surge pricing|pedir.*30 min|pico de demanda/i,                                           tag: "Surge",      type: "warn"  },
  { pattern: /AT&T Stadium|GEHA|Arrowhead|NRG|MetLife|Copa|Shuttle|FIFA/i,                                           tag: "Estádio",    type: "info"  },
  { pattern: /MCI|DAL|DFW|IAH|EWR|JFK|LGA|HOU|Love Field|Hobby|aeroporto/i,                                        tag: "Aeroporto",  type: "info"  },
  { pattern: /DART|TRE|METRORail|NJ Transit|NJT|PATH|Streetcar|RideKC|Amtrak/i,                                     tag: "Transporte", type: "info"  },
  { pattern: /EDT|CDT|UTC|BRT|fuso|avança|ajustar|mesmo fuso/i,                                                      tag: "Fuso",       type: "warn"  },
  { pattern: /trânsito|pico|congestion|caótico|intenso/i,                                                            tag: "Trânsito",   type: "warn"  },
  { pattern: /Uber|Lyft/i,                                                                                           tag: "Dicas",      type: "info"  },
  { pattern: /American Dream|MetLife.*próximo|hotel mais próximo|Harmony Suites/i,                                   tag: "Destaque",   type: "info"  },
];

const ALERT_STYLE: Record<AlertType, { border: string; bg: string; icon: typeof Info; iconColor: string; tagBg: string; tagColor: string }> = {
  warn:  { border: "#B8860B", bg: "#FFFBEB", icon: AlertTriangle, iconColor: "#B8860B", tagBg: "#FFFBEB", tagColor: "#92400E" },
  error: { border: "#DC2626", bg: "#FEF2F2", icon: AlertCircle,   iconColor: "#DC2626", tagBg: "#FEF2F2", tagColor: "#DC2626" },
  info:  { border: "#1565C0", bg: "#EFF6FF", icon: Info,          iconColor: "#1565C0", tagBg: "#EFF6FF", tagColor: "#1E40AF" },
};

function categorize(text: string): { tag: string; type: AlertType } {
  for (const c of ALERT_PATTERNS) {
    if (c.pattern.test(text)) return { tag: c.tag, type: c.type };
  }
  return { tag: "Geral", type: "info" };
}

function AlertRail({ insights }: { insights: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {insights.map((text, i) => {
        const { tag, type } = categorize(text);
        const style = ALERT_STYLE[type];
        const { icon: Icon } = style;
        const dotIdx = text.indexOf(". ");
        const title = dotIdx > 0 ? text.slice(0, dotIdx) : text.slice(0, 60);
        const body  = dotIdx > 0 ? text.slice(dotIdx + 2).trim() : "";
        return (
          <div
            key={i}
            className="flex gap-2.5 px-3 py-2.5"
            style={{ background: style.bg, borderLeft: `2px solid ${style.border}`, borderRadius: "0 6px 6px 0" }}
          >
            <Icon className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: style.iconColor }} />
            <div className="flex-1 min-w-0 space-y-0.5">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[11px] font-medium text-gray-900 leading-snug">{title}</p>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0" style={{ background: style.tagBg, color: style.tagColor }}>
                  {tag}
                </span>
              </div>
              {body && <p className="text-[11px] text-gray-500 leading-relaxed">{body}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function DeslocamentosInglaterra() {
  const [baseId, setBaseId] = useState(INGLATERRA_BASES[0].id);
  const base = INGLATERRA_BASES.find((b) => b.id === baseId) ?? INGLATERRA_BASES[0];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-[18px] font-medium text-gray-900">Deslocamentos · Equipe Inglaterra</h1>
        <p className="text-[13px] text-gray-400 mt-0.5">Vic Leite · Copa do Mundo 2026</p>
      </div>

      {/* Base selector */}
      <div className="flex flex-wrap gap-2">
        {INGLATERRA_BASES.map((b) => (
          <button
            key={b.id}
            onClick={() => setBaseId(b.id)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all border"
            style={
              baseId === b.id
                ? { background: "#003082", color: "#FFFFFF", borderColor: "#003082" }
                : { background: "#F9FAFB", color: "#374151", borderColor: "#E5E7EB" }
            }
          >
            <span>{b.emoji}</span>
            <span>{b.cidade}</span>
            <span
              className="text-[11px]"
              style={baseId === b.id ? { color: "rgba(255,255,255,0.75)" } : { color: "#9CA3AF" }}
            >
              · {b.periodo.split(" · ")[0] === "base recorrente" ? b.periodo.split(" · ").slice(1).join(" · ") : b.periodo}
            </span>
          </button>
        ))}
      </div>

      {/* Hotel + referência + nota */}
      <div
        className="rounded-xl bg-white overflow-hidden"
        style={{ border: "0.5px solid #E5E7EB" }}
      >
        <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-start gap-3" style={{ borderBottom: "0.5px solid #E5E7EB" }}>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Hotel / Base</p>
            <p className="text-[13px] font-medium text-gray-900">{base.hotel}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{base.hotelAddr}</p>
            {base.fuso && (
              <p className="text-[11px] text-gray-400 mt-0.5">{base.fuso}</p>
            )}
            {base.nota && (
              <p className="text-[11px] text-amber-700 bg-amber-50 rounded px-2 py-1 mt-2 inline-block">
                ℹ {base.nota}
              </p>
            )}
          </div>
          {base.referenciaLabel && (
            <div className="flex-1 min-w-0 sm:text-right">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Referência</p>
              <p className="text-[13px] font-medium text-gray-900">{base.referenciaLabel}</p>
              {base.referenciaAddr && (
                <p className="text-[11px] text-gray-400">{base.referenciaAddr}</p>
              )}
            </div>
          )}
        </div>

        {/* Route table header */}
        <div
          className="hidden sm:flex items-center gap-3 px-4 py-2 text-[9px] font-medium text-gray-400 uppercase tracking-wider"
          style={{ borderBottom: "0.5px solid #E5E7EB", background: "#F9FAFB" }}
        >
          <div className="w-7 shrink-0" />
          <div className="flex-1">Destino</div>
          <div className="min-w-[72px] text-center hidden sm:block">Normal</div>
          <div className="min-w-[72px] text-center hidden md:block">Pico</div>
          <div className="min-w-[100px] text-center hidden lg:block">Transporte Público</div>
          <div className="w-20 text-center">Dific.</div>
          <div className="w-8 text-center">Maps</div>
        </div>

        {base.routes.map((r, i) => (
          <RouteRow key={r.destino} route={r} index={i} />
        ))}
      </div>

      {/* Transporte público + Alertas */}
      <div className="grid gap-5 lg:grid-cols-2">
        {base.transitoInfo && base.transitoInfo.length > 0 && (
          <div
            className="rounded-xl bg-white overflow-hidden"
            style={{ border: "0.5px solid #E5E7EB" }}
          >
            <div className="px-4 py-3" style={{ borderBottom: "0.5px solid #E5E7EB" }}>
              <h2 className="text-[13px] font-medium text-gray-900 flex items-center gap-2">
                <Train className="h-3.5 w-3.5" style={{ color: "#1565C0" }} />
                Transporte público
              </h2>
              <p className="text-[11px] text-gray-400 mt-0.5">{base.cidade}</p>
            </div>
            <div className="p-4 space-y-2">
              {base.transitoInfo.map((line, i) => (
                <div key={i} className="flex gap-2 text-[12px] text-gray-700">
                  <span className="shrink-0 mt-0.5 text-[#1565C0]">•</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          className="rounded-xl bg-white overflow-hidden"
          style={{ border: "0.5px solid #E5E7EB" }}
        >
          <div className="px-4 py-3" style={{ borderBottom: "0.5px solid #E5E7EB" }}>
            <h2 className="text-[13px] font-medium text-gray-900">Alertas operacionais</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">Pontos de atenção · {base.cidade}</p>
          </div>
          <div className="p-4">
            <AlertRail insights={base.insights} />
          </div>
        </div>
      </div>

      {/* Tabela de fusos */}
      <div
        className="rounded-xl bg-white overflow-hidden"
        style={{ border: "0.5px solid #E5E7EB" }}
      >
        <div className="px-4 py-3" style={{ borderBottom: "0.5px solid #E5E7EB" }}>
          <h2 className="text-[13px] font-medium text-gray-900">Fusos horários — roteiro completo</h2>
          <p className="text-[11px] text-gray-400 mt-0.5">Atenção às mudanças de fuso entre bases</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr style={{ borderBottom: "0.5px solid #E5E7EB", background: "#F9FAFB" }}>
                <th className="px-4 py-2 text-left text-[9px] uppercase tracking-wide font-medium text-gray-400">Base</th>
                <th className="px-4 py-2 text-left text-[9px] uppercase tracking-wide font-medium text-gray-400">Cidade</th>
                <th className="px-4 py-2 text-left text-[9px] uppercase tracking-wide font-medium text-gray-400">Fuso</th>
                <th className="px-4 py-2 text-left text-[9px] uppercase tracking-wide font-medium text-gray-400">BRT</th>
              </tr>
            </thead>
            <tbody>
              {[
                { base: "Dallas", cidade: "TX", fuso: "CDT (UTC -5h)", brt: "BRT = CDT +2h" },
                { base: "Houston", cidade: "TX", fuso: "CDT (UTC -5h)", brt: "BRT = CDT +2h" },
                { base: "New Jersey", cidade: "NJ", fuso: "EDT (UTC -4h)", brt: "BRT = EDT +1h", warn: true },
                { base: "Kansas City", cidade: "MO", fuso: "CDT (UTC -5h)", brt: "BRT = CDT +2h" },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: "0.5px solid #F3F4F6" }} className={row.warn ? "bg-amber-50" : i % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"}>
                  <td className="px-4 py-2 font-medium text-gray-800">{row.base}</td>
                  <td className="px-4 py-2 text-gray-500">{row.cidade}</td>
                  <td className={`px-4 py-2 font-mono ${row.warn ? "text-amber-700 font-semibold" : "text-gray-700"}`}>{row.fuso}</td>
                  <td className="px-4 py-2 text-gray-500">{row.brt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-amber-50" style={{ borderTop: "0.5px solid #FDE68A" }}>
          <p className="text-[11px] text-amber-800">
            ⚠️ <strong>Mudanças de fuso:</strong> Houston → NJ (20 jun) avança 1h &nbsp;|&nbsp;
            NJ → KC (24 jun) recua 1h &nbsp;|&nbsp; KC → NJ (26 jun) avança 1h
          </p>
        </div>
      </div>
    </div>
  );
}
