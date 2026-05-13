import { notFound } from "next/navigation";
import { getEquipe, EQUIPES } from "@/lib/equipes";
import { PersonPanel } from "@/components/passagens/PersonPanel";

export function generateStaticParams() {
  return EQUIPES.map((e) => ({ slug: e.slug }));
}

export default async function EquipePage({
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
        <h1 className="text-xl font-semibold text-gray-900">{equipe.name}</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Passagens e Hospedagens · Copa do Mundo 2026
        </p>
      </div>
      <PersonPanel
        name={equipe.name}
        passKey={equipe.passKey}
        hospKey={equipe.hospKey}
      />
    </div>
  );
}
