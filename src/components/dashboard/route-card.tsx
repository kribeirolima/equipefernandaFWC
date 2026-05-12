import { type Route, locationById, type Difficulty } from "@/lib/data";
import { googleMapsUrl } from "@/lib/maps";
import { GoogleMapsIcon } from "./google-maps-icon";
import { Car, Train, DollarSign, Navigation } from "lucide-react";

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

export function RouteCard({
  route,
  originAddr,
  index,
}: {
  route: Route;
  originAddr: string;
  index: number;
}) {
  const dest = locationById(route.to);
  if (!dest) return null;

  const drivingUrl = googleMapsUrl(originAddr, dest.addr, "driving");
  const transitUrl = googleMapsUrl(originAddr, dest.addr, "transit");

  return (
    <div
      className={`group relative flex items-center gap-3 px-4 py-3 border-b border-gray-100 transition-all duration-150 hover:bg-gray-50 ${
        index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
      }`}
    >
      {/* Borda esquerda no hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 scale-y-0 group-hover:scale-y-100 transition-transform origin-center duration-150"
        style={{ background: "#1A7A3C" }}
      />

      <div className="w-7 h-7 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
        <Navigation className="h-3.5 w-3.5 text-gray-400" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[13px] font-medium text-gray-900 truncate">{dest.name}</span>
          <span className="text-[11px] text-gray-400 shrink-0">{route.dist}</span>
        </div>
        {route.note && (
          <p className="text-[11px] text-gray-400 mt-0.5 truncate" title={route.note}>
            {route.note}
          </p>
        )}
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

      <div className="hidden md:flex flex-col items-center gap-0.5 min-w-[72px] text-center">
        <div className="flex items-center gap-1 text-[#1565C0]">
          <Train className="h-3 w-3" />
          <span className="text-[9px] uppercase tracking-wide font-medium">TP</span>
        </div>
        <span className="text-[12px] font-medium text-gray-700">{route.tp}</span>
      </div>

      <div className="hidden lg:flex flex-col items-center gap-0.5 min-w-[64px] text-center">
        <div className="flex items-center gap-1 text-gray-400">
          <DollarSign className="h-3 w-3" />
          <span className="text-[9px] uppercase tracking-wide font-medium">Custo</span>
        </div>
        <div className="flex flex-col items-center gap-px">
          <span className="text-[11px] text-gray-700">{route.costCar}</span>
          <span className="text-[11px] text-gray-400">{route.costTp} TP</span>
        </div>
      </div>

      <div className="shrink-0">
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${DIFF_STYLE[route.diff]}`}
        >
          {DIFF_LABEL[route.diff]}
        </span>
      </div>

      <div className="shrink-0 flex items-center gap-1.5">
        <a
          href={drivingUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={`Maps — carro · ${dest.name}`}
          className="p-1.5 rounded-md bg-white border border-gray-200 text-gray-500 hover:border-[#1A7A3C] hover:text-[#1A7A3C] transition-colors"
        >
          <GoogleMapsIcon className="h-4 w-4" />
        </a>
        <a
          href={transitUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={`Maps — transporte público · ${dest.name}`}
          className="p-1.5 rounded-md bg-white border border-gray-200 text-gray-500 hover:border-[#1A7A3C] hover:text-[#1A7A3C] transition-colors group/tp"
        >
          <Train className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
