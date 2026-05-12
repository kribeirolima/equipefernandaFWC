"use client";
import { useState, useCallback, useEffect } from "react";

export interface FlightFields {
  data: string;
  saida: string;
  chegada: string;
  aero_orig: string;
  cidade_orig: string;
  aero_dest: string;
  cidade_dest: string;
}

export interface HospedagemFields {
  local: string;
  checkin: string;
  checkout: string;
  cidade: string;
}

export type BlockFields = FlightFields | HospedagemFields;

export const EMPTY_FLIGHT: FlightFields = {
  data: "",
  saida: "",
  chegada: "",
  aero_orig: "",
  cidade_orig: "",
  aero_dest: "",
  cidade_dest: "",
};

export const EMPTY_HOSPEDAGEM: HospedagemFields = {
  local: "",
  checkin: "",
  checkout: "",
  cidade: "",
};

export function useTravelBlock(storageKey: string, blockType: "flight" | "hospedagem") {
  const empty: BlockFields = blockType === "flight" ? { ...EMPTY_FLIGHT } : { ...EMPTY_HOSPEDAGEM };
  const [fields, setFields] = useState<BlockFields>(empty);
  const [confirmed, setConfirmed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        setFields(JSON.parse(raw) as BlockFields);
        setConfirmed(true);
      }
    } catch {}
    setHydrated(true);
  }, [storageKey]);

  const confirm = useCallback(
    (data: BlockFields) => {
      localStorage.setItem(storageKey, JSON.stringify(data));
      setFields(data);
      setConfirmed(true);
    },
    [storageKey]
  );

  const startEdit = useCallback(() => setConfirmed(false), []);

  return { fields, confirmed, hydrated, confirm, startEdit };
}
