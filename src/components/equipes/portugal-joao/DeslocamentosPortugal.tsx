"use client";

import { useState } from "react";
import { Car, Train, Navigation, MapPin, AlertTriangle, Info, AlertCircle } from "lucide-react";
import { PORTUGAL_BASES, type PortugalRoute, type Difficulty } from "@/lib/data-portugal-joao";

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

function RouteRow({ route, index }: { route: PortugalRoute; index: number }) {
  return (
    <div
      className={`group relative flex items-center gap-3 px-4 py-3 border-b border-gray-100 transition-all duration-150 hover:bg-gray-50 ${
        index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
      }`}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 scale-y-0 group-hover:scale-y-100 transition-transform origin-center duration-150"
        style={{ background: "#C8102E" }}
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
        className="shrink-0 p-1.5 rounded-md bg-white border border-gray-200 text-gray-500 hover:border-[#C8102E] hover:text-[#C8102E] transition-colors"
      >
        <MapPin className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}

type AlertType = "warn" | "error" | "info";

const ALERT_PATTERNS: { pattern: RegExp; tag: string; type: AlertType }[] = [
  { pattern: /Airbnb.*confirmar|endereço.*confirmar|distâncias.*ajustadas/i,                                 tag: "Pendente",   type: "error" },
  { pattern: /táxis de rua|táxi.*rua|evitar táxi/i,                                                          tag: "Segurança",  type: "warn"  },
  { pattern: /Surge pricing|surge pricing|pedir.*30 min|pico de demanda/i,                                   tag: "Surge",      type: "warn"  },
  { pattern: /Azteca.*caótico|trânsito caótico|Tlalpan|sair 2h|2h30 antes/i,                                tag: "Trânsito",   type: "warn"  },
  { pattern: /AICM.*3h|chegar 3h|3h antes/i,                                                                  tag: "Aeroporto",  type: "warn"  },
  { pattern: /Hard Rock|NRG|Azteca|Copa|shuttle/i,                                                            tag: "Estádio",    type: "info"  },
  { pattern: /MIA|FLL|IAH|HOU|MEX|AIFA|AICM|aeroporto|airport/i,                                           tag: "Aeroporto",  type: "info"  },
  { pattern: /Metrorail|METRORail|Metromover|Tri-Rail|Brightline|EASY Card|Metrô CDMX/i,                    tag: "Transporte", type: "info"  },
  { pattern: /EDT|CDT|UTC|BRT|fuso|avança|recua|ajustar|mesmo fuso/i,                                        tag: "Fuso",       type: "warn"  },
  { pattern: /MXN|Didi|moeda|peso/i,                                                                          tag: "Local",      type: "info"  },
  { pattern: /Uber|Lyft/i,                                                                                    tag: "Dicas",      type: "info"  },
  { pattern: /day trip|Brightline.*Fort Lauderdale|Orlando/i,                                                 tag: "Destaque",   type: "info"  },
  { pattern: /2 saídas.*Houston|saída.*15 jun|saída.*21 jun/i,                                               tag: "Roteiro",    type: "warn"  },
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

export function DeslocamentosPortugal() {
  const [baseId, setBaseId] = useState(PORTUGAL_BASES[0].id);
  const base = PORTUGAL_BASES.find((b) => b.id === baseId) ?? PORTUGAL_BASES[0];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-[18px] font-medium text-gray-900">Deslocamentos · Equipe Portugal</h1>
        <p className="text-[13px] text-gray-400 mt-0.5">João Barretto · Copa do Mundo 2026</p>
      </div>

      {/* Base selector */}
      <div className="flex flex-wrap gap-2">
        {PORTUGAL_BASES.map((b) => (
          <button
            key={b.id}
            onClick={() => setBaseId(b.id)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all border"
            style={
              baseId === b.id
                ? { background: "#C8102E", color: "#FFFFFF", borderColor: "#C8102E" }
                : { background: "#F9FAFB", color: "#374151", borderColor: "#E5E7EB" }
            }
          >
            <span>{b.emoji}</span>
            <span>{b.cidade}</span>
            <span
              className="text-[11px]"
              style={baseId === b.id ? { color: "rgba(255,255,255,0.75)" } : { color: "#9CA3AF" }}
            >
              {b.id === "miami"
                ? "· 12 jun–01 jul"
                : b.id === "houston"
                ? "· base recorrente"
                : `· ${b.periodo}`}
            </span>
          </button>
        ))}
      </div>

      {/* Houston — destaque dos dois hotéis */}
      {base.id === "houston" && (
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "0.5px solid #FDE68A", background: "#FFFBEB" }}
        >
          <div className="px-4 py-3 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 mb-1">1ª estadia · 15–17 jun</p>
              <p className="text-[13px] font-medium text-gray-900">Home2 Suites by Hilton Houston Downtown ⭐ 4.5</p>
              <p className="text-[11px] text-gray-500">1540 Leeland St, Houston, TX 77002</p>
              <p className="text-[11px] text-gray-400 mt-0.5">METRORail Convention District a 3 min a pé</p>
            </div>
            <div className="flex-1 min-w-0 sm:border-l sm:border-amber-200 sm:pl-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 mb-1">2ª estadia · 21–23 jun</p>
              <p className="text-[13px] font-medium text-gray-900">Hampton Inn Houston Downtown</p>
              <p className="text-[11px] text-gray-500">710 Crawford St, Houston, TX 77002</p>
              <p className="text-[11px] text-gray-400 mt-0.5">METRORail Downtown TC a 1 min a pé</p>
            </div>
          </div>
          <div className="px-4 py-2" style={{ borderTop: "0.5px solid #FDE68A" }}>
            <p className="text-[11px] text-amber-700">
              ℹ Rotas calculadas a partir do Home2 Suites (Leeland St). Distâncias equivalentes para o Hampton Inn — ambos no mesmo quarteirão.
            </p>
          </div>
        </div>
      )}

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
            {base.nota && base.id !== "houston" && (
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
          <p className="text-[11px] text-gray-400 mt-0.5">4 mudanças de fuso ao longo da cobertura</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr style={{ borderBottom: "0.5px solid #E5E7EB", background: "#F9FAFB" }}>
                <th className="px-4 py-2 text-left text-[9px] uppercase tracking-wide font-medium text-gray-400">Base</th>
                <th className="px-4 py-2 text-left text-[9px] uppercase tracking-wide font-medium text-gray-400">Local</th>
                <th className="px-4 py-2 text-left text-[9px] uppercase tracking-wide font-medium text-gray-400">Fuso</th>
                <th className="px-4 py-2 text-left text-[9px] uppercase tracking-wide font-medium text-gray-400">BRT</th>
              </tr>
            </thead>
            <tbody>
              {[
                { base: "Cidade do México", local: "CDMX",    fuso: "CDT (UTC -5h)", brt: "BRT = CDT +2h", warn: false },
                { base: "Miami",            local: "FL",      fuso: "EDT (UTC -4h)", brt: "BRT = EDT +1h", warn: true  },
                { base: "Houston",          local: "TX",      fuso: "CDT (UTC -5h)", brt: "BRT = CDT +2h", warn: false },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: "0.5px solid #F3F4F6" }} className={row.warn ? "bg-amber-50" : i % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"}>
                  <td className="px-4 py-2 font-medium text-gray-800">{row.base}</td>
                  <td className="px-4 py-2 text-gray-500">{row.local}</td>
                  <td className={`px-4 py-2 font-mono ${row.warn ? "text-amber-700 font-semibold" : "text-gray-700"}`}>{row.fuso}</td>
                  <td className="px-4 py-2 text-gray-500">{row.brt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-amber-50" style={{ borderTop: "0.5px solid #FDE68A" }}>
          <p className="text-[11px] text-amber-800">
            ⚠️ <strong>4 mudanças de fuso:</strong> CDMX → Miami (12 jun) avança 1h &nbsp;|&nbsp;
            Miami → Houston (15 e 21 jun) recua 1h &nbsp;|&nbsp;
            Houston → Miami (17 e 23 jun) avança 1h
          </p>
        </div>
      </div>
    </div>
  );
}
