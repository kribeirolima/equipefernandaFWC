"use client";
import { useState, useCallback, useRef, useEffect } from "react";

export interface FlightData {
  data: string;
  horario_saida: string;
  horario_chegada: string;
  aeroporto_saida: string;
  cidade_saida: string;
  aeroporto_destino: string;
  cidade_destino: string;
}

export interface HospedagemData {
  local: string;
  checkin: string;
  checkout: string;
  cidade_pais: string;
}

export interface TrechoExtra {
  id: string;
  voo: FlightData;
}

export interface GroupData {
  voo_ida: FlightData;
  voo_volta: FlightData;
  hospedagem: HospedagemData;
  trechos_extras: TrechoExtra[];
}

export type GroupKey = "fernanda" | "ricardo_rodrigo" | "renata_karol_anderson";
export type EditableSection = "voo_ida" | "voo_volta" | "hospedagem";
export type PassagensData = Record<GroupKey, GroupData>;

export const EMPTY_FLIGHT: FlightData = {
  data: "",
  horario_saida: "",
  horario_chegada: "",
  aeroporto_saida: "",
  cidade_saida: "",
  aeroporto_destino: "",
  cidade_destino: "",
};

const EMPTY_HOSPEDAGEM: HospedagemData = {
  local: "",
  checkin: "",
  checkout: "",
  cidade_pais: "",
};

function createGroupData(): GroupData {
  return {
    voo_ida: { ...EMPTY_FLIGHT },
    voo_volta: { ...EMPTY_FLIGHT },
    hospedagem: { ...EMPTY_HOSPEDAGEM },
    trechos_extras: [],
  };
}

export function createDefault(): PassagensData {
  return {
    fernanda: createGroupData(),
    ricardo_rodrigo: createGroupData(),
    renata_karol_anderson: createGroupData(),
  };
}

const STORAGE_KEY = "passagens_data";

function mergeWithDefaults(parsed: Partial<PassagensData>): PassagensData {
  const d = createDefault();
  return {
    fernanda: { ...d.fernanda, ...parsed.fernanda },
    ricardo_rodrigo: { ...d.ricardo_rodrigo, ...parsed.ricardo_rodrigo },
    renata_karol_anderson: { ...d.renata_karol_anderson, ...parsed.renata_karol_anderson },
  };
}

export function useTravelData() {
  const [data, setData] = useState<PassagensData>(createDefault);
  const [savedGroups, setSavedGroups] = useState<Set<GroupKey>>(new Set());
  const debounceRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setData(mergeWithDefaults(JSON.parse(raw)));
    } catch {}
  }, []);

  const persistAndNotify = useCallback((group: GroupKey, next: PassagensData) => {
    clearTimeout(debounceRef.current[group]);
    debounceRef.current[group] = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSavedGroups((s) => new Set([...s, group]));
      setTimeout(
        () => setSavedGroups((s) => { const n = new Set(s); n.delete(group); return n; }),
        2000
      );
    }, 500);
  }, []);

  const updateField = useCallback(
    (group: GroupKey, section: EditableSection, field: string, value: string) => {
      setData((prev) => {
        const next: PassagensData = {
          ...prev,
          [group]: {
            ...prev[group],
            [section]: {
              ...(prev[group][section] as unknown as Record<string, string>),
              [field]: value,
            },
          },
        };
        persistAndNotify(group, next);
        return next;
      });
    },
    [persistAndNotify]
  );

  const addTrecho = useCallback(
    (group: GroupKey, flightData: FlightData) => {
      const id = `trecho_${Date.now()}`;
      setData((prev) => {
        const next: PassagensData = {
          ...prev,
          [group]: {
            ...prev[group],
            trechos_extras: [
              ...prev[group].trechos_extras,
              { id, voo: flightData },
            ],
          },
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const updateTrecho = useCallback(
    (group: GroupKey, trechoId: string, flightData: FlightData) => {
      setData((prev) => {
        const next: PassagensData = {
          ...prev,
          [group]: {
            ...prev[group],
            trechos_extras: prev[group].trechos_extras.map((t) =>
              t.id === trechoId ? { ...t, voo: flightData } : t
            ),
          },
        };
        persistAndNotify(group, next);
        return next;
      });
    },
    [persistAndNotify]
  );

  const removeTrecho = useCallback(
    (group: GroupKey, trechoId: string) => {
      setData((prev) => {
        const next: PassagensData = {
          ...prev,
          [group]: {
            ...prev[group],
            trechos_extras: prev[group].trechos_extras.filter((t) => t.id !== trechoId),
          },
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  return { data, updateField, addTrecho, updateTrecho, removeTrecho, savedGroups };
}
