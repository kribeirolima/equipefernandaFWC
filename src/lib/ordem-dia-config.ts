import type { LucideIcon } from "lucide-react";
import {
  Info, MapPin, Truck, CalendarDays, User, Tv, Trophy, Users, AlertTriangle, FileText,
} from "lucide-react";

export type FieldRow =
  | { type: "full"; key: string; label: string; placeholder: string }
  | {
      type: "pair";
      left: { key: string; label: string; placeholder: string };
      right: { key: string; label: string; placeholder: string };
    };

export interface FieldGroup {
  groupTitle?: string;
  rows: FieldRow[];
}

export interface SectionConfig {
  id: string;
  storageKey: string;
  label: string;
  anchorLabel: string;
  Icon: LucideIcon;
  groups: FieldGroup[];
}

export const SECTIONS: SectionConfig[] = [
  {
    id: "info",
    storageKey: "od_info",
    label: "Informações Gerais",
    anchorLabel: "Info geral",
    Icon: Info,
    groups: [
      {
        rows: [
          { type: "full", key: "data", label: "Dia / Data", placeholder: "ex: DIA 1 — Domingo, 14 jun 2026" },
          { type: "pair", left: { key: "cidade", label: "Cidade", placeholder: "ex: East Rutherford, NJ" }, right: { key: "fuso", label: "Fuso horário", placeholder: "ex: EDT (UTC -4h) | BRT = EDT +1h" } },
          { type: "pair", left: { key: "clima", label: "Clima previsto", placeholder: "ex: 24°C – 29°C · 15% chuva" }, right: { key: "sunset", label: "Sunset local", placeholder: "ex: 20h28 EDT" } },
          { type: "full", key: "venue", label: "Estádio / Venue", placeholder: "ex: MetLife Stadium" },
        ],
      },
    ],
  },
  {
    id: "enderecos",
    storageKey: "od_enderecos",
    label: "Endereços e Locações",
    anchorLabel: "Endereços",
    Icon: MapPin,
    groups: [
      {
        rows: [
          { type: "full", key: "airbnb_equipe", label: "Airbnb da Equipe", placeholder: "endereço completo" },
          { type: "full", key: "airbnb_host", label: "Airbnb do Host", placeholder: "endereço completo" },
          { type: "full", key: "venue", label: "Estádio / Venue", placeholder: "ex: MetLife Stadium, East Rutherford, NJ" },
          { type: "full", key: "hotel_selecao", label: "Hotel da Seleção", placeholder: "nome e endereço" },
          { type: "full", key: "locacao_casa", label: "Locação 'Casa' CazéTV", placeholder: "ex: Central Park, Bethesda Terrace" },
          { type: "full", key: "hospital", label: "Hospital Referência", placeholder: "nome | endereço | tel" },
        ],
      },
    ],
  },
  {
    id: "logistica",
    storageKey: "od_logistica",
    label: "Logística e Deslocamento",
    anchorLabel: "Logística",
    Icon: Truck,
    groups: [
      {
        groupTitle: "Frota",
        rows: [
          { type: "full", key: "van01", label: "Van 01 — motorista", placeholder: "nome | tel | placa" },
          { type: "full", key: "van02", label: "Van 02 — motorista", placeholder: "nome | tel | placa" },
          { type: "full", key: "carro_host", label: "Carro do Host — motorista", placeholder: "nome | tel | modelo" },
          { type: "full", key: "limite_uber", label: "Limite Uber corporativo", placeholder: "ex: USD 80,00 por corrida" },
        ],
      },
      {
        groupTitle: "Rotas",
        rows: [
          { type: "full", key: "rota_airbnb_venue", label: "Airbnb equipe → Venue", placeholder: "ex: 22 km · 25 min · até 70 min c/ trânsito" },
          { type: "full", key: "rota_host_casa", label: "Airbnb host → 'Casa'", placeholder: "ex: 8 km · 15 min" },
          { type: "full", key: "rota_casa_venue", label: "'Casa' → Venue", placeholder: "ex: 24 km · 28 min · até 90 min" },
          { type: "full", key: "rota_hotel_venue", label: "Hotel seleção → Venue", placeholder: "ex: 5 km · 10 min" },
        ],
      },
    ],
  },
  {
    id: "agenda",
    storageKey: "od_agenda",
    label: "Agenda do Dia",
    anchorLabel: "Agenda",
    Icon: CalendarDays,
    groups: [
      {
        groupTitle: "Entradas ao vivo",
        rows: [
          { type: "pair", left: { key: "e1_horario", label: "1ª — Horário EDT", placeholder: "ex: 11h00" }, right: { key: "e1_duracao", label: "Duração", placeholder: "ex: 4 min" } },
          { type: "full", key: "e1_comentarista", label: "1ª — Comentarista", placeholder: "nome" },
          { type: "pair", left: { key: "e2_horario", label: "2ª — Horário EDT", placeholder: "ex: 13h00" }, right: { key: "e2_duracao", label: "Duração", placeholder: "ex: 6 min" } },
          { type: "full", key: "e2_comentarista", label: "2ª — Comentarista", placeholder: "nome" },
          { type: "pair", left: { key: "e3_horario", label: "3ª — Horário EDT", placeholder: "ex: 17h45" }, right: { key: "e3_duracao", label: "Duração", placeholder: "ex: 8 min" } },
          { type: "full", key: "e3_comentarista", label: "3ª — Comentarista", placeholder: "nome" },
          { type: "pair", left: { key: "e4_horario", label: "4ª — Horário EDT", placeholder: "ex: 20h30" }, right: { key: "e4_duracao", label: "Duração", placeholder: "ex: 5 min" } },
          { type: "full", key: "e4_comentarista", label: "4ª — Comentarista", placeholder: "nome" },
          { type: "pair", left: { key: "e5_horario", label: "5ª — Horário EDT", placeholder: "ex: 22h00" }, right: { key: "e5_duracao", label: "Duração", placeholder: "ex: 3 min" } },
          { type: "full", key: "e5_comentarista", label: "5ª — Comentarista", placeholder: "nome" },
        ],
      },
      {
        groupTitle: "Jogo",
        rows: [
          { type: "pair", left: { key: "jogo_adversario", label: "Adversário do Brasil", placeholder: "ex: Marrocos" }, right: { key: "jogo_horario", label: "Horário (EDT)", placeholder: "ex: 16h00 EDT" } },
        ],
      },
      {
        groupTitle: "Alertas de logística",
        rows: [
          { type: "pair", left: { key: "limite_venue", label: "Horário limite entrada venue", placeholder: "ex: 13h30 EDT" }, right: { key: "perimetro_fifa", label: "Fechamento perímetro FIFA", placeholder: "ex: 14h00 EDT" } },
        ],
      },
    ],
  },
  {
    id: "host",
    storageKey: "od_host",
    label: "Programação do Host",
    anchorLabel: "Host",
    Icon: User,
    groups: [
      {
        rows: [
          { type: "pair", left: { key: "nome", label: "Nome do Host", placeholder: "ex: Fernanda Gentil" }, right: { key: "total_entradas", label: "Total entradas ao vivo", placeholder: "ex: 5" } },
          { type: "full", key: "figurino_1_2", label: "Figurino entrada 1–2", placeholder: "descrição | responsável" },
          { type: "full", key: "figurino_3_5", label: "Figurino entrada 3–5", placeholder: "descrição | local de troca" },
          { type: "full", key: "maquiagem", label: "Maquiagem / Cabelo", placeholder: "artista | tel" },
          { type: "full", key: "earpiece", label: "Earpiece canal", placeholder: "canal | backup | técnico" },
          { type: "full", key: "restricoes", label: "Restrições alimentares", placeholder: "ex: sem glúten" },
          { type: "full", key: "assistente", label: "Assistente pessoal", placeholder: "nome | tel | WhatsApp" },
        ],
      },
    ],
  },
  {
    id: "grade",
    storageKey: "od_grade",
    label: "Grade de Programação",
    anchorLabel: "Grade TV",
    Icon: Tv,
    groups: [
      {
        rows: [
          { type: "pair", left: { key: "prog1_horario", label: "Programa 1 — horário", placeholder: "ex: 11h00–11h04 EDT" }, right: { key: "prog1_bancada", label: "Bancada", placeholder: "host | coment | apoio BR" } },
          { type: "pair", left: { key: "prog2_horario", label: "Programa 2 — horário", placeholder: "ex: 13h00–13h06 EDT" }, right: { key: "prog2_bancada", label: "Bancada", placeholder: "host | coments | rep" } },
          { type: "pair", left: { key: "prog3_horario", label: "Programa 3 — horário", placeholder: "ex: 17h45–17h53 EDT" }, right: { key: "prog3_bancada", label: "Bancada", placeholder: "host | coments" } },
          { type: "pair", left: { key: "prog4_horario", label: "Programa 4 — horário", placeholder: "ex: 20h30–20h35 EDT" }, right: { key: "prog4_bancada", label: "Bancada", placeholder: "host | rep de campo" } },
          { type: "pair", left: { key: "progN_horario", label: "Programa noturno — horário", placeholder: "ex: 22h00–22h30 EDT" }, right: { key: "progN_bancada", label: "Bancada", placeholder: "apresentador | host (part.) | coments" } },
        ],
      },
    ],
  },
  {
    id: "jogos",
    storageKey: "od_jogos",
    label: "Jogos do Dia",
    anchorLabel: "Jogos",
    Icon: Trophy,
    groups: [
      {
        rows: [
          { type: "full", key: "confronto", label: "Confronto", placeholder: "ex: 🇧🇷 BRASIL vs Marrocos 🇲🇦" },
          { type: "pair", left: { key: "horario", label: "Horário (EDT / BRT)", placeholder: "ex: 16h00 EDT | 17h00 BRT" }, right: { key: "importancia", label: "Importância", placeholder: "ex: ALTA — Estreia do Brasil" } },
          { type: "pair", left: { key: "narrador", label: "Narrador", placeholder: "nome" }, right: { key: "comentaristas", label: "Comentaristas", placeholder: "nome | nome | nome" } },
          { type: "full", key: "rep_campo", label: "Rep. de campo", placeholder: "campo: nome | torcida: nome | mix zone: nome" },
          { type: "full", key: "prod_responsavel", label: "Prod. responsável", placeholder: "ed. chefe | coord | dir. transmissão" },
          { type: "pair", left: { key: "portoes", label: "Portões abrem", placeholder: "ex: 13h00 EDT" }, right: { key: "coletiva", label: "Coletiva pré-jogo", placeholder: "horário | sala | vagas CazéTV" } },
          { type: "full", key: "flash", label: "Flash de vestiário", placeholder: "SIM/NÃO | horário estimado | vagas" },
        ],
      },
    ],
  },
  {
    id: "equipes",
    storageKey: "od_equipes",
    label: "Equipes e Cobertura",
    anchorLabel: "Equipes",
    Icon: Users,
    groups: [
      {
        rows: [
          { type: "pair", left: { key: "ed_chefe", label: "Ed. Chefe", placeholder: "nome | tel" }, right: { key: "coord_tecnico", label: "Coord. Técnico", placeholder: "nome | tel" } },
          { type: "pair", left: { key: "rep_estadio1", label: "Rep. Estádio 1", placeholder: "nome | posição" }, right: { key: "rep_estadio2", label: "Rep. Estádio 2", placeholder: "nome | posição" } },
          { type: "pair", left: { key: "rep_selecao", label: "Rep. Seleção", placeholder: "nome | posição" }, right: { key: "rep_torcida", label: "Rep. Torcida", placeholder: "nome | posição" } },
          { type: "pair", left: { key: "social_media", label: "Social Media", placeholder: "nome(s) | plataformas" }, right: { key: "coord_logistica", label: "Coord. Logística", placeholder: "nome | tel" } },
        ],
      },
    ],
  },
  {
    id: "alertas",
    storageKey: "od_alertas",
    label: "Alertas e Planos B",
    anchorLabel: "Alertas",
    Icon: AlertTriangle,
    groups: [
      {
        rows: [
          { type: "full", key: "credencial_fifa", label: "Contato credencial FIFA", placeholder: "nome | tel | protocolo" },
          { type: "full", key: "provider_satelite", label: "Provider link satélite", placeholder: "empresa | técnico 24h | tel" },
          { type: "full", key: "plano_b_chuva", label: "Plano B chuva — base alternativa", placeholder: "endereço da base alternativa" },
          { type: "full", key: "comentarista_sub", label: "Comentarista substituto", placeholder: "nome | tel" },
        ],
      },
    ],
  },
  {
    id: "resumo",
    storageKey: "od_resumo",
    label: "Resumo Executivo",
    anchorLabel: "Resumo",
    Icon: FileText,
    groups: [
      {
        groupTitle: "Destaques",
        rows: [
          { type: "full", key: "destaque1", label: "Destaque 1", placeholder: "ex: DIA DE ABERTURA — Copa do Mundo FIFA 2026" },
          { type: "full", key: "destaque2", label: "Destaque 2", placeholder: "ex: Estreia do Brasil no MetLife Stadium" },
          { type: "full", key: "destaque3", label: "Destaque 3", placeholder: "ex: 5 entradas ao vivo em 3 locações" },
          { type: "full", key: "destaque4", label: "Destaque 4", placeholder: "ex: Equipe de 30+ profissionais em campo" },
        ],
      },
      {
        groupTitle: "Momentos-chave",
        rows: [
          { type: "full", key: "momento1", label: "Momento 1", placeholder: "horário — descrição" },
          { type: "full", key: "momento2", label: "Momento 2", placeholder: "horário — descrição" },
          { type: "full", key: "momento3", label: "Momento 3", placeholder: "horário — descrição" },
          { type: "full", key: "momento4", label: "Momento 4", placeholder: "horário — descrição" },
        ],
      },
      {
        groupTitle: "Prioridades editoriais",
        rows: [
          { type: "full", key: "prioridade1", label: "Prioridade 1", placeholder: "ex: Entradas ao vivo sem falhas técnicas" },
          { type: "full", key: "prioridade2", label: "Prioridade 2", placeholder: "ex: Cobertura emocional da torcida brasileira" },
          { type: "full", key: "prioridade3", label: "Prioridade 3", placeholder: "ex: Flash pós-jogo com jogadores" },
        ],
      },
    ],
  },
];

export function allFieldsOf(config: SectionConfig): Array<{ key: string; label: string }> {
  return config.groups.flatMap((g) =>
    g.rows.flatMap((row) =>
      row.type === "full"
        ? [{ key: row.key, label: row.label }]
        : [
            { key: row.left.key, label: row.left.label },
            { key: row.right.key, label: row.right.label },
          ]
    )
  );
}
