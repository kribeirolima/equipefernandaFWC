"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlaneTakeoff, MapPin, Camera, Calendar, Plane, Users, ChevronLeft, Route } from "lucide-react";
import { EQUIPES, getEquipe } from "@/lib/equipes";

const BRASIL_NAV = [
  { href: "/",             label: "Deslocamentos",          description: "NYC / NJ",            Icon: PlaneTakeoff },
  { href: "/proximidades", label: "Locais próximos",        description: "CDMX · NJ · Miami",   Icon: MapPin       },
  { href: "/locacoes",     label: "Locações",               description: "Ao vivo",             Icon: Camera       },
  { href: "/ordem-dia",    label: "Ordem do Dia",           description: "CazéTV · Copa 2026",  Icon: Calendar     },
  { href: "/passagens",    label: "Passagens e hospedagens",description: "Voos · Hotéis",       Icon: Plane        },
];

const EQUIPE_SECTIONS = [
  { key: "",            label: "Deslocamentos",          Icon: Route        },
  { key: "proximidades",label: "Locais próximos",        Icon: MapPin       },
  { key: "locacoes",    label: "Locações",               Icon: Camera       },
  { key: "ordem-dia",   label: "Ordem do Dia",           Icon: Calendar     },
  { key: "passagens",   label: "Passagens e hospedagens",Icon: Plane        },
];

export function NavSidebar({ open }: { open: boolean }) {
  const pathname = usePathname();

  // Detecta se está numa página de equipe externa
  const equipeMatch = pathname.match(/^\/equipes\/([^/]+)(\/.*)?$/);
  const equipeSlug = equipeMatch?.[1];
  const currentEquipe = equipeSlug ? getEquipe(equipeSlug) : null;

  const isEquipesIndex = pathname === "/equipes";

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`fixed top-14 left-0 bottom-0 z-40 hidden lg:flex flex-col bg-white border-r border-gray-200 transition-[width] duration-200 overflow-y-auto ${
          open ? "w-60" : "w-16"
        }`}
      >
        <nav className="flex-1 p-2 space-y-0.5">

          {/* Quando está dentro de uma equipe externa */}
          {currentEquipe ? (
            <>
              {/* Voltar para seleção */}
              <Link
                href="/equipes"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors border border-transparent"
              >
                <ChevronLeft className="h-4 w-4 shrink-0" />
                {open && <span className="text-[13px] font-medium">Todas as equipes</span>}
              </Link>

              {open && (
                <p className="px-3 pt-2 pb-1 text-[11px] font-semibold text-gray-400 truncate">
                  {currentEquipe.name}
                </p>
              )}

              {/* Seções da equipe */}
              {EQUIPE_SECTIONS.map(({ key, label, Icon }) => {
                const href = key
                  ? `/equipes/${equipeSlug}/${key}`
                  : `/equipes/${equipeSlug}`;
                const active = pathname === href;
                return (
                  <Link
                    key={key}
                    href={href}
                    title={!open ? label : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors border ${
                      active
                        ? "border-transparent"
                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-50 border-transparent"
                    }`}
                    style={active ? { background: "rgba(26,122,60,0.07)", color: "#1A7A3C" } : undefined}
                  >
                    <Icon className="h-4 w-4 shrink-0" style={active ? { color: "#1A7A3C" } : undefined} />
                    {open && <span className="text-[13px] font-medium truncate">{label}</span>}
                  </Link>
                );
              })}
            </>
          ) : (
            <>
              {/* Nav padrão — Equipe Brasil */}
              {BRASIL_NAV.map(({ href, label, description, Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    title={!open ? label : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group border ${
                      active
                        ? "border-transparent"
                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-50 border-transparent"
                    }`}
                    style={active ? { background: "rgba(26,122,60,0.07)", color: "#1A7A3C" } : undefined}
                  >
                    <Icon className="h-4 w-4 shrink-0" style={active ? { color: "#1A7A3C" } : undefined} />
                    {open && (
                      <div className="flex flex-col min-w-0">
                        <span className="text-[13px] font-medium leading-tight truncate">{label}</span>
                        <span className="text-[11px] text-gray-400 truncate">{description}</span>
                      </div>
                    )}
                  </Link>
                );
              })}

              {/* Separador + outras equipes */}
              {open && (
                <p className="px-3 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Outras Equipes
                </p>
              )}
              <Link
                href="/equipes"
                title={!open ? "Selecionar equipe" : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors border ${
                  isEquipesIndex
                    ? "border-transparent"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50 border-transparent"
                }`}
                style={isEquipesIndex ? { background: "rgba(26,122,60,0.07)", color: "#1A7A3C" } : undefined}
              >
                <Users className="h-4 w-4 shrink-0" style={isEquipesIndex ? { color: "#1A7A3C" } : undefined} />
                {open && (
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-medium leading-tight">Selecionar equipe</span>
                    <span className="text-[11px] text-gray-400">{EQUIPES.length} equipes</span>
                  </div>
                )}
              </Link>
            </>
          )}
        </nav>

        {open && (
          <p className="px-3 py-3 text-[10px] text-gray-400 leading-tight border-t border-gray-200">
            Tempos e custos são estimativas. Pedágios e tarifas podem variar.
          </p>
        )}
      </aside>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex lg:hidden bg-white border-t border-gray-200 overflow-x-auto">
        {currentEquipe ? (
          <>
            <Link
              href="/equipes"
              className="shrink-0 flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium"
              style={{ color: "#9CA3AF" }}
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Equipes</span>
            </Link>
            {EQUIPE_SECTIONS.map(({ key, label, Icon }) => {
              const href = key ? `/equipes/${equipeSlug}/${key}` : `/equipes/${equipeSlug}`;
              const active = pathname === href;
              return (
                <Link
                  key={key}
                  href={href}
                  className="shrink-0 flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors"
                  style={active ? { color: "#1A7A3C" } : { color: "#9CA3AF" }}
                >
                  <Icon className="h-5 w-5" />
                  <span className="truncate px-0.5 leading-none">{label.split(" ")[0]}</span>
                </Link>
              );
            })}
          </>
        ) : (
          <>
            {BRASIL_NAV.map(({ href, label, Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="shrink-0 flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors"
                  style={active ? { color: "#1A7A3C" } : { color: "#9CA3AF" }}
                >
                  <Icon className="h-5 w-5" />
                  <span className="truncate max-w-full px-0.5 leading-none">{label.split(" ")[0]}</span>
                </Link>
              );
            })}
          </>
        )}
      </nav>
    </>
  );
}
