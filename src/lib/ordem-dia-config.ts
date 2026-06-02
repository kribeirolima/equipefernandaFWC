import type { LucideIcon } from "lucide-react";
import { Clapperboard, Trophy } from "lucide-react";

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
          { type: "full",  key: "local",       label: "Local",                        placeholder: "ex: Central Park, Bethesda Terrace" },
          { type: "full",  key: "data",         label: "Data",                         placeholder: "ex: Domingo, 14 jun 2026" },
          { type: "pair",
            left:  { key: "hr_chegada",   label: "Horário de chegada",          placeholder: "ex: 08h00" },
            right: { key: "hr_abertura",  label: "Abertura da transmissão",     placeholder: "ex: 11h00" },
          },
          { type: "pair",
            left:  { key: "hr_fechamento",  label: "Fechamento da transmissão",  placeholder: "ex: 13h00" },
            right: { key: "qtd_materiais",  label: "Quantidade de materiais",    placeholder: "ex: 3 câmeras, 2 mics" },
          },
          { type: "full",  key: "deslocamento",   label: "Forma de deslocamento",        placeholder: "ex: Van · 25 min" },
          { type: "full",  key: "apresentador",   label: "Nome do apresentador",         placeholder: "ex: Fernanda Gentil" },
          { type: "pair",
            left:  { key: "cinegrafista", label: "Nome do cinegrafista",         placeholder: "ex: João Silva" },
            right: { key: "produtor",     label: "Nome do produtor",             placeholder: "ex: Maria Costa" },
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
          { type: "full",  key: "estadio",      label: "Estádio",                      placeholder: "ex: MetLife Stadium" },
          { type: "pair",
            left:  { key: "time_mandante",  label: "Time mandante",              placeholder: "ex: Brasil" },
            right: { key: "time_visitante", label: "Time visitante",             placeholder: "ex: Marrocos" },
          },
          { type: "pair",
            left:  { key: "data",     label: "Data",                             placeholder: "ex: 14 jun 2026" },
            right: { key: "hr_jogo",  label: "Horário do jogo",                  placeholder: "ex: 16h00 EDT" },
          },
          { type: "full",  key: "endereco",     label: "Endereço do estádio",          placeholder: "ex: 1 MetLife Stadium Dr, East Rutherford, NJ 07073" },
          { type: "pair",
            left:  { key: "hr_saida",   label: "Saída do hotel/airbnb",          placeholder: "ex: 13h00" },
            right: { key: "hr_chegada", label: "Horário de chegada",             placeholder: "ex: 14h00" },
          },
          { type: "pair",
            left:  { key: "hr_abertura",    label: "Abertura da transmissão",    placeholder: "ex: 15h30" },
            right: { key: "hr_inicio_jogo", label: "Início do jogo",             placeholder: "ex: 16h00" },
          },
          { type: "pair",
            left:  { key: "hr_fim_jogo", label: "Fim do jogo",                   placeholder: "ex: ~18h00" },
            right: { key: "hr_pos_jogo", label: "Horário do pós-jogo",           placeholder: "ex: 18h00 – 19h30" },
          },
          { type: "pair",
            left:  { key: "qtd_materiais",  label: "Quantidade de materiais",    placeholder: "ex: 4 câmeras" },
            right: { key: "deslocamento",   label: "Forma de deslocamento",      placeholder: "ex: Van 01" },
          },
          { type: "full",  key: "apresentador_reporters", label: "Apresentador e repórteres",    placeholder: "ex: Fernanda Gentil | Rep: João, Maria" },
          { type: "pair",
            left:  { key: "cinegrafista", label: "Nome do cinegrafista",         placeholder: "ex: João Silva" },
            right: { key: "produtor",     label: "Nome do produtor",             placeholder: "ex: Maria Costa" },
          },
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
