import { notFound } from "next/navigation";
import { getEquipe, getEquipeSlugs } from "@/lib/equipes";
import { SectionPlaceholder } from "@/components/equipes/SectionPlaceholder";
import { LocacoesAlemanha } from "@/components/equipes/alemanha/LocacoesAlemanha";
import { LocacoesFranca } from "@/components/equipes/franca/LocacoesFranca";
import { LocacoesEspanha } from "@/components/equipes/espanha/LocacoesEspanha";
import { LocacoesUruguai } from "@/components/equipes/uruguai/LocacoesUruguai";
import { LocacoesBeltChico } from "@/components/equipes/brasil-belt-chico/LocacoesBeltChico";
import { LocacoesKlaynLeo } from "@/components/equipes/brasil-klayn-leo/LocacoesKlaynLeo";
import { LocacoesDefante } from "@/components/equipes/brasil-defante/LocacoesDefante";
import { LocacoesBarbara } from "@/components/equipes/host-barbara/LocacoesBarbara";

export function generateStaticParams() {
  return getEquipeSlugs().map((slug) => ({ slug }));
}

export default async function EquipeLocacoesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const equipe = getEquipe(slug);
  if (!equipe) notFound();

  if (slug === "alemanha-bruna") {
    return <LocacoesAlemanha />;
  }

  if (slug === "franca-isa") {
    return <LocacoesFranca />;
  }

  if (slug === "espanha-fala-porco") {
    return <LocacoesEspanha />;
  }

  if (slug === "uruguai-day") {
    return <LocacoesUruguai />;
  }

  if (slug === "brasil-belt-chico") {
    return <LocacoesBeltChico />;
  }

  if (slug === "brasil-klayn-leo") {
    return <LocacoesKlaynLeo />;
  }

  if (slug === "brasil-defante") {
    return <LocacoesDefante />;
  }

  if (slug === "host-barbara") {
    return <LocacoesBarbara />;
  }

  return (
    <div className="p-5 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">{equipe.name}</h1>
        {equipe.subtitle && <p className="text-sm text-gray-400 mt-0.5">{equipe.subtitle}</p>}
      </div>
      <SectionPlaceholder section="Locações" team={equipe.name} />
    </div>
  );
}
