export type LocationCategory =
  | "rooftop"
  | "park"
  | "brazilian"
  | "sports_bar"
  | "observatory"
  | "torcida";

export type CostLevel = "free" | "$" | "$$" | "$$$" | "paid";
export type DayNight = "yes" | "warning" | "no";
export type PermitType = "none" | "nyc_mome" | "nj_municipal" | "venue_specific";
export type PermitStatus = "nao_aplica" | "nao_iniciado" | "solicitado" | "aprovado" | "negado";

export interface VenueOps {
  permitResponsavel: string;
  permitPrazo: string;
  permitStatus: PermitStatus;
  planoB: string;
  sinalInfo: string;
  energiaInfo: string;
  estacionamentoInfo: string;
}

export interface Venue {
  id: string;
  cityId: string;
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
  ops?: Partial<VenueOps>;
}

function defaultOps(permit: PermitType): VenueOps {
  if (permit === "none") {
    return {
      permitResponsavel: "Não aplicável (espaço público)",
      permitPrazo: "—",
      permitStatus: "nao_aplica",
      planoB: "A definir com produção local",
      sinalInfo: "A confirmar em visita técnica",
      energiaInfo: "A confirmar em visita técnica",
      estacionamentoInfo: "A confirmar em visita técnica",
    };
  }
  return {
    permitResponsavel: "Jurídico + produção local",
    permitPrazo: "A confirmar",
    permitStatus: "nao_iniciado",
    planoB: "A definir com produção local",
    sinalInfo: "A confirmar em visita técnica",
    energiaInfo: "A confirmar em visita técnica",
    estacionamentoInfo: "A confirmar em visita técnica",
  };
}

export function venueOps(venue: Venue): VenueOps {
  return { ...defaultOps(venue.permit), ...venue.ops };
}

export const VENUES: Venue[] = [
  // ── Belo Horizonte ──────────────────────────────────────
  {
    id: "somos-cruzeiro",
    cityId: "bh",
    name: "Bar Somos Cruzeiro",
    category: "torcida",
    address: "Av. Antônio Abrahão Caram, 850, São José, Belo Horizonte - MG",
    area: "São José · Belo Horizonte (entrada do Mineirão)",
    hours: "Funciona em dias de jogo — consultar horário",
    goodDay: "warning",
    goodNight: "yes",
    cost: "$",
    permit: "venue_specific",
    tips:
      "Fica praticamente na porta do Mineirão, na mesma avenida do estádio. Pega o clima da torcida chegando e saindo do jogo — no estilo das externas da CazéTV.",
  },
  {
    id: "bar-monumental",
    cityId: "bh",
    name: "Bar Monumental",
    category: "torcida",
    address: "Rua Coronel Pedro Paulo Penido, 495, Cidade Nova, Belo Horizonte - MG",
    area: "Cidade Nova · Belo Horizonte",
    hours: "Funciona em dias de jogo — consultar horário",
    goodDay: "warning",
    goodNight: "yes",
    cost: "$",
    permit: "venue_specific",
    tips:
      "Point tradicional da torcida cruzeirense, decoração esportiva e telões. Bom para captar a reação da torcida durante a partida.",
  },
  {
    id: "mirante-mangabeiras",
    cityId: "bh",
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
    cityId: "bh",
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
    id: "dezenove-zero-nove",
    cityId: "poa",
    name: "Dezenove Zero Nove",
    category: "torcida",
    address: "Av. Padre Cacique, 704, Praia de Belas, Porto Alegre - RS",
    area: "Praia de Belas · Porto Alegre (em frente ao Beira-Rio)",
    hours: "Funciona em dias de jogo — consultar horário",
    goodDay: "warning",
    goodNight: "yes",
    cost: "$",
    permit: "venue_specific",
    tips:
      "Bar bem em frente ao Beira-Rio — concentração colorada antes e depois do jogo, cenário direto para passagem ao vivo.",
  },
  {
    id: "mercado-publico-poa-locacao",
    cityId: "poa",
    name: "Mercado Público de Porto Alegre",
    category: "torcida",
    address: "Largo Jornalista Glênio Peres, 1, Centro, Porto Alegre - RS, 90020-050",
    area: "Centro Histórico · Porto Alegre",
    hours: "Seg–Sáb, horário comercial",
    goodDay: "yes",
    goodNight: "no",
    cost: "free",
    permit: "none",
    tips:
      "Ponto histórico cheio de movimento e cor local — ótimo para entrevistas de rua e captar o clima da cidade fora dos dias de jogo.",
  },
  {
    id: "churrasquita",
    cityId: "poa",
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
    cityId: "poa",
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
    id: "choperia-arena-brahma",
    cityId: "cwb",
    name: "Choperia Arena Brahma",
    category: "torcida",
    address: "Rua Buenos Aires, 1260, Água Verde, Curitiba - PR, 80250-070 (dentro do complexo da Arena da Baixada)",
    area: "Água Verde · Curitiba",
    hours: "Ter–Sex 17h30–23h30 · Sáb 11h45–23h30 · Dom 11h45–17h30 (horário especial em dia de jogo)",
    goodDay: "yes",
    goodNight: "yes",
    cost: "$$",
    permit: "venue_specific",
    tips:
      "Choperia oficial do Athletico dentro da própria arena, com vista para o campo — direto no coração da torcida rubro-negra.",
  },
  {
    id: "coxa-sports-bar",
    cityId: "cwb",
    name: "Coxa Sports Bar & Parrilla",
    category: "torcida",
    address: "Rua Ubaldino do Amaral, 37, Alto da Glória, Curitiba - PR, 80060-195 (dentro do complexo do Couto Pereira)",
    area: "Alto da Glória · Curitiba",
    hours: "Qua–Dom, incluindo dias de jogo do Coritiba (casa e fora) — consultar horário",
    goodDay: "yes",
    goodNight: "yes",
    cost: "$$",
    permit: "venue_specific",
    tips:
      "Bar oficial do Coritiba, aberto para o aniversário de 115 anos do clube, com decoração inspirada no estádio e mesas externas — direto na torcida coxa-branca.",
  },
  {
    id: "cartolas",
    cityId: "cwb",
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
    cityId: "cwb",
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
    id: "feira-calcadao-chapeco",
    cityId: "chapeco",
    name: "Feira Centro - Calçadão",
    category: "torcida",
    address: "Rua Benjamin Constant, 2, Centro, Chapecó - SC",
    area: "Centro · Chapecó",
    hours: "Feira: Qua e Sáb 7h–12h · Calçadão aberto o dia todo",
    goodDay: "yes",
    goodNight: "no",
    cost: "free",
    permit: "none",
    tips:
      "Feira e calçadão de pedestres no coração de Chapecó — bom para flagrantes de rua e entrevistas informais fora do horário de jogo.",
  },
  {
    id: "espetinho",
    cityId: "chapeco",
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
    cityId: "chapeco",
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
    id: "calcadao-riopreto",
    cityId: "riopreto",
    name: "Calçadão de São José do Rio Preto",
    category: "torcida",
    address: "Rua General Glicério, Centro, São José do Rio Preto - SP",
    area: "Centro · São José do Rio Preto",
    hours: "Seg–Sex 9h–18h · Sáb 9h–13h · Dom fechado",
    goodDay: "yes",
    goodNight: "no",
    cost: "free",
    permit: "none",
    tips:
      "Principal calçadão da cidade, ~20 mil pessoas por dia — ótimo para passagens de rua e captar o movimento popular.",
  },
  {
    id: "represa-municipal-locacao",
    cityId: "riopreto",
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

export const PERMIT_STATUS_LABEL: Record<
  PermitStatus,
  { label: string; tone: "green" | "amber" | "orange" | "red" | "gray" }
> = {
  nao_aplica: { label: "Não se aplica", tone: "gray" },
  nao_iniciado: { label: "Não iniciado", tone: "gray" },
  solicitado: { label: "Solicitado", tone: "amber" },
  aprovado: { label: "Aprovado", tone: "green" },
  negado: { label: "Negado", tone: "red" },
};

export const COST_LABEL: Record<CostLevel, string> = {
  free: "Gratuito",
  $: "Pago $",
  $$: "Pago $$",
  $$$: "Pago $$$",
  paid: "Pago",
};
