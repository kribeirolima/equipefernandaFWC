"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { type Route, locationById, parseTimeMid } from "@/lib/data";

type ChartDatum = {
  name: string;
  short: string;
  normal: number;
  pesado: number;
};

export function TimesChart({ routes }: { routes: Route[] }) {
  const data = useMemo<ChartDatum[]>(() => {
    return routes
      .map((r) => {
        const dest = locationById(r.to);
        return {
          name: dest?.name ?? r.to,
          short: shortName(dest?.name ?? r.to),
          normal: Math.round(parseTimeMid(r.carN)),
          pesado: Math.round(parseTimeMid(r.carH)),
        };
      })
      .sort((a, b) => a.normal - b.normal);
  }, [routes]);

  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        Sem rotas para a origem selecionada.
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="short"
            stroke="var(--muted-foreground)"
            fontSize={11}
            interval={0}
            angle={-22}
            textAnchor="end"
            height={70}
          />
          <YAxis
            stroke="var(--muted-foreground)"
            fontSize={11}
            tickFormatter={(v) => `${v}m`}
          />
          <Tooltip
            contentStyle={{
              background: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 12,
              color: "var(--popover-foreground)",
            }}
            cursor={{ fill: "var(--muted)", opacity: 0.4 }}
            formatter={(v, key) => [`${v} min`, key === "normal" ? "Carro normal" : "Carro pesado"]}
            labelFormatter={(label, payload) => {
              const full = payload?.[0]?.payload?.name as string | undefined;
              return full ?? label;
            }}
          />
          <Bar dataKey="normal" name="Carro normal" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
          <Bar dataKey="pesado" name="Carro pesado" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function shortName(s: string): string {
  return s
    .replace(/^Aeroporto /, "")
    .replace(/Hotel /, "")
    .replace(/ \(.*\)$/, "")
    .replace(/Stadium$/, "")
    .replace(/Park$/, "Park")
    .replace(/Square$/, "Sq.")
    .replace(/Station$/, "St.")
    .trim();
}
