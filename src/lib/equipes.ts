export interface Equipe {
  slug: string;
  name: string;
  passKey: string;
  hospKey: string;
}

export const EQUIPES: Equipe[] = [
  {
    slug: "bruna-alemanha",
    name: "Equipe Bruna - Alemanha",
    passKey: "eq_ba_pass",
    hospKey: "eq_ba_hosp",
  },
  // Adicionar novas equipes aqui
];

export function getEquipe(slug: string): Equipe | undefined {
  return EQUIPES.find((e) => e.slug === slug);
}
