import { notFound } from "next/navigation";
import { getEquipe, getEquipeSlugs } from "@/lib/equipes";
import { SectionPlaceholder } from "@/components/equipes/SectionPlaceholder";
import { OrdemDiaEquipe } from "@/components/equipes/OrdemDiaEquipe";

export function generateStaticParams() {
  return getEquipeSlugs().map((slug) => ({ slug }));
}

const ORDEM_DIA_CONFIG: Record<string, { storagePrefix: string; printName: string }> = {
  "alemanha-bruna":     { storagePrefix: "ale", printName: "EQUIPE ALEMANHA · BRUNA DEALTRY" },
  "franca-isa":         { storagePrefix: "fra", printName: "EQUIPE FRANÇA · ISA PAGLIARI" },
  "espanha-fala-porco": { storagePrefix: "esp", printName: "EQUIPE ESPANHA · FALA PORCO" },
  "uruguai-day":        { storagePrefix: "ury", printName: "EQUIPE URUGUAI · DAY NATALE" },
  "brasil-belt-chico":  { storagePrefix: "bc",  printName: "EQUIPE BRASIL · BELT E CHICO" },
  "brasil-klayn-leo":   { storagePrefix: "kl",  printName: "EQUIPE BRASIL · KLAYN E LEO" },
  "host-barbara":       { storagePrefix: "hb",  printName: "EQUIPE HOST · BÁRBARA COELHO" },
  "argentina-rafa":     { storagePrefix: "arg", printName: "EQUIPE ARGENTINA · RAFA E DJALMINHA" },
  "inglaterra-vic":     { storagePrefix: "ing", printName: "EQUIPE INGLATERRA · VIC LEITE" },
  "portugal-joao":      { storagePrefix: "pt",  printName: "EQUIPE PORTUGAL · JOÃO BARRETTO" },
  "brasil-defante":     { storagePrefix: "df",  printName: "EQUIPE BRASIL · DEFANTE" },
};

export default async function EquipeOrdemDiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const equipe = getEquipe(slug);
  if (!equipe) notFound();

  const config = ORDEM_DIA_CONFIG[slug];
  if (config) {
    return <OrdemDiaEquipe storagePrefix={config.storagePrefix} printName={config.printName} />;
  }

  return (
    <div className="p-5 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">{equipe.name}</h1>
        {equipe.subtitle && <p className="text-sm text-gray-400 mt-0.5">{equipe.subtitle}</p>}
      </div>
      <SectionPlaceholder section="Ordem do Dia" team={equipe.name} />
    </div>
  );
}
