import { notFound } from "next/navigation";
import { getEquipe, getEquipeSlugs } from "@/lib/equipes";
import { SectionPlaceholder } from "@/components/equipes/SectionPlaceholder";
import { DeslocamentosAlemanha } from "@/components/equipes/alemanha/DeslocamentosAlemanha";
import { DeslocamentosFranca } from "@/components/equipes/franca/DeslocamentosFranca";
import { DeslocamentosEspanha } from "@/components/equipes/espanha/DeslocamentosEspanha";
import { DeslocamentosUruguai } from "@/components/equipes/uruguai/DeslocamentosUruguai";
import { DeslocamentosBeltChico } from "@/components/equipes/brasil-belt-chico/DeslocamentosBeltChico";

export function generateStaticParams() {
  return getEquipeSlugs().map((slug) => ({ slug }));
}

export default async function EquipeDeslocamentosPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const equipe = getEquipe(slug);
  if (!equipe) notFound();

  if (slug === "alemanha-bruna") {
    return <DeslocamentosAlemanha />;
  }

  if (slug === "franca-isa") {
    return <DeslocamentosFranca />;
  }

  if (slug === "espanha-fala-porco") {
    return <DeslocamentosEspanha />;
  }

  if (slug === "uruguai-day") {
    return <DeslocamentosUruguai />;
  }

  if (slug === "brasil-belt-chico") {
    return <DeslocamentosBeltChico />;
  }

  return (
    <div className="p-5 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">{equipe.name}</h1>
        {equipe.subtitle && (
          <p className="text-sm text-gray-400 mt-0.5">{equipe.subtitle}</p>
        )}
      </div>
      <SectionPlaceholder section="Deslocamentos" team={equipe.name} />
    </div>
  );
}
