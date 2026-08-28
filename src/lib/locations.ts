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
  rating?: number;
  reviewCount?: string;
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
  // ── Belo Horizonte ──────────────────────────────────────
  {
    id: "no-alto",
    name: "No Alto",
    category: "rooftop",
    address: "Rua dos Tamóios, 200, 24º andar, Centro, Belo Horizonte - MG, 30120-050",
    area: "Centro · Belo Horizonte",
    hours: "Funciona como lounge/balada com DJs — consultar redes sociais",
    goodDay: "no",
    goodNight: "yes",
    cost: "$$",
    permit: "venue_specific",
    tips:
      "Rooftop mais tradicional de BH (ex-Top Bar, 60 anos de história), no 24º andar do Edifício Central, no hipercentro. Vista panorâmica principal da cidade — ótimo para captar o skyline à noite.",
  },
  {
    id: "mirante-mangabeiras",
    name: "Mirante do Mangabeiras",
    category: "park",
    address: "Rua Pedro José Pardo, 1.000, Mangabeiras, Belo Horizonte - MG",
    area: "Mangabeiras · Belo Horizonte",
    hours: "Ter–Qua 8h–18h · Qui–Dom 8h–21h · Seg fechado (manutenção)",
    goodDay: "yes",
    goodNight: "warning",
    cost: "free",
    permit: "none",
    tips:
      "Um dos mirantes mais icônicos de BH, com vista panorâmica gratuita da cidade. Entrada permitida até 30 min antes do fechamento.",
  },
  {
    id: "xapuri",
    name: "Restaurante Xapuri",
    category: "brazilian",
    address: "R. Mandacaru, 260, Trevo/Pampulha, Belo Horizonte - MG",
    area: "Pampulha · Belo Horizonte",
    hours: "Consultar horário de funcionamento",
    goodDay: "yes",
    goodNight: "yes",
    cost: "$$",
    permit: "venue_specific",
    tips:
      "Referência da culinária mineira em BH, decoração rústica típica. Boa opção para conteúdo gastronômico regional.",
  },

  // ── Porto Alegre ─────────────────────────────────────────
  {
    id: "tetto-poa",
    name: "Tetto POA",
    category: "rooftop",
    address: "R. Caldas Júnior, 11, 9º andar (Xtay), Centro Histórico, Porto Alegre - RS",
    area: "Centro Histórico · Porto Alegre",
    hours: "Qua–Sáb 17h–3h · Dom 17h–0h",
    goodDay: "no",
    goodNight: "yes",
    cost: "$$$",
    permit: "venue_specific",
    tips:
      "Rooftop mais novo de Porto Alegre, com plataforma de vidro suspensa (SkyGlass) e vista para o pôr do sol no Guaíba. Reserva antecipada recomendada — inaugurado recentemente, poucas avaliações ainda.",
  },
  {
    id: "churrasquita",
    name: "Churrasquita",
    category: "brazilian",
    address: "Rua Riachuelo, 1331, Centro Histórico, Porto Alegre - RS",
    area: "Centro Histórico · Porto Alegre",
    hours: "Ter–Dom 11h–15h · Ter–Sex 18h–23h",
    goodDay: "yes",
    goodNight: "yes",
    cost: "$$",
    permit: "venue_specific",
    tips: "Churrascaria rodízio tradicional no Centro Histórico, boa opção para grupos grandes.",
  },
  {
    id: "parque-marinha-poa",
    name: "Parque Marinha do Brasil",
    category: "park",
    address: "Av. Borges de Medeiros, 2035, Porto Alegre - RS, 90110-150",
    area: "Praia de Belas · Porto Alegre",
    hours: "Área aberta ao público",
    goodDay: "yes",
    goodNight: "warning",
    cost: "free",
    permit: "none",
    tips:
      "A poucos minutos a pé do hotel da equipe em Porto Alegre. Orla do Guaíba, bom para captações ao ar livre durante o dia.",
  },

  // ── Curitiba ─────────────────────────────────────────────
  {
    id: "gards-rooftop",
    name: "Gards Rooftop",
    category: "rooftop",
    address: "Rua Comendador Macedo, 630, 11º andar, Centro, Curitiba - PR",
    area: "Alto da Glória · Curitiba",
    rating: 4.4,
    hours: "Almoço executivo, happy hour e noite — consultar redes sociais",
    goodDay: "yes",
    goodNight: "yes",
    cost: "$$$",
    permit: "venue_specific",
    tips:
      "Um dos rooftops mais bem avaliados de Curitiba (citado entre os 100 melhores bares do Brasil pela Exame), vista de 360° com a Serra do Mar ao fundo.",
  },
  {
    id: "cartolas",
    name: "Cartolas Sports Bar",
    category: "sports_bar",
    address: "Rua Emiliano Perneta, 880, Batel, Curitiba - PR",
    area: "Batel · Curitiba",
    rating: 4.4,
    hours: "Consultar horário de funcionamento",
    goodDay: "yes",
    goodNight: "yes",
    cost: "$$",
    permit: "venue_specific",
    tips:
      "Bar esportivo tradicional de Curitiba desde 2011, referência para transmissão de jogos — telas grandes, ambiente descontraído.",
  },
  {
    id: "jardim-botanico-cwb",
    name: "Jardim Botânico de Curitiba",
    category: "park",
    address: "R. Eng. Ostoja Roguski, s/n, Jardim Botânico, Curitiba - PR, 80210-390",
    area: "Jardim Botânico · Curitiba",
    hours: "Diariamente, aprox. 6h–20h",
    goodDay: "yes",
    goodNight: "no",
    cost: "free",
    permit: "none",
    tips:
      "Cartão-postal mais famoso de Curitiba — estufa de vidro no estilo art nouveau. Ótima luz natural pela manhã.",
  },

  // ── Chapecó ──────────────────────────────────────────────
  {
    id: "espetinho",
    name: "Espetiño",
    category: "brazilian",
    address: "Av. Getúlio Vargas, 1520, Centro, Chapecó - SC",
    area: "Centro · Chapecó",
    hours: "Consultar horário de funcionamento",
    goodDay: "yes",
    goodNight: "yes",
    cost: "$$",
    permit: "venue_specific",
    tips:
      "Casa tradicional de culinária gaúcha em Chapecó — espetos e carnes na brasa. Boa opção informal para gravações de grupo.",
  },
  {
    id: "parque-palmeiras-locacao",
    name: "Parque das Palmeiras",
    category: "park",
    address: "Rua Marechal Mascarenhas de Moraes, Parque das Palmeiras, Chapecó - SC",
    area: "Parque das Palmeiras · Chapecó",
    hours: "Área aberta ao público",
    goodDay: "yes",
    goodNight: "no",
    cost: "free",
    permit: "none",
    tips:
      "Maior área verde do bairro, ~5 km do Centro. Estrutura simples, mas com área arborizada ampla para externas.",
  },

  // ── São José do Rio Preto / Mirassol ────────────────────
  {
    id: "salsa-rooftop",
    name: "Salsa Rooftop",
    category: "rooftop",
    address: "Av. Pres. Juscelino K. de Oliveira, 2000, Jardim Tarraf II, São José do Rio Preto - SP",
    area: "Jardim Tarraf II · São José do Rio Preto",
    rating: 4.2,
    hours: "Pôr do sol com DJ aos domingos — consultar horário",
    goodDay: "warning",
    goodNight: "yes",
    cost: "$$$",
    permit: "venue_specific",
    tips:
      "Principal rooftop da cidade, no terraço do Duo JK. Steakhouse com drinks autorais, boa opção para captar o pôr do sol.",
  },
  {
    id: "represa-municipal-locacao",
    name: "Parque da Represa Municipal",
    category: "park",
    address: "Av. Lino José de Seixas, 1000, Jardim dos Seixas, São José do Rio Preto - SP, 15061-000",
    area: "Jardim dos Seixas · São José do Rio Preto",
    hours: "Área aberta ao público",
    goodDay: "yes",
    goodNight: "warning",
    cost: "free",
    permit: "none",
    tips: "Um dos cartões-postais de Rio Preto — represa com pista de caminhada e área verde ampla.",
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
