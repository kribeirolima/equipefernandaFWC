export type Difficulty = "facil" | "moderado" | "dificil";

export interface ArgentinaRoute {
  destino: string;
  endereco: string;
  carN: string;
  carH: string;
  tp: string;
  dist: string;
  diff: Difficulty;
  mapsUrl: string;
}

export interface ArgentinaBase {
  id: string;
  emoji: string;
  cidade: string;
  periodo: string;
  hotel: string;
  hotelAddr: string;
  nota?: string;
  fuso?: string;
  referenciaLabel?: string;
  referenciaAddr?: string;
  routes: ArgentinaRoute[];
  transitoInfo?: string[];
  insights: string[];
}

export const ARGENTINA_BASES: ArgentinaBase[] = [

  // ── BASE 1 — Kansas City, MO · 10–21 jun ────────────────────────
  {
    id: "kansas-city",
    emoji: "🏟️",
    cidade: "Kansas City MO",
    periodo: "10–21 jun",
    hotel: "Hotel Phillips Kansas City",
    hotelAddr: "106 W 12th St, Kansas City, MO 64105",
    nota: "Centro histórico de KC. Valet disponível no hotel. Power & Light District a 5 min a pé — entretenimento noturno central.",
    fuso: "CDT (UTC -5h) · BRT = CDT +2h",
    referenciaLabel: "Estádio Copa: GEHA Field at Arrowhead",
    referenciaAddr: "1 Arrowhead Dr, Kansas City, MO 64129",
    routes: [
      {
        destino: "GEHA Field at Arrowhead",
        endereco: "1 Arrowhead Dr, Kansas City, MO 64129",
        carN: "20 min",
        carH: "35–50 min",
        tp: "Sem transporte público direto — Uber obrigatório",
        dist: "18 km",
        diff: "moderado",
        mapsUrl: "https://maps.google.com/?saddr=106+W+12th+St,+Kansas+City,+MO&daddr=1+Arrowhead+Dr,+Kansas+City,+MO+64129",
      },
      {
        destino: "MCI Airport",
        endereco: "1 Kansas City Terminal Dr, Kansas City, MO 64153",
        carN: "25 min",
        carH: "35–40 min",
        tp: "KCI Shuttle / Uber ~25 min / $30–45",
        dist: "26 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=106+W+12th+St,+Kansas+City,+MO&daddr=1+Kansas+City+Terminal+Dr,+Kansas+City,+MO+64153",
      },
      {
        destino: "Union Station KC",
        endereco: "30 W Pershing Rd, Kansas City, MO 64108",
        carN: "4 min",
        carH: "8 min",
        tp: "RideKC Streetcar 8 min / grátis · A pé 12 min",
        dist: "1,5 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=106+W+12th+St,+Kansas+City,+MO&daddr=30+W+Pershing+Rd,+Kansas+City,+MO+64108",
      },
      {
        destino: "RideKC Streetcar — Linha Principal",
        endereco: "Main St & 12th St, Kansas City, MO 64105",
        carN: "1 min",
        carH: "2 min",
        tp: "Streetcar da porta do hotel — grátis · 3 min a pé",
        dist: "200 m",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=106+W+12th+St,+Kansas+City,+MO&daddr=Main+St+%26+12th+St,+Kansas+City,+MO",
      },
      {
        destino: "Power & Light District",
        endereco: "1336 Grand Blvd, Kansas City, MO 64106",
        carN: "3 min",
        carH: "5 min",
        tp: "A pé 5 min / grátis",
        dist: "500 m",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=106+W+12th+St,+Kansas+City,+MO&daddr=1336+Grand+Blvd,+Kansas+City,+MO+64106",
      },
      {
        destino: "Country Club Plaza",
        endereco: "4745 Central St, Kansas City, MO 64112",
        carN: "10 min",
        carH: "15 min",
        tp: "Uber / RideKC ônibus ~20 min",
        dist: "8 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=106+W+12th+St,+Kansas+City,+MO&daddr=4745+Central+St,+Kansas+City,+MO+64112",
      },
      {
        destino: "Crown Center",
        endereco: "2450 Grand Blvd, Kansas City, MO 64108",
        carN: "5 min",
        carH: "10 min",
        tp: "RideKC Streetcar Sul ~10 min / grátis",
        dist: "3 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=106+W+12th+St,+Kansas+City,+MO&daddr=2450+Grand+Blvd,+Kansas+City,+MO+64108",
      },
      {
        destino: "Greyhound — KC Bus Station",
        endereco: "1101 Troost Ave, Kansas City, MO 64106",
        carN: "5 min",
        carH: "10 min",
        tp: "Uber ~5 min / $10",
        dist: "2 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=106+W+12th+St,+Kansas+City,+MO&daddr=1101+Troost+Ave,+Kansas+City,+MO+64106",
      },
      {
        destino: "Dallas (próxima base)",
        endereco: "1712 Commerce St, Dallas, TX 75201",
        carN: "N/A",
        carH: "N/A",
        tp: "Voo MCI → DAL ~1h30 (Love Field) · Amtrak Texas Eagle ~8h (alternativa)",
        dist: "740 km",
        diff: "moderado",
        mapsUrl: "https://maps.google.com/?saddr=Kansas+City,+MO&daddr=Dallas,+TX",
      },
    ],
    transitoInfo: [
      "RideKC Streetcar: gratuito, percorre Main St de Union Station até Country Club Plaza. Para do lado do Hotel Phillips.",
      "GEHA Field at Arrowhead: sem ônibus regular. Shuttle FIFA Copa a confirmar — checar copa2026.com. Pedir Uber com 30 min de antecedência em dia de jogo.",
      "Surge pricing nos dias de jogo: pedir Uber antes de sair do estádio para evitar pico de demanda.",
    ],
    insights: [
      "11 noites em KC — rotina de transporte ao Arrowhead: Uber obrigatório. Combinar horários de saída com o grupo para dividir corrida.",
      "Shuttle Copa FIFA em dias de jogo: a confirmar — verificar copa2026.com antes de cada partida.",
      "⚠️ Surge pricing: pedir Uber ao menos 30 min antes da abertura dos portões e imediatamente ao final do jogo.",
      "Hotel Phillips tem valet — prático para o grupo no check-in. Power & Light District a 5 min a pé para refeições e entretenimento.",
      "CDT (UTC -5h) em KC e Dallas — sem mudança de fuso durante toda a viagem da equipe Argentina.",
    ],
  },

  // ── BASE 2 — Dallas, TX · 21 jun–01 jul ─────────────────────────
  {
    id: "dallas",
    emoji: "⭐",
    cidade: "Dallas TX",
    periodo: "21 jun–01 jul",
    hotel: "Residence Inn by Marriott Dallas Downtown",
    hotelAddr: "1712 Commerce St, Dallas, TX 75201",
    nota: "Extended-stay com cozinha equipada — ideal para os 10 dias. Kroger a 5 min a pé para compras. Valet disponível: confirmar cobrança diária para evitar duplicata.",
    fuso: "CDT (UTC -5h) · BRT = CDT +2h · Mesmo fuso de KC — sem ajuste necessário",
    referenciaLabel: "Estádio Copa: AT&T Stadium Arlington",
    referenciaAddr: "1 AT&T Way, Arlington, TX 76011",
    routes: [
      {
        destino: "AT&T Stadium Arlington",
        endereco: "1 AT&T Way, Arlington, TX 76011",
        carN: "20 min",
        carH: "35–50 min",
        tp: "TRE (Trinity Railway Express) até CentrePort → ônibus / Uber ~10 min",
        dist: "30 km",
        diff: "moderado",
        mapsUrl: "https://maps.google.com/?saddr=1712+Commerce+St,+Dallas,+TX&daddr=1+AT%26T+Way,+Arlington,+TX+76011",
      },
      {
        destino: "Love Field (DAL)",
        endereco: "8008 Herb Kelleher Way, Dallas, TX 75235",
        carN: "12 min",
        carH: "20–30 min",
        tp: "DART Silver Line direto ~25 min / $2,50 · Uber ~15 min",
        dist: "12 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=1712+Commerce+St,+Dallas,+TX&daddr=8008+Herb+Kelleher+Way,+Dallas,+TX+75235",
      },
      {
        destino: "DFW Airport",
        endereco: "2400 Aviation Dr, DFW Airport, TX 75261",
        carN: "25 min",
        carH: "35–50 min",
        tp: "DART Orange Line → TEXRail ~55 min / $2,50 · Uber ~30 min",
        dist: "30 km",
        diff: "moderado",
        mapsUrl: "https://maps.google.com/?saddr=1712+Commerce+St,+Dallas,+TX&daddr=2400+Aviation+Dr,+DFW+Airport,+TX+75261",
      },
      {
        destino: "Amtrak — Union Station Dallas",
        endereco: "400 S Houston St, Dallas, TX 75202",
        carN: "3 min",
        carH: "7 min",
        tp: "A pé 7 min / grátis · DART Rail adjacente",
        dist: "500 m",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=1712+Commerce+St,+Dallas,+TX&daddr=400+S+Houston+St,+Dallas,+TX+75202",
      },
      {
        destino: "DART — Pearl/Arts District Station",
        endereco: "1800 N Pearl St, Dallas, TX 75201",
        carN: "5 min",
        carH: "8 min",
        tp: "A pé 10 min / grátis · Conexão Red/Blue/Orange/Green Lines",
        dist: "700 m",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=1712+Commerce+St,+Dallas,+TX&daddr=1800+N+Pearl+St,+Dallas,+TX+75201",
      },
      {
        destino: "Deep Ellum",
        endereco: "Deep Ellum, Dallas, TX 75226",
        carN: "5 min",
        carH: "10 min",
        tp: "Uber ~5 min / $8–12 · DART Green Line (Baylor/Deep Ellum Station)",
        dist: "2,5 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=1712+Commerce+St,+Dallas,+TX&daddr=Deep+Ellum,+Dallas,+TX+75226",
      },
      {
        destino: "Klyde Warren Park",
        endereco: "2012 Woodall Rodgers Fwy, Dallas, TX 75201",
        carN: "5 min",
        carH: "8 min",
        tp: "A pé 10 min / grátis · Ponto de encontro popular para externas",
        dist: "700 m",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=1712+Commerce+St,+Dallas,+TX&daddr=2012+Woodall+Rodgers+Fwy,+Dallas,+TX+75201",
      },
      {
        destino: "Uptown Dallas",
        endereco: "McKinney Ave & Cedar Springs Rd, Dallas, TX 75201",
        carN: "5 min",
        carH: "10 min",
        tp: "McKinney Ave Trolley (gratuito) ~10 min · Uber ~5 min",
        dist: "2 km",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=1712+Commerce+St,+Dallas,+TX&daddr=McKinney+Ave+%26+Cedar+Springs+Rd,+Dallas,+TX+75201",
      },
      {
        destino: "Greyhound — Dallas Bus Station",
        endereco: "205 S Lamar St, Dallas, TX 75202",
        carN: "3 min",
        carH: "7 min",
        tp: "A pé 8 min / grátis",
        dist: "600 m",
        diff: "facil",
        mapsUrl: "https://maps.google.com/?saddr=1712+Commerce+St,+Dallas,+TX&daddr=205+S+Lamar+St,+Dallas,+TX+75202",
      },
      {
        destino: "Houston (excursão Copa)",
        endereco: "NRG Stadium, 1 NRG Pkwy, Houston, TX 77054",
        carN: "N/A",
        carH: "N/A",
        tp: "Voo DAL → IAH ~1h · Amtrak Texas Eagle (limitado) · Ônibus Greyhound ~4h30",
        dist: "380 km",
        diff: "moderado",
        mapsUrl: "https://maps.google.com/?saddr=Dallas,+TX&daddr=NRG+Stadium,+Houston,+TX",
      },
    ],
    transitoInfo: [
      "DART (Dallas Area Rapid Transit): cobertura excelente no centro. Pearl/Arts District Station a 10 min a pé do hotel — conecta Red, Blue, Orange e Green Lines.",
      "TRE (Trinity Railway Express): liga Downtown Dallas a Arlington/DFW. Para AT&T Stadium descer em CentrePort e pegar Uber ou ônibus de game day.",
      "Love Field (DAL): preferencial para chegadas e saídas — mais perto e sem congestionamento de DFW. DART Silver Line direto.",
      "⚠️ Terminal Greyhound em Harry Hines Blvd: risco de segurança — evitar à noite. A estação da S Lamar St (centro) é mais segura.",
    ],
    insights: [
      "10 noites em Dallas — Residence Inn tem cozinha equipada: ideal para refeições no hotel e economia de custo.",
      "Kroger a 5 min a pé do hotel para suprir a cozinha. Bom para café da manhã e lanches de jogo.",
      "⚠️ Valet no Residence Inn: confirmar se a cobrança é diária ou por entrada/saída para evitar duplicata na fatura.",
      "Preferir Love Field (DAL) ao DFW para conexões domésticas — 12 km do hotel vs. 30 km.",
      "AT&T Stadium em Arlington: sem metrô até a porta. TRE + Uber é a combinação mais prática. Surge pricing em dias de jogo — pedir com 30 min de antecedência.",
      "CDT (UTC -5h) em Dallas — mesmo fuso de KC. Sem ajuste de relógio durante toda a missão Argentina.",
      "Deep Ellum a 5 min de Uber: melhor opção para jantar informal e vida noturna local.",
    ],
  },
];
