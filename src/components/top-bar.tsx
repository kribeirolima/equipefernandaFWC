"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PlaneTakeoff, MapPin, Camera, Calendar, Plane, Menu, Radio, ChevronDown, Check } from "lucide-react";
import { EQUIPES, getEquipe } from "@/lib/equipes";

const NAV = [
  { href: "/",             label: "Deslocamentos",  Icon: PlaneTakeoff },
  { href: "/proximidades", label: "Locais próximos", Icon: MapPin       },
  { href: "/locacoes",     label: "Locações",        Icon: Camera       },
  { href: "/ordem-dia",    label: "Ordem do Dia",    Icon: Calendar     },
  { href: "/passagens",    label: "Passagens",       Icon: Plane        },
];

export function TopBar({
  sidebarOpen,
  onToggleSidebar,
}: {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [clock, setClock] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const equipeMatch = pathname.match(/^\/equipes\/([^/]+)/);
  const currentEquipe = equipeMatch ? getEquipe(equipeMatch[1]) : null;

  const teamName = currentEquipe ? currentEquipe.name : "Equipe Brasil";
  const teamSub  = currentEquipe ? (currentEquipe.subtitle ?? "Copa 2026") : "Fernanda Gentil";

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

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelectEquipe(equipe: typeof EQUIPES[number]) {
    setDropdownOpen(false);
    const href = equipe.href ?? `/equipes/${equipe.slug}`;
    router.push(href);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b border-gray-200 flex items-center px-3 gap-3">
      {/* Toggle sidebar */}
      <button
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
        className="hidden lg:flex p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors shrink-0"
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* Team selector */}
      <div className="relative shrink-0" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((v) => !v)}
          className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors group"
        >
          <Radio className="h-4 w-4 text-[#1A7A3C] shrink-0" />
          <span className="text-[14px] font-medium text-gray-900">{teamName}</span>
          <span className="text-[13px] font-normal text-gray-400 hidden sm:inline">· {teamSub}</span>
          <ChevronDown
            className={`h-3.5 w-3.5 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {dropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-60 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50">
            <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Selecionar equipe
            </p>
            {EQUIPES.map((equipe) => {
              const isCurrent =
                currentEquipe?.slug === equipe.slug ||
                (!currentEquipe && equipe.slug === "brasil");
              return (
                <button
                  key={equipe.slug}
                  onClick={() => handleSelectEquipe(equipe)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 transition-colors"
                >
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-white text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, #1A7A3C, #2EA855)" }}
                  >
                    {equipe.name.charAt(equipe.name.lastIndexOf(" ") + 1)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-gray-900 truncate">{equipe.name}</p>
                    {equipe.subtitle && (
                      <p className="text-[11px] text-gray-400 truncate">{equipe.subtitle}</p>
                    )}
                  </div>
                  {isCurrent && <Check className="h-3.5 w-3.5 text-[#1A7A3C] shrink-0" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Nav tabs — só mostra no contexto Brasil */}
      {!currentEquipe && (
        <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
          {NAV.map(({ href, label, Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium transition-colors rounded-md ${
                  active ? "text-[#1A7A3C]" : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
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
      )}

      {/* Clock */}
      <div className="ml-auto shrink-0">
        {clock && (
          <span
            className="hidden sm:inline-block px-2 py-1 rounded-md text-[11px] font-medium tabular-nums border"
            style={{ background: "#FFFBEB", color: "#B8860B", borderColor: "#F9E08B" }}
          >
            {clock}
          </span>
        )}
      </div>
    </header>
  );
}
