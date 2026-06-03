import type { LucideIcon } from "lucide-react";
import { Clapperboard, Trophy } from "lucide-react";

export type FieldRow =
  | { type: "full"; key: string; label: string; placeholder: string }
  | {
      type: "pair";
      left: { key: string; label: string; placeholder: string };
      right: { key: string; label: string; placeholder: string };
    }
  | { type: "timepair"; key: string; label: string };

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

export const SECTIONS_PROGRAMA: SectionConfig[] = [
  {
    id: "programa",
    storageKey: "programa",
    label: "Dia de Programa",
    anchorLabel: "Programa",
    Icon: Clapperboard,
    groups: [
      {
        rows: [
          { type: "full",     key: "local",          label: "Local",                       placeholder: "ex: Central Park, Bethesda Terrace" },
          { type: "full",     key: "data",            label: "Data",                        placeholder: "ex: Domingo, 14 jun 2026" },
          { type: "timepair", key: "hr_chegada",      label: "Horário de chegada" },
          { type: "timepair", key: "hr_abertura",     label: "Abertura da transmissão" },
          { type: "timepair", key: "hr_fechamento",   label: "Fechamento da transmissão" },
          { type: "full",     key: "qtd_materiais",   label: "Quantidade de materiais",     placeholder: "ex: 3 câmeras, 2 mics" },
          { type: "full",     key: "deslocamento",    label: "Forma de deslocamento",       placeholder: "ex: Van · 25 min" },
          { type: "full",     key: "apresentador",    label: "Nome do apresentador",        placeholder: "ex: Fernanda Gentil" },
          { type: "full",     key: "reporters",       label: "Nome dos repórteres",         placeholder: "ex: João Silva, Maria Costa" },
          {
            type: "pair",
            left:  { key: "cinegrafista", label: "Nome do cinegrafista", placeholder: "ex: João Silva" },
            right: { key: "produtor",     label: "Nome do produtor",     placeholder: "ex: Maria Costa" },
          },
        ],
      },
    ],
  },
];

export const SECTIONS_JOGO: SectionConfig[] = [
  {
    id: "jogo",
    storageKey: "jogo",
    label: "Dia de Jogo",
    anchorLabel: "Jogo",
    Icon: Trophy,
    groups: [
      {
        rows: [
          { type: "full",     key: "estadio",         label: "Estádio",              placeholder: "ex: MetLife Stadium" },
          {
            type: "pair",
            left:  { key: "time_mandante",  label: "Time mandante",  placeholder: "ex: Brasil" },
            right: { key: "time_visitante", label: "Time visitante", placeholder: "ex: Marrocos" },
          },
          { type: "full",     key: "data",            label: "Data",                 placeholder: "ex: 14 jun 2026" },
          { type: "timepair", key: "hr_jogo",         label: "Horário do jogo" },
          { type: "full",     key: "endereco",        label: "Endereço do estádio",  placeholder: "ex: 1 MetLife Stadium Dr, East Rutherford, NJ 07073" },
          { type: "timepair", key: "hr_saida",        label: "Saída do hotel/airbnb" },
          { type: "timepair", key: "hr_chegada",      label: "Horário de chegada" },
          { type: "timepair", key: "hr_abertura",     label: "Abertura da transmissão" },
          { type: "timepair", key: "hr_inicio_jogo",  label: "Início do jogo" },
          { type: "timepair", key: "hr_fim_jogo",     label: "Fim do jogo" },
          { type: "timepair", key: "hr_pos_jogo",     label: "Horário do pós-jogo" },
          {
            type: "pair",
            left:  { key: "qtd_materiais", label: "Quantidade de materiais", placeholder: "ex: 4 câmeras" },
            right: { key: "deslocamento",  label: "Forma de deslocamento",   placeholder: "ex: Van 01" },
          },
          { type: "full",     key: "apresentador",    label: "Nome do apresentador",     placeholder: "ex: Fernanda Gentil" },
          { type: "full",     key: "reporters",       label: "Nome dos repórteres",      placeholder: "ex: João Silva, Maria Costa" },
          {
            type: "pair",
            left:  { key: "cinegrafista", label: "Nome do cinegrafista", placeholder: "ex: João Silva" },
            right: { key: "produtor",     label: "Nome do produtor",     placeholder: "ex: Maria Costa" },
          },
        ],
      },
    ],
  },
];

export function allFieldsOf(config: SectionConfig): Array<{ key: string; label: string }> {
  return config.groups.flatMap((g) =>
    g.rows.flatMap((row) => {
      if (row.type === "full")     return [{ key: row.key, label: row.label }];
      if (row.type === "timepair") return [
        { key: `${row.key}_edt`, label: `🇺🇸 ${row.label}` },
        { key: `${row.key}_brt`, label: `🇧🇷 ${row.label}` },
      ];
      return [
        { key: row.left.key,  label: row.left.label  },
        { key: row.right.key, label: row.right.label },
      ];
    })
  );
}
