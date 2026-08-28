"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Polyline, Popup, useMap } from "react-leaflet";
import type { LatLngBoundsExpression, LatLngTuple } from "leaflet";
import type { CityConfig } from "@/lib/types-deslocamentos";
import { originById, destinationById, routesFromOrigin } from "@/lib/types-deslocamentos";
import { googleMapsUrl } from "@/lib/maps";

const DIFF_COLOR: Record<string, string> = {
  facil: "#10b981",
  moderado: "#f59e0b",
  dificil: "#ef4444",
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
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    }
  }, [bounds, map]);
  return null;
}

export function CityRouteMap({ config, originId }: { config: CityConfig; originId: string }) {
  const origin = originById(config, originId);

  const routes = useMemo(
    () => routesFromOrigin(config, originId),
    [config, originId]
  );

  const bounds = useMemo<LatLngBoundsExpression | null>(() => {
    const points: LatLngTuple[] = [
      ...config.destinations.map((d) => [d.lat, d.lng] as LatLngTuple),
      ...config.origins.map((o) => [o.lat, o.lng] as LatLngTuple),
    ];
    return points.length > 0 ? points : null;
  }, [config]);

  const center: LatLngTuple = origin
    ? [origin.lat, origin.lng]
    : [config.destinations[0]?.lat ?? 0, config.destinations[0]?.lng ?? 0];

  return (
    <div className="h-[460px] w-full">
      <MapContainer center={center} zoom={12} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds bounds={bounds} />

        {origin &&
          routes.map((r) => {
            const dest = destinationById(config, r.to);
            if (!dest) return null;
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
                    <div>
                      Custo: carro {r.costCar} · tp {r.costTp}
                    </div>
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

        {config.origins.map((o) => (
          <CircleMarker
            key={`origin-${o.id}`}
            center={[o.lat, o.lng]}
            radius={o.id === originId ? 10 : 7}
            pathOptions={{
              color: "#ffffff",
              weight: 2,
              fillColor: "#1d4ed8",
              fillOpacity: 0.95,
            }}
          >
            <Popup>
              <div className="space-y-0.5">
                <div className="font-semibold">★ {o.name}</div>
                <div className="text-xs text-muted-foreground">{o.addr}</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {config.destinations.map((d) => (
          <CircleMarker
            key={d.id}
            center={[d.lat, d.lng]}
            radius={6}
            pathOptions={{
              color: "#ffffff",
              weight: 2,
              fillColor: "#71717a",
              fillOpacity: 0.95,
            }}
          >
            <Popup>
              <div className="space-y-0.5">
                <div className="font-semibold">{d.name}</div>
                <div className="text-xs text-muted-foreground">{d.addr}</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
