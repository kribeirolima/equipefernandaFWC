"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PlaneTakeoff, MapPin, Camera, Calendar, Plane, Menu, Radio } from "lucide-react";
import { getEquipe } from "@/lib/equipes";

const NAV = [
  { href: "/", label: "Deslocamentos", Icon: PlaneTakeoff },
  { href: "/proximidades", label: "Locais próximos", Icon: MapPin },
  { href: "/locacoes", label: "Locações", Icon: Camera },
  { href: "/ordem-dia", label: "Ordem do Dia", Icon: Calendar },
  { href: "/passagens", label: "Passagens", Icon: Plane },
];

export function TopBar({
  sidebarOpen,
  onToggleSidebar,
}: {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}) {
  const pathname = usePathname();
  const equipeMatch = pathname.match(/^\/equipes\/([^/]+)/);
  const currentEquipe = equipeMatch ? getEquipe(equipeMatch[1]) : null;
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/New_York",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setClock(`${formatted} EDT`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b border-gray-200 flex items-center px-3 gap-3">
      {/* Logo + toggle */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="hidden lg:flex p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Menu className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1.5">
          <Radio className="h-4 w-4 text-[#1A7A3C]" />
          <span className="text-[14px] font-medium text-gray-900">
            {currentEquipe ? currentEquipe.name : "Equipe Brasil"}
          </span>
          <span className="text-[13px] font-normal text-gray-400">
            · {currentEquipe ? (currentEquipe.subtitle ?? "Copa 2026") : "Fernanda Gentil"}
          </span>
        </div>
      </div>

      {/* Nav tabs */}
      <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
        {NAV.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium transition-colors rounded-md ${
                active
                  ? "text-[#1A7A3C]"
                  : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
              }`}
              style={active ? { background: "rgba(26,122,60,0.07)" } : undefined}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">{label}</span>
              {active && (
                <span
                  className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                  style={{ background: "#1A7A3C" }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Clock badge */}
      <div className="ml-auto shrink-0">
        {clock && (
          <span
            className="hidden sm:inline-block px-2 py-1 rounded-md text-[11px] font-medium tabular-nums border"
            style={{
              background: "#FFFBEB",
              color: "#B8860B",
              borderColor: "#F9E08B",
            }}
          >
            {clock}
          </span>
        )}
      </div>
    </header>
  );
}
