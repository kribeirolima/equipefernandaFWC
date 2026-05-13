"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlaneTakeoff, MapPin, Camera, Calendar } from "lucide-react";

const NAV = [
  { href: "/", label: "Deslocamentos", description: "NYC / NJ", Icon: PlaneTakeoff },
  { href: "/proximidades", label: "Locais próximos", description: "CDMX · NJ · Miami", Icon: MapPin },
  { href: "/locacoes", label: "Locações", description: "Ao vivo", Icon: Camera },
  { href: "/ordem-dia", label: "Ordem do Dia", description: "CazéTV · Copa 2026", Icon: Calendar },
];

export function NavSidebar({ open }: { open: boolean }) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`fixed top-14 left-0 bottom-0 z-40 hidden lg:flex flex-col bg-white border-r border-gray-200 transition-[width] duration-200 overflow-hidden ${
          open ? "w-60" : "w-16"
        }`}
      >
        <nav className="flex-1 p-2 space-y-0.5">
          {NAV.map(({ href, label, description, Icon }) => {
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
                style={
                  active
                    ? { background: "rgba(26,122,60,0.07)", color: "#1A7A3C", borderColor: "transparent" }
                    : undefined
                }
              >
                <Icon
                  className="h-4 w-4 shrink-0 transition-colors"
                  style={active ? { color: "#1A7A3C" } : undefined}
                />
                {open && (
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-medium leading-tight truncate">{label}</span>
                    <span className="text-[11px] text-gray-400 truncate">{description}</span>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
        {open && (
          <p className="px-3 py-3 text-[10px] text-gray-400 leading-tight border-t border-gray-200">
            Tempos e custos são estimativas. Pedágios e tarifas podem variar.
          </p>
        )}
      </aside>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex lg:hidden bg-white border-t border-gray-200">
        {NAV.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors"
              style={active ? { color: "#1A7A3C" } : { color: "#9CA3AF" }}
            >
              <Icon className="h-5 w-5" />
              <span className="truncate max-w-full px-0.5 leading-none">
                {label.split(" ")[0]}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
