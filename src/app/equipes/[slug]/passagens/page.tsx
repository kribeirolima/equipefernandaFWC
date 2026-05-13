import { notFound } from "next/navigation";
import { getEquipe, getEquipeSlugs } from "@/lib/equipes";
import { PersonPanel } from "@/components/passagens/PersonPanel";

export function generateStaticParams() {
  return getEquipeSlugs().map((slug) => ({ slug }));
}

export default async function EquipePassagensPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const equipe = getEquipe(slug);
  if (!equipe) notFound();
  return (
    <div className="p-5 space-y-5 max-w-3xl">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Passagens e Hospedagens</h1>
        <p className="text-sm text-gray-400 mt-0.5">{equipe.name} · Copa do Mundo 2026</p>
      </div>
      <PersonPanel
        name={equipe.name}
        passKey={equipe.passKey}
        hospKey={equipe.hospKey}
      />
    </div>
  );
}
