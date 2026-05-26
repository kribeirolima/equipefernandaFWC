import type { LocationCategory, DayNight, CostLevel } from "@/lib/locations";

export type ArgentinaLocPermit = "none" | "film_office" | "venue_specific";

export const ARGENTINA_LOC_PERMIT_LABEL: Record<
  ArgentinaLocPermit,
  { label: string; tone: "green" | "amber" | "orange" }
> = {
  none:           { label: "Sem permit",           tone: "green"  },
  film_office:    { label: "Film Office local",    tone: "amber"  },
  venue_specific: { label: "Negociar com o local", tone: "orange" },
};

export interface ArgentinaVenueItem {
  id: string;
  name: string;
  category: LocationCategory;
  address: string;
  area: string;
  cidade: "kansas-city" | "dallas";
  cidadeLabel: string;
  periodo: string;
  rating: number;
  reviewCount: string;
  hours: string;
  goodDay: DayNight;
  goodNight: DayNight;
  cost: CostLevel;
  costNote?: string;
  permit: ArgentinaLocPermit;
  permitNote?: string;
  tips: string;
}

export const ARGENTINA_VENUES: ArgentinaVenueItem[] = [

  // ── Kansas City · 10–21 jun ───────────────────────────────────
  {
    id: "kc-liberty-memorial",
    name: "National WWI Museum & Memorial",
    category: "observatory",
    address: "2 Memorial Dr, Kansas City, MO 64108",
    area: "Crown Center / Downtown",
    cidade: "kansas-city",
    cidadeLabel: "Kansas City MO",
    periodo: "10–21 jun",
    rating: 4.8,
    reviewCount: "18.000+",
    hours: "Seg–Dom 10h–17h (torre encerra 16h30)",
    goodDay: "yes",
    goodNight: "warning",
    cost: "$",
    costNote: "Entrada museu + torre: ~$18. Tower-only: ~$8.",
    permit: "film_office",
    permitNote: "Kansas City Film Office (filmkc.com) para filmagem comercial em espaços externos.",
    tips:
      "A Liberty Memorial oferece o melhor panorama do skyline de Kansas City — perfila o horizonte completo com o Union Station no primeiro plano. A 10 min de carro do Hotel Phillips. Visual inédito para entradas ao vivo da Copa. Evitar nos 30 min antes do fechamento.",
  },
  {
    id: "kc-power-light",
    name: "Power & Light District",
    category: "sports_bar",
    address: "1336 Grand Blvd, Kansas City, MO 64106",
    area: "Downtown / Power & Light",
    cidade: "kansas-city",
    cidadeLabel: "Kansas City MO",
    periodo: "10–21 jun",
    rating: 4.3,
    reviewCount: "12.000+",
    hours: "Seg–Qui 11h–00h · Sex–Sáb 11h–02h · Dom 11h–22h",
    goodDay: "warning",
    goodNight: "yes",
    cost: "free",
    costNote: "Área pública gratuita; consumação nos bares e restaurantes à parte.",
    permit: "film_office",
    permitNote: "Permissão via Kansas City Film Office para câmeras na via pública.",
    tips:
      "O hub de entretenimento de KC com telões gigantes e dezenas de bares temáticos — ambiente Copa garantido nos dias de jogo. A 5 min a pé do Hotel Phillips. Ideal para coberturas noturnas e reações do torcedor. Alta concentração de fans durante a Copa.",
  },
  {
    id: "kc-one-hotel-rooftop",
    name: "1 Hotel Kansas City — Rooftop Pool Bar",
    category: "rooftop",
    address: "1515 Wyandotte St, Kansas City, MO 64108",
    area: "Crown Center / Downtown",
    cidade: "kansas-city",
    cidadeLabel: "Kansas City MO",
    periodo: "10–21 jun",
    rating: 4.6,
    reviewCount: "3.200+",
    hours: "Ter–Qui 16h–22h · Sex–Sáb 12h–23h · Dom 12h–20h",
    goodDay: "warning",
    goodNight: "yes",
    cost: "$$$",
    costNote: "Consumação mínima; acesso requer reserva. Contato comercial para uso editorial.",
    permit: "venue_specific",
    permitNote: "Negociar diretamente com o hotel — taxa de locação para gravação comercial.",
    tips:
      "Rooftop com piscina e vista panorâmica de KC — backdrop sofisticado para entradas ao vivo ou entrevistas. A 7 min a pé do Hotel Phillips. Acesso normalmente restrito a hóspedes; negociar com a gerência de eventos para uso editorial durante a Copa.",
  },
  {
    id: "kc-fogo-de-chao",
    name: "Fogo de Chão Kansas City",
    category: "brazilian",
    address: "4921 Main St, Kansas City, MO 64112",
    area: "Country Club Plaza",
    cidade: "kansas-city",
    cidadeLabel: "Kansas City MO",
    periodo: "10–21 jun",
    rating: 4.5,
    reviewCount: "5.800+",
    hours: "Seg–Qui 11h30–21h · Sex–Sáb 11h30–22h · Dom 11h30–21h",
    goodDay: "yes",
    goodNight: "yes",
    cost: "$$$",
    permit: "venue_specific",
    permitNote: "Contato com gerência para autorização de câmera no salão.",
    tips:
      "Churrascaria brasileira premium no Country Club Plaza — ambiente reconhecível para o público do Brasil. A 10 min de carro do hotel. Ótimo para almoços de delegação ou gravações gastronômicas. Reservar mesa com antecedência durante a Copa.",
  },
  {
    id: "kc-crossroads",
    name: "Crossroads Arts District",
    category: "park",
    address: "18th & Wyandotte St, Kansas City, MO 64108",
    area: "Crossroads Arts District",
    cidade: "kansas-city",
    cidadeLabel: "Kansas City MO",
    periodo: "10–21 jun",
    rating: 4.4,
    reviewCount: "9.000+",
    hours: "24h (área pública)",
    goodDay: "yes",
    goodNight: "yes",
    cost: "free",
    permit: "film_office",
    permitNote: "Kansas City Film Office para filmagem comercial na via pública.",
    tips:
      "Bairro artístico com murais coloridos e ruas vibrantes — visual urbano autêntico de KC. A 5 min de carro do Hotel Phillips. Excelente para externas dinâmicas e gravações de passagem. Vida noturna ativa nos fins de semana.",
  },

  // ── Dallas · 21 jun–01 jul ────────────────────────────────────
  {
    id: "dal-reunion-tower",
    name: "Reunion Tower GeO-Deck",
    category: "observatory",
    address: "300 Reunion Blvd E, Dallas, TX 75207",
    area: "West End / Downtown",
    cidade: "dallas",
    cidadeLabel: "Dallas TX",
    periodo: "21 jun–01 jul",
    rating: 4.6,
    reviewCount: "32.000+",
    hours: "Dom–Qui 11h–21h · Sex–Sáb 11h–22h (última subida 1h antes do fechamento)",
    goodDay: "yes",
    goodNight: "yes",
    cost: "$",
    costNote: "Adulto: ~$26. Desconto online. Verificar promoções Copa.",
    permit: "venue_specific",
    permitNote: "Contato com Hyatt/Reunion Tower Events para filmagem comercial.",
    tips:
      "O miradouro mais icônico de Dallas — vista 360° do skyline completo. A 5 min de carro do Residence Inn. Imprescindível para aberturas e créditos com skyline de Dallas. À noite, a esfera luminosa é um backdrop inconfundível. Reservar com antecedência em semanas de jogo.",
  },
  {
    id: "dal-klyde-warren",
    name: "Klyde Warren Park",
    category: "park",
    address: "2012 Woodall Rodgers Fwy, Dallas, TX 75201",
    area: "Arts District / Downtown",
    cidade: "dallas",
    cidadeLabel: "Dallas TX",
    periodo: "21 jun–01 jul",
    rating: 4.7,
    reviewCount: "28.000+",
    hours: "Seg–Qui 06h–22h · Sex–Sáb 06h–23h · Dom 06h–22h",
    goodDay: "yes",
    goodNight: "warning",
    cost: "free",
    permit: "film_office",
    permitNote: "Dallas Film Commission (filmdallas.com) para filmagem comercial no parque.",
    tips:
      "Parque suspenso sobre a freeway com gramado, food trucks e eventos frequentes — coração verde do downtown Dallas. A 10 min a pé do Residence Inn. Espaço ideal para externas descontraídas e entrevistas ao ar livre. Durante a Copa, provável ponto de encontro de torcedores.",
  },
  {
    id: "dal-monarch-rooftop",
    name: "Monarch — Virgin Hotels Dallas",
    category: "rooftop",
    address: "1445 Turtle Creek Blvd, Dallas, TX 75207",
    area: "Turtle Creek / Uptown",
    cidade: "dallas",
    cidadeLabel: "Dallas TX",
    periodo: "21 jun–01 jul",
    rating: 4.5,
    reviewCount: "4.100+",
    hours: "Ter–Qui 17h–00h · Sex 17h–01h · Sáb 14h–01h · Dom 14h–22h",
    goodDay: "no",
    goodNight: "yes",
    cost: "$$$",
    costNote: "Consumação mínima; reserva necessária. Tarifa editorial a negociar.",
    permit: "venue_specific",
    permitNote: "Negociar com gerência de eventos do Virgin Hotels Dallas.",
    tips:
      "Rooftop exclusivo com vista para o skyline de Dallas e piscina — referência de sofisticação no Uptown. A 10 min de carro do Residence Inn. Perfeito para entrevistas VIP ou entradas ao vivo noturnas com backdrop urbano de alta qualidade. Reservar com antecedência.",
  },
  {
    id: "dal-texas-de-brazil",
    name: "Texas de Brazil Dallas",
    category: "brazilian",
    address: "2727 Cedar Springs Rd, Dallas, TX 75201",
    area: "Cedar Springs / Uptown",
    cidade: "dallas",
    cidadeLabel: "Dallas TX",
    periodo: "21 jun–01 jul",
    rating: 4.5,
    reviewCount: "9.400+",
    hours: "Seg–Sex 11h30–22h · Sáb 11h30–22h30 · Dom 11h–21h",
    goodDay: "yes",
    goodNight: "yes",
    cost: "$$$",
    permit: "venue_specific",
    permitNote: "Contato com gerência do restaurante para autorização editorial.",
    tips:
      "Rodízio de churrasco brasileiro premium no Uptown — espaço amplo e decoração que remete ao Brasil. A 8 min de carro do Residence Inn. Ótimo para gravações gastronômicas e encontros com a torcida brasileira em Dallas. Reservar com antecedência para grupos.",
  },
  {
    id: "dal-the-rustic",
    name: "The Rustic Dallas",
    category: "sports_bar",
    address: "3656 Howell St, Dallas, TX 75204",
    area: "Uptown / Knox-Henderson",
    cidade: "dallas",
    cidadeLabel: "Dallas TX",
    periodo: "21 jun–01 jul",
    rating: 4.4,
    reviewCount: "14.000+",
    hours: "Seg–Qui 11h–00h · Sex 11h–02h · Sáb 10h–02h · Dom 10h–22h",
    goodDay: "yes",
    goodNight: "yes",
    cost: "free",
    costNote: "Entrada gratuita; consumação à parte.",
    permit: "film_office",
    permitNote: "Dallas Film Commission para externas na área pública adjacente.",
    tips:
      "Bar e espaço ao ar livre com palco, telões e ambiente country-urbano — ponto de encontro de locais em dias de jogo. A 10 min de carro do Residence Inn. Telões e espaço externo amplo criam atmosfera de torcida. Verificar programação de Copa no site antes do dia de cobertura.",
  },
];
