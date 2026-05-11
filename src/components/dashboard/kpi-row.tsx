import { Card } from "@/components/ui/card";
import { formatMinutes } from "@/lib/data";
import { Building2, Car, Route as RouteIcon, Train, TriangleAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface KpiProps {
  label: string;
  value: string;
  hint?: string;
  Icon: LucideIcon;
  accent: "blue" | "orange" | "emerald" | "amber" | "red";
}

const ACCENT: Record<KpiProps["accent"], string> = {
  blue: "from-blue-500/10 to-blue-500/0 text-blue-600 dark:text-blue-400",
  orange: "from-orange-500/10 to-orange-500/0 text-orange-600 dark:text-orange-400",
  emerald: "from-emerald-500/10 to-emerald-500/0 text-emerald-600 dark:text-emerald-400",
  amber: "from-amber-500/10 to-amber-500/0 text-amber-600 dark:text-amber-400",
  red: "from-red-500/10 to-red-500/0 text-red-600 dark:text-red-400",
};

function Kpi({ label, value, hint, Icon, accent }: KpiProps) {
  return (
    <Card className="relative overflow-hidden p-4">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${ACCENT[accent]} opacity-60`}
      />
      <div className="relative space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </span>
          <Icon className={`h-4 w-4 ${ACCENT[accent].split(" ").pop()}`} />
        </div>
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    </Card>
  );
}

export function KpiRow({
  locais,
  rotas,
  mediaCarro,
  mediaTp,
  dificeis,
}: {
  locais: number;
  rotas: number;
  mediaCarro: number;
  mediaTp: number;
  dificeis: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      <Kpi
        label="Locais"
        value={String(locais)}
        Icon={Building2}
        accent="blue"
      />
      <Kpi
        label="Rotas"
        value={String(rotas)}
        Icon={RouteIcon}
        accent="orange"
      />
      <Kpi
        label="Média carro"
        value={formatMinutes(mediaCarro)}
        hint="trânsito normal"
        Icon={Car}
        accent="emerald"
      />
      <Kpi
        label="Média TP"
        value={formatMinutes(mediaTp)}
        hint="transporte público"
        Icon={Train}
        accent="amber"
      />
      <Kpi
        label="Trechos difíceis"
        value={String(dificeis)}
        hint="alta variabilidade"
        Icon={TriangleAlert}
        accent="red"
      />
    </div>
  );
}
