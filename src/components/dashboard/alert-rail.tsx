import { AlertTriangle, Info, AlertCircle } from "lucide-react";

const CATEGORIES: { pattern: RegExp; tag: string; type: "warn" | "error" | "info" }[] = [
  { pattern: /túnel|lincoln|trânsito|congestion/i, tag: "Trânsito", type: "warn" },
  { pattern: /LGA|LaGuardia|JFK|aeroporto/i, tag: "Aeroporto", type: "info" },
  { pattern: /MetLife|jogo|NJ Transit/i, tag: "Estádio", type: "info" },
  { pattern: /pedágio|pricing/i, tag: "Pedágio", type: "error" },
  { pattern: /fim de semana/i, tag: "Dicas", type: "info" },
];

const TYPE_STYLE = {
  warn: {
    border: "#B8860B",
    bg: "#FFFBEB",
    icon: AlertTriangle,
    iconColor: "#B8860B",
    tagBg: "#FFFBEB",
    tagColor: "#92400E",
  },
  error: {
    border: "#DC2626",
    bg: "#FEF2F2",
    icon: AlertCircle,
    iconColor: "#DC2626",
    tagBg: "#FEF2F2",
    tagColor: "#DC2626",
  },
  info: {
    border: "#1565C0",
    bg: "#EFF6FF",
    icon: Info,
    iconColor: "#1565C0",
    tagBg: "#EFF6FF",
    tagColor: "#1E40AF",
  },
};

function categorize(text: string): { tag: string; type: "warn" | "error" | "info" } {
  for (const c of CATEGORIES) {
    if (c.pattern.test(text)) return { tag: c.tag, type: c.type };
  }
  return { tag: "Geral", type: "info" };
}

export function AlertRail({ insights }: { insights: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {insights.map((text, i) => {
        const { tag, type } = categorize(text);
        const style = TYPE_STYLE[type];
        const { icon: Icon } = style;

        const dotIdx = text.indexOf(". ");
        const title = dotIdx > 0 ? text.slice(0, dotIdx) : text.slice(0, 52);
        const body = dotIdx > 0 ? text.slice(dotIdx + 2).trim() : "";

        return (
          <div
            key={i}
            className="flex gap-2.5 px-3 py-2.5"
            style={{
              background: style.bg,
              borderLeft: `2px solid ${style.border}`,
              borderRadius: "0 6px 6px 0",
            }}
          >
            <Icon className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: style.iconColor }} />
            <div className="flex-1 min-w-0 space-y-0.5">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[11px] font-medium text-gray-900 leading-snug">{title}</p>
                <span
                  className="px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0"
                  style={{ background: style.tagBg, color: style.tagColor }}
                >
                  {tag}
                </span>
              </div>
              {body && (
                <p className="text-[11px] text-gray-500 leading-relaxed">{body}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
