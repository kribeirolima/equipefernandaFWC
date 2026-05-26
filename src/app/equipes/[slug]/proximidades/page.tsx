import { notFound } from "next/navigation";
import { getEquipe, getEquipeSlugs } from "@/lib/equipes";
import { SectionPlaceholder } from "@/components/equipes/SectionPlaceholder";
import { ProximidadesAlemanha } from "@/components/equipes/alemanha/ProximidadesAlemanha";
import { ProximidadesFranca } from "@/components/equipes/franca/ProximidadesFranca";
import { ProximidadesEspanha } from "@/components/equipes/espanha/ProximidadesEspanha";
import { ProximidadesUruguai } from "@/components/equipes/uruguai/ProximidadesUruguai";
import { ProximidadesBeltChico } from "@/components/equipes/brasil-belt-chico/ProximidadesBeltChico";
import { ProximidadesKlaynLeo } from "@/components/equipes/brasil-klayn-leo/ProximidadesKlaynLeo";
import { ProximidadesDefante } from "@/components/equipes/brasil-defante/ProximidadesDefante";
import { ProximidadesBarbara } from "@/components/equipes/host-barbara/ProximidadesBarbara";

export function generateStaticParams() {
  return getEquipeSlugs().map((slug) => ({ slug }));
}

export default async function EquipeProximidadesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const equipe = getEquipe(slug);
  if (!equipe) notFound();

  if (slug === "alemanha-bruna") {
    return <ProximidadesAlemanha />;
  }

  if (slug === "franca-isa") {
    return <ProximidadesFranca />;
  }

  if (slug === "espanha-fala-porco") {
    return <ProximidadesEspanha />;
  }

  if (slug === "uruguai-day") {
    return <ProximidadesUruguai />;
  }

  if (slug === "brasil-belt-chico") {
    return <ProximidadesBeltChico />;
  }

  if (slug === "brasil-klayn-leo") {
    return <ProximidadesKlaynLeo />;
  }

  if (slug === "brasil-defante") {
    return <ProximidadesDefante />;
  }

  if (slug === "host-barbara") {
    return <ProximidadesBarbara />;
  }

  return (
    <div className="p-5 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">{equipe.name}</h1>
        {equipe.subtitle && <p className="text-sm text-gray-400 mt-0.5">{equipe.subtitle}</p>}
      </div>
      <SectionPlaceholder section="Locais próximos" team={equipe.name} />
    </div>
  );
}
