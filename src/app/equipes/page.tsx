import Link from "next/link";
import { EQUIPES } from "@/lib/equipes";

export default function EquipesPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            Copa do Mundo 2026
          </h1>
          <p className="text-gray-400 text-sm">
            Selecione a equipe que deseja acompanhar
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EQUIPES.map((equipe) => {
            const href = equipe.href ?? `/equipes/${equipe.slug}`;
            return (
              <Link
                key={equipe.slug}
                href={href}
                className="group flex items-center gap-4 p-5 rounded-xl border border-gray-200 bg-white hover:border-[#1A7A3C] hover:shadow-sm transition-all"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white text-lg font-bold shadow-sm"
                  style={{ background: "linear-gradient(135deg, #1A7A3C, #2EA855)" }}
                >
                  {equipe.name.charAt(equipe.name.lastIndexOf(" ") + 1)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate group-hover:text-[#1A7A3C] transition-colors">
                    {equipe.name}
                  </p>
                  {equipe.subtitle && (
                    <p className="text-sm text-gray-400 truncate">{equipe.subtitle}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
