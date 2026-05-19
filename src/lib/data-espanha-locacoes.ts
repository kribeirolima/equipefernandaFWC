import type { LocationCategory, DayNight, CostLevel } from "@/lib/locations";

export type EspanhaPermit = "none" | "film_office" | "city_permit" | "venue_specific";

export const ESPANHA_PERMIT_LABEL: Record<
  EspanhaPermit,
  { label: string; tone: "green" | "amber" | "orange" }
> = {
  none:           { label: "Sem permit",           tone: "green" },
  film_office:    { label: "Film Office local",    tone: "amber" },
  city_permit:    { label: "Prefeitura local",     tone: "amber" },
  venue_specific: { label: "Negociar com o local", tone: "orange" },
};

export interface EspanhaVenueItem {
  id: string;
  name: string;
  category: LocationCategory;
  address: string;
  area: string;
  cidade: "chattanooga" | "atlanta" | "guadalajara";
  cidadeLabel: string;
  periodo: string;
  rating: number;
  reviewCount: string;
  hours: string;
  goodDay: DayNight;
  goodNight: DayNight;
  cost: CostLevel;
  costNote?: string;
  permit: EspanhaPermit;
  permitNote?: string;
  tips: string;
}

export const ESPANHA_VENUES: EspanhaVenueItem[] = [
  // ── Chattanooga 10–13 jun ─────────────────────────────────────
  {
    id: "cha-lookout",
    name: "Lookout Mountain Point Park",
    category: "park",
    address: "110 Point Park Rd, Lookout Mountain, TN 37350",
    area: "Lookout Mountain",
    cidade: "chattanooga",
    cidadeLabel: "Chattanooga",
    periodo: "10–13 jun",
    rating: 4.7,
    reviewCount: "8.500+",
    hours: "Diariamente 8h–17h (últimas entradas às 16h30)",
    goodDay: "yes",
    goodNight: "no",
    cost: "paid",
    costNote: "~$10/pessoa",
    permit: "venue_specific",
    permitNote: "National Park Service (NPS)",
    tips:
      "Vista panorâmica do Vale do Tennessee de 400m de altitude — ícone visual de Chattanooga. A 15 min do hotel de carro. Filmagens comerciais exigem autorização prévia com o NPS.",
  },
  {
    id: "cha-edwin-rooftop",
    name: "The Edwin Hotel — Bar & Terrace",
    category: "rooftop",
    address: "102 Walnut St, Chattanooga, TN 37403",
    area: "Downtown",
    cidade: "chattanooga",
    cidadeLabel: "Chattanooga",
    periodo: "10–13 jun",
    rating: 4.3,
    reviewCount: "600+",
    hours: "Seg–Qui 17h–23h · Sex–Sáb 17h–0h · Dom 12h–22h",
    goodDay: "warning",
    goodNight: "yes",
    cost: "paid",
    costNote: "Consumação mínima",
    permit: "venue_specific",
    permitNote: "Direto com The Edwin Hotel",
    tips:
      "Único rooftop-bar de referência no Downtown de Chattanooga. Vista do Rio Tennessee e das montanhas ao fundo. A 5 min do hotel a pé.",
  },
  {
    id: "cha-aquarium",
    name: "Tennessee Aquarium",
    category: "observatory",
    address: "1 Broad St, Chattanooga, TN 37402",
    area: "Downtown",
    cidade: "chattanooga",
    cidadeLabel: "Chattanooga",
    periodo: "10–13 jun",
    rating: 4.7,
    reviewCount: "16.000+",
    hours: "Diariamente 10h–18h",
    goodDay: "yes",
    goodNight: "no",
    cost: "paid",
    costNote: "~$35/pessoa",
    permit: "venue_specific",
    permitNote: "Direto com Tennessee Aquarium",
    tips:
      "Aquário mais reconhecido do Tennessee — visual único com tanques de água doce e marinha. A 12 min a pé do hotel. Exige contato antecipado para filmagem comercial.",
  },
  {
    id: "cha-honest-pint",
    name: "The Honest Pint",
    category: "sports_bar",
    address: "34 Patten Pkwy, Chattanooga, TN 37402",
    area: "Downtown",
    cidade: "chattanooga",
    cidadeLabel: "Chattanooga",
    periodo: "10–13 jun",
    rating: 4.3,
    reviewCount: "1.200+",
    hours: "Seg–Qui 11h–23h · Sex–Sáb 11h–0h · Dom 12h–22h",
    goodDay: "yes",
    goodNight: "yes",
    cost: "$",
    permit: "none",
    tips:
      "Pub do Downtown com múltiplas TVs para transmissão de jogos. A 10 min do hotel a pé. Alta energia da torcida local em dias de Copa.",
  },

  // ── Atlanta 13–25 jun ─────────────────────────────────────────
  {
    id: "atl-piedmont",
    name: "Piedmont Park",
    category: "park",
    address: "400 Park Dr NE, Atlanta, GA 30306",
    area: "Midtown",
    cidade: "atlanta",
    cidadeLabel: "Atlanta",
    periodo: "13–25 jun",
    rating: 4.8,
    reviewCount: "30.000+",
    hours: "Diariamente 6h–23h",
    goodDay: "yes",
    goodNight: "warning",
    cost: "free",
    permit: "film_office",
    permitNote: "Atlanta Film Office (atlantaga.gov)",
    tips:
      "Principal parque de Atlanta, a 10 min do hotel a pé. Vista do skyline de Midtown ao fundo — backdrop reconhecível. Muito frequentado em eventos de verão durante a Copa.",
  },
  {
    id: "atl-ponce-rooftop",
    name: "9 Mile Station — Ponce City Market",
    category: "rooftop",
    address: "675 Ponce De Leon Ave NE, Atlanta, GA 30308",
    area: "Old Fourth Ward",
    cidade: "atlanta",
    cidadeLabel: "Atlanta",
    periodo: "13–25 jun",
    rating: 4.4,
    reviewCount: "3.800+",
    hours: "Seg–Qui 17h–23h · Sex 15h–0h · Sáb 12h–0h · Dom 12h–22h",
    goodDay: "yes",
    goodNight: "yes",
    cost: "paid",
    costNote: "Consumação mínima",
    permit: "venue_specific",
    permitNote: "Direto com Ponce City Market",
    tips:
      "Rooftop icônico com vista de 360° do skyline de Atlanta. A 15 min do hotel de Uber. Uma das locações mais filmadas da cidade — reservar com antecedência.",
  },
  {
    id: "atl-fogodechao",
    name: "Fogo de Chão Atlanta (Buckhead)",
    category: "brazilian",
    address: "3101 Piedmont Rd NE, Atlanta, GA 30305",
    area: "Buckhead",
    cidade: "atlanta",
    cidadeLabel: "Atlanta",
    periodo: "13–25 jun",
    rating: 4.6,
    reviewCount: "4.500+",
    hours: "Seg–Qui 11h30–22h · Sex–Sáb 11h30–23h · Dom 11h–21h",
    goodDay: "yes",
    goodNight: "yes",
    cost: "$$$",
    permit: "none",
    tips:
      "Churrascaria gaúcha referência em Atlanta, no coração do Buckhead. A 15 min do hotel de Uber. Ambiente sofisticado — ótimo para conteúdo de brasilidade durante a Copa.",
  },
  {
    id: "atl-fado",
    name: "Fadó Irish Pub Atlanta",
    category: "sports_bar",
    address: "3035 Peachtree Rd NE, Atlanta, GA 30305",
    area: "Buckhead",
    cidade: "atlanta",
    cidadeLabel: "Atlanta",
    periodo: "13–25 jun",
    rating: 4.2,
    reviewCount: "3.500+",
    hours: "Seg–Sex 11h–2h · Sáb–Dom 10h–2h",
    goodDay: "yes",
    goodNight: "yes",
    cost: "$",
    permit: "none",
    tips:
      "Pub irlandês mais popular de Atlanta para futebol. Múltiplas TVs, abre cedo para jogos matinais. A 15 min do hotel de Uber. Energia alta em dias de Copa.",
  },
  {
    id: "atl-georgia-aquarium",
    name: "Georgia Aquarium",
    category: "observatory",
    address: "225 Baker St NW, Atlanta, GA 30313",
    area: "Downtown",
    cidade: "atlanta",
    cidadeLabel: "Atlanta",
    periodo: "13–25 jun",
    rating: 4.7,
    reviewCount: "45.000+",
    hours: "Seg–Sex 10h–17h · Sáb–Dom 9h–18h",
    goodDay: "yes",
    goodNight: "no",
    cost: "paid",
    costNote: "~$40/pessoa",
    permit: "venue_specific",
    permitNote: "Direto com Georgia Aquarium",
    tips:
      "Maior aquário do mundo — tubarões-baleia e cenários únicos. A 10 min do hotel de Uber. Localizado ao lado do Mercedes-Benz Stadium e do World of Coca-Cola. Agendamento antecipado obrigatório para filmagens.",
  },

  // ── Guadalajara 25–28 jun ─────────────────────────────────────
  {
    id: "gdl-colomos",
    name: "Parque Los Colomos",
    category: "park",
    address: "Av. Niños Héroes 2880, Providencia, Guadalajara, Jal.",
    area: "Providencia",
    cidade: "guadalajara",
    cidadeLabel: "Guadalajara",
    periodo: "25–28 jun",
    rating: 4.8,
    reviewCount: "16.000+",
    hours: "Diariamente 6h–18h",
    goodDay: "yes",
    goodNight: "no",
    cost: "free",
    permit: "city_permit",
    permitNote: "SIOP Jalisco (siop.jalisco.gob.mx)",
    tips:
      "Parque urbano com lago, trilhas e bosque. Bairro Providencia — seguro e próximo a Chapalita. A 10 min do hotel de Uber. Excelente luz natural para gravações externas.",
  },
  {
    id: "gdl-demetria-rooftop",
    name: "Hotel Demetria — Rooftop Bar",
    category: "rooftop",
    address: "Av. de la Paz 2349, Col. Americana, Guadalajara, Jal.",
    area: "Colonia Americana",
    cidade: "guadalajara",
    cidadeLabel: "Guadalajara",
    periodo: "25–28 jun",
    rating: 4.6,
    reviewCount: "1.200+",
    hours: "Seg–Dom 18h–1h",
    goodDay: "warning",
    goodNight: "yes",
    cost: "paid",
    costNote: "Consumação mínima (~$200 MXN)",
    permit: "venue_specific",
    permitNote: "Direto com Hotel Demetria",
    tips:
      "Melhor rooftop de Guadalajara, no bairro Americana. Vista do skyline de GDL. A 15 min do hotel de Uber. Ambiente sofisticado com coquetéis artesanais.",
  },
  {
    id: "gdl-cabanas",
    name: "Instituto Cultural Cabañas",
    category: "observatory",
    address: "Cabañas 8, Centro Histórico, Guadalajara, Jal.",
    area: "Centro Histórico",
    cidade: "guadalajara",
    cidadeLabel: "Guadalajara",
    periodo: "25–28 jun",
    rating: 4.8,
    reviewCount: "10.000+",
    hours: "Ter–Dom 10h–17h45",
    goodDay: "yes",
    goodNight: "no",
    cost: "paid",
    costNote: "~$80 MXN/pessoa",
    permit: "venue_specific",
    permitNote: "Direto com Instituto Cabañas",
    tips:
      "Patrimônio da Humanidade UNESCO. Afrescos de José Clemente Orozco no teto da cúpula central — visual único mundialmente. A 20 min do hotel de Uber. Autorização institucional prévia obrigatória para filmagem comercial.",
  },
  {
    id: "gdl-dublin",
    name: "The Dublin Pub Guadalajara",
    category: "sports_bar",
    address: "Av. México 3070, Guadalajara, Jal.",
    area: "Colonia Monraz",
    cidade: "guadalajara",
    cidadeLabel: "Guadalajara",
    periodo: "25–28 jun",
    rating: 4.2,
    reviewCount: "2.000+",
    hours: "Seg–Dom 13h–2h",
    goodDay: "yes",
    goodNight: "yes",
    cost: "$",
    permit: "none",
    tips:
      "Pub de referência em Guadalajara para transmissão de jogos internacionais. Copa do Mundo transmitida em múltiplas telas. A 10 min do hotel de Uber. Alta energia em dias de jogo.",
  },
];
