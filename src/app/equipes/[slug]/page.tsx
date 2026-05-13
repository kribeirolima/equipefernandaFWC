import { notFound } from "next/navigation";
import { getEquipe, getEquipeSlugs } from "@/lib/equipes";
import { SectionPlaceholder } from "@/components/equipes/SectionPlaceholder";
import { DeslocamentosAlemanha } from "@/components/equipes/alemanha/DeslocamentosAlemanha";

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
