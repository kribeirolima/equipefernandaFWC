export type LocationCategory =
  | "rooftop"
  | "park"
  | "brazilian"
  | "sports_bar"
  | "observatory";

export type CostLevel = "free" | "$" | "$$" | "$$$" | "paid";
export type DayNight = "yes" | "warning" | "no";
export type PermitType = "none" | "nyc_mome" | "nj_municipal" | "venue_specific";

export interface Venue {
  id: string;
  name: string;
  category: LocationCategory;
  address: string;
  area: string;
  rating: number;
  reviewCount: string;
  hours: string;
  goodDay: DayNight;
  goodNight: DayNight;
  cost: CostLevel;
  costNote?: string;
  permit: PermitType;
  permitNote?: string;
  tips: string;
}

export const VENUES: Venue[] = [
  // ── Rooftops ────────────────────────────────────────────
  {
    id: "230fifth",
    name: "230 Fifth Rooftop Bar",
    category: "rooftop",
    address: "1150 Broadway, Manhattan, NY 10001",
    area: "Manhattan",
    rating: 4.3,
    reviewCount: "25.000+",
    hours: "Seg–Sex 12h–1h · Sáb 11h–4h · Dom 11h–1h",
    goodDay: "yes",
    goodNight: "yes",
    cost: "paid",
    costNote: "Consumação mínima",
    permit: "nyc_mome",
    tips:
      "Vista direta do Empire State Building. Possui iglus aquecidos no inverno. Um dos rooftops mais filmados de NYC.",
  },
  {
    id: "refinery",
    name: "Refinery Rooftop",
    category: "rooftop",
    address: "63 W 38th St, Manhattan, NY 10018",
    area: "Manhattan",
    rating: 4.5,
    reviewCount: "4.300+",
    hours: "Seg 11h30–23h · Ter–Qui 11h30–1h · Sex–Sáb 10h30–2h · Dom 10h30–23h",
    goodDay: "yes",
    goodNight: "yes",
    cost: "$$",
    permit: "nyc_mome",
    tips:
      "Mais elegante e íntimo que o 230 Fifth. Vista do Empire State. Ótimo para brunch e pôr do sol.",
  },
  {
    id: "lostparadise",
    name: "Lost in Paradise Rooftop",
    category: "rooftop",
    address: "11-01 43rd Ave, Long Island City, Queens, NY 11101",
    area: "Queens",
    rating: 4.7,
    reviewCount: "6.600+",
    hours: "Ter/Qui 17h–22h · Sex 17h–4h · Sáb 13h–4h · Dom 13h–22h · Fecha Seg/Qua",
    goodDay: "warning",
    goodNight: "yes",
    cost: "$",
    costNote: "Sáb/Dom abre 13h",
    permit: "nyc_mome",
    tips:
      "Vista panorâmica de Midtown a partir de LIC. Melhor no pôr do sol. Atmosfera latina, hookah disponível.",
  },
  {
    id: "nohu",
    name: "NoHu Rooftop Bar",
    category: "rooftop",
    address: "550 Ave at Port Imperial, Weehawken, NJ 07086",
    area: "Weehawken NJ",
    rating: 4.0,
    reviewCount: "1.900+",
    hours: "Seg–Qui 17h–23h · Sex–Sáb 17h–0h · Dom 17h–23h",
    goodDay: "yes",
    goodNight: "yes",
    cost: "paid",
    permit: "nj_municipal",
    permitNote: "Município de Weehawken",
    tips:
      "Uma das melhores vistas de Manhattan a partir de NJ. Direto na beira do rio Hudson. 3 min da NJ Light Rail.",
  },
  {
    id: "rooftop_exchange",
    name: "RoofTop at Exchange Place",
    category: "rooftop",
    address: "1st St #1, Jersey City, NJ 07302",
    area: "Jersey City NJ",
    rating: 4.2,
    reviewCount: "3.400+",
    hours: "Seg–Qui 16h–23h · Sex–Sáb 16h–2h · Dom 16h–23h",
    goodDay: "yes",
    goodNight: "yes",
    cost: "$",
    permit: "nj_municipal",
    permitNote: "Cidade de Jersey City",
    tips:
      "Vista panorâmica do Lower Manhattan e do skyline a partir de Jersey City. Elevator temático para subir.",
  },
  {
    id: "hudson_co",
    name: "Hudson & Co.",
    category: "rooftop",
    address: "3 2nd St, Jersey City, NJ 07302",
    area: "Jersey City NJ",
    rating: 4.2,
    reviewCount: "2.300+",
    hours: "Seg 12h–23h · Ter–Qui 12h–0h · Sex–Sáb 12h–1h · Dom 12h–23h",
    goodDay: "yes",
    goodNight: "yes",
    cost: "$$$",
    permit: "nj_municipal",
    permitNote: "Cidade de Jersey City",
    tips:
      "Bar e restaurante na orla com vista direta do skyline de Manhattan. Boa comida, ambiente vibrante.",
  },

  // ── Parques ─────────────────────────────────────────────
  {
    id: "hoboken_waterfront",
    name: "Hoboken Waterfront",
    category: "park",
    address: "Sinatra Dr, Hoboken, NJ 07030",
    area: "Hoboken NJ",
    rating: 4.9,
    reviewCount: "555",
    hours: "Aberto ao público (orla)",
    goodDay: "yes",
    goodNight: "warning",
    cost: "free",
    permit: "nj_municipal",
    permitNote: "Cidade de Hoboken — uso comercial",
    tips:
      "Vista do skyline inteiro de Manhattan. Perfeito para pôr do sol. A 5 min do PATH Hoboken. Um dos locais mais fotografados de NJ.",
  },
  {
    id: "weehawken_park",
    name: "Weehawken Waterfront Park",
    category: "park",
    address: "1 Port Imperial Blvd, Weehawken, NJ 07086",
    area: "Weehawken NJ",
    rating: 4.7,
    reviewCount: "1.400+",
    hours: "Seg–Dom 7h–22h",
    goodDay: "yes",
    goodNight: "warning",
    cost: "free",
    permit: "nj_municipal",
    permitNote: "Município de Weehawken",
    tips:
      "Vista privilegiada de Midtown Manhattan. Trilhas, bancos e área de esportes. Ótima luz natural durante o dia.",
  },
  {
    id: "pershing_circle",
    name: "Weehawken Pershing Circle",
    category: "park",
    address: "Weehawken Township, NJ 07086",
    area: "Weehawken NJ",
    rating: 4.8,
    reviewCount: "33",
    hours: "Seg–Dom 6h–22h",
    goodDay: "yes",
    goodNight: "no",
    cost: "free",
    permit: "nj_municipal",
    permitNote: "Município de Weehawken",
    tips:
      "Mirante menor e mais tranquilo. Vista ao norte do skyline. Bom para gravações mais intimistas durante o dia.",
  },

  // ── Lugares brasileiros ─────────────────────────────────
  {
    id: "berimbau",
    name: "Berimbau Brazilian Table",
    category: "brazilian",
    address: "3 W 36th St, Manhattan, NY 10018",
    area: "Manhattan",
    rating: 4.7,
    reviewCount: "650",
    hours: "Seg–Sex 11h30–15h e 16h–22h · Sáb 11h30–22h30 · Dom 11h30–21h30",
    goodDay: "yes",
    goodNight: "yes",
    cost: "paid",
    permit: "none",
    tips:
      "Restaurante brasileiro autêntico. Música ao vivo aos domingos. Ambiente moderno e elegante. Ótima opção para entrada ao vivo com vibe brasileira.",
  },
  {
    id: "fogo",
    name: "Fogo de Chão",
    category: "brazilian",
    address: "40 W 53rd St, New York, NY 10019",
    area: "Manhattan",
    rating: 4.5,
    reviewCount: "9.900+",
    hours: "Seg–Qui 11h30–22h30 · Sex–Sáb 11h30–23h · Dom 11h30–22h",
    goodDay: "yes",
    goodNight: "yes",
    cost: "$$$",
    permit: "none",
    tips:
      "Churrascaria brasileira de renome internacional. Ambiente elegante. Almoço a partir de $20 (market table). Ótima para conteúdo gastronômico.",
  },
  {
    id: "plataforma",
    name: "Churrascaria Plataforma",
    category: "brazilian",
    address: "316 W 49th St, New York, NY 10019",
    area: "Manhattan · Hell's Kitchen",
    rating: 4.5,
    reviewCount: "4.100+",
    hours:
      "Seg–Ter 16h30–21h · Qua–Qui 16h30–21h30 · Sex–Sáb 12h–22h30 · Dom 12h–21h",
    goodDay: "warning",
    goodNight: "yes",
    cost: "$$$",
    costNote: "Almoço só sex–dom",
    permit: "none",
    tips:
      "Primeira churrascaria brasileira autêntica de Manhattan (desde 1996). Ambiente festivo, ótimo para grupos grandes. Rodízio tradicional.",
  },

  // ── Sports bars ─────────────────────────────────────────
  {
    id: "smithfield",
    name: "Smithfield Hall",
    category: "sports_bar",
    address: "138 W 25th St, Manhattan, NY 10001",
    area: "Manhattan",
    rating: 4.4,
    reviewCount: "1.800+",
    hours: "Seg–Sex 12h–0h · Sáb 9h–0h · Dom 10h–0h",
    goodDay: "yes",
    goodNight: "yes",
    cost: "$",
    costNote: "Eventos podem cobrar ingresso (+drinks)",
    permit: "none",
    tips:
      "Muito popular para futebol (soccer) e UFC. Chegue cedo em dias de jogos importantes. Ótima energia e atmosfera.",
  },
  {
    id: "mustang",
    name: "Mustang Harry's",
    category: "sports_bar",
    address: "352 7th Ave, Manhattan, NY 10001",
    area: "Manhattan · Madison Square Garden",
    rating: 4.4,
    reviewCount: "2.500+",
    hours: "Seg–Sáb 11h30–3h · Dom 11h30–1h",
    goodDay: "yes",
    goodNight: "yes",
    cost: "$",
    permit: "none",
    tips:
      "Ao lado do Madison Square Garden. Energia máxima em dias de NBA/NHL. Grande variedade de TVs. Tradicional de Midtown.",
  },

  // ── Observatórios ───────────────────────────────────────
  {
    id: "topoftherock",
    name: "Top of The Rock",
    category: "observatory",
    address: "30 Rockefeller Plaza, New York, NY 10112",
    area: "Manhattan",
    rating: 4.7,
    reviewCount: "81.900+",
    hours: "Todos os dias 8h–0h",
    goodDay: "yes",
    goodNight: "yes",
    cost: "paid",
    costNote: "~$40–50/pessoa",
    permit: "venue_specific",
    permitNote: "Direto com Rockefeller Center",
    tips:
      "Vista 360° incluindo Central Park ao norte e Downtown ao sul. Melhor horário: 17h+ para pegar dia + pôr do sol + noite. Reservar com antecedência.",
  },
  {
    id: "summit",
    name: "SUMMIT One Vanderbilt",
    category: "observatory",
    address: "45 E 42nd St, New York, NY 10017",
    area: "Manhattan",
    rating: 4.7,
    reviewCount: "33.900+",
    hours: "Seg–Qua/Sex–Dom 9h–0h · Qui 9h–22h",
    goodDay: "yes",
    goodNight: "yes",
    cost: "paid",
    costNote: "~$45/pessoa",
    permit: "venue_specific",
    permitNote: "Direto com SUMMIT",
    tips:
      "Observatório mais moderno e imersivo de NYC. Instalações artísticas com espelhos e vidro. Melhor horário: 8h (sem fila) ou após 19h.",
  },
];

export const PERMIT_LABEL: Record<
  PermitType,
  { label: string; tone: "green" | "amber" | "orange" }
> = {
  none: { label: "Sem permit", tone: "green" },
  nyc_mome: { label: "NYC MOME", tone: "amber" },
  nj_municipal: { label: "Município NJ", tone: "amber" },
  venue_specific: { label: "Negociar com o local", tone: "orange" },
};

export const COST_LABEL: Record<CostLevel, string> = {
  free: "Gratuito",
  $: "Pago $",
  $$: "Pago $$",
  $$$: "Pago $$$",
  paid: "Pago",
};
