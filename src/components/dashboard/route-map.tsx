"use client";

import { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Polyline, Popup, useMap } from "react-leaflet";
import type { LatLngBoundsExpression, LatLngTuple } from "leaflet";
import { LOCATIONS, ROUTES, locationById } from "@/lib/data";
import { googleMapsUrl } from "@/lib/maps";
import type { TeamKey } from "./team-filter";

const DIFF_COLOR: Record<string, string> = {
  facil: "#10b981",
  moderado: "#f59e0b",
  dificil: "#ef4444",
};

const TEAM_COLOR: Record<string, string> = {
  NJ: "#3b82f6",
  NYC: "#f97316",
  BOTH: "#71717a",
};

const DIFF_LABEL: Record<string, string> = {
  facil: "Fácil",
  moderado: "Moderado",
  dificil: "Difícil",
};

function FitBounds({ bounds }: { bounds: LatLngBoundsExpression | null }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
    }
  }, [bounds, map]);
  return null;
}

function isVisibleForTeam(team: TeamKey, locTeam: "NJ" | "NYC" | "BOTH"): boolean {
  if (team === "ALL") return true;
  if (team === "NJ") return locTeam === "NJ" || locTeam === "BOTH";
  return locTeam === "NYC" || locTeam === "BOTH";
}

export function RouteMap({ originId, team }: { originId: string; team: TeamKey }) {
  const origin = locationById(originId);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleLocs = useMemo(
    () => LOCATIONS.filter((l) => isVisibleForTeam(team, l.team)),
    [team]
  );

  const routes = useMemo(() => {
    if (!origin) return [];
    if (team !== "ALL" && origin.team !== team) return [];
    return ROUTES.filter((r) => r.from === origin.id).filter((r) => {
      const d = locationById(r.to);
      return d ? isVisibleForTeam(team, d.team) : false;
    });
  }, [origin, team]);

  const bounds = useMemo<LatLngBoundsExpression | null>(() => {
    if (!origin) {
      if (visibleLocs.length > 0) {
        return visibleLocs.map((l) => [l.lat, l.lng] as LatLngTuple);
      }
      return null;
    }
    const points: LatLngTuple[] = [[origin.lat, origin.lng]];
    routes.forEach((r) => {
      const d = locationById(r.to);
      if (d) points.push([d.lat, d.lng]);
    });
    if (points.length < 2) {
      return visibleLocs.length > 0
        ? visibleLocs.map((l) => [l.lat, l.lng] as LatLngTuple)
        : null;
    }
    return points;
  }, [origin, routes, visibleLocs]);

  return (
    <div ref={containerRef} className="h-[460px] w-full">
      <MapContainer
        center={[40.78, -74.1]}
        zoom={10}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds bounds={bounds} />

        {routes.map((r) => {
          const dest = locationById(r.to);
          if (!origin || !dest) return null;
          return (
            <Polyline
              key={`${r.from}-${r.to}`}
              positions={[
                [origin.lat, origin.lng],
                [dest.lat, dest.lng],
              ]}
              pathOptions={{
                color: DIFF_COLOR[r.diff],
                weight: 3,
                opacity: 0.75,
              }}
            >
              <Popup>
                <div className="space-y-1.5">
                  <div className="font-semibold">
                    {origin.name} → {dest.name}
                  </div>
                  <div>Carro: {r.carN}</div>
                  <div>TP: {r.tp}</div>
                  <div>Custo: carro {r.costCar} · tp {r.costTp}</div>
                  <div className="text-muted-foreground">{DIFF_LABEL[r.diff]}</div>
                  <div className="flex gap-1.5 pt-1">
                    <a
                      href={googleMapsUrl(origin.addr, dest.addr, "driving")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700"
                    >
                      Carro · Maps
                    </a>
                    <a
                      href={googleMapsUrl(origin.addr, dest.addr, "transit")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
                    >
                      TP · Maps
                    </a>
                  </div>
                </div>
              </Popup>
            </Polyline>
          );
        })}

        {visibleLocs.map((loc) => {
          const isOriginPoint = origin && loc.id === origin.id;
          return (
            <CircleMarker
              key={loc.id}
              center={[loc.lat, loc.lng]}
              radius={isOriginPoint ? 10 : 6}
              pathOptions={{
                color: "#ffffff",
                weight: 2,
                fillColor: isOriginPoint ? "#1d4ed8" : TEAM_COLOR[loc.team],
                fillOpacity: 0.95,
              }}
            >
              <Popup>
                <div className="space-y-0.5">
                  <div className="font-semibold">
                    {isOriginPoint ? "★ " : ""}
                    {loc.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{loc.addr}</div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
