export interface Equipe {
  slug: string;
  name: string;
  subtitle?: string;
  href?: string; // se definido, o card aponta para este URL em vez de /equipes/[slug]
  passKey: string;
  hospKey: string;
}

export const EQUIPES: Equipe[] = [
  {
    slug: "brasil",
    name: "Equipe Brasil",
    subtitle: "Fernanda Gentil",
    href: "/",         // aponta para o portal existente
    passKey: "pv3_fg_pass",
    hospKey: "pv3_fg_hosp",
  },
  {
    slug: "alemanha-bruna",
    name: "Equipe Alemanha",
    subtitle: "Bruna Dealtry",
    passKey: "eq_ba_pass",
    hospKey: "eq_ba_hosp",
  },
  // Adicionar novas equipes aqui
];

export function getEquipe(slug: string): Equipe | undefined {
  return EQUIPES.find((e) => e.slug === slug);
}

export function getEquipeSlugs(): string[] {
  return EQUIPES.filter((e) => !e.href).map((e) => e.slug);
}
