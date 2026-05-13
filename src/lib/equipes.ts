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
  {
    slug: "franca-isa",
    name: "Equipe França",
    subtitle: "Isa Pagliari",
    passKey: "eq_fr_pass",
    hospKey: "eq_fr_hosp",
  },
  {
    slug: "espanha-fala-porco",
    name: "Equipe Espanha",
    subtitle: "Fala Porco",
    passKey: "eq_es_pass",
    hospKey: "eq_es_hosp",
  },
  {
    slug: "uruguai-day",
    name: "Equipe Uruguai",
    subtitle: "Day Natale",
    passKey: "eq_uy_pass",
    hospKey: "eq_uy_hosp",
  },
  {
    slug: "brasil-belt-chico",
    name: "Equipe Brasil",
    subtitle: "Belt e Chico",
    passKey: "eq_bc_pass",
    hospKey: "eq_bc_hosp",
  },
  {
    slug: "brasil-klayn-leo",
    name: "Equipe Brasil",
    subtitle: "Klayn e Leo",
    passKey: "eq_kl_pass",
    hospKey: "eq_kl_hosp",
  },
  {
    slug: "host-barbara",
    name: "Equipe Host",
    subtitle: "Bárbara Coelho",
    passKey: "eq_hb_pass",
    hospKey: "eq_hb_hosp",
  },
  {
    slug: "argentina-rafa",
    name: "Equipe Argentina",
    subtitle: "Rafa Morientes e Djalminha",
    passKey: "eq_ar_pass",
    hospKey: "eq_ar_hosp",
  },
  {
    slug: "inglaterra-vic",
    name: "Equipe Inglaterra",
    subtitle: "Vic Leite",
    passKey: "eq_ig_pass",
    hospKey: "eq_ig_hosp",
  },
  {
    slug: "portugal-joao",
    name: "Equipe Portugal",
    subtitle: "João Barretto",
    passKey: "eq_pt_pass",
    hospKey: "eq_pt_hosp",
  },
  {
    slug: "ibc",
    name: "IBC",
    passKey: "eq_ibc_pass",
    hospKey: "eq_ibc_hosp",
  },
  {
    slug: "brasil-defante",
    name: "Equipe Brasil",
    subtitle: "Defante",
    passKey: "eq_df_pass",
    hospKey: "eq_df_hosp",
  },
];

export function getEquipe(slug: string): Equipe | undefined {
  return EQUIPES.find((e) => e.slug === slug);
}

export function getEquipeSlugs(): string[] {
  return EQUIPES.filter((e) => !e.href).map((e) => e.slug);
}
