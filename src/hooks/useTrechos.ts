"use client";
import { useState, useCallback, useEffect, useMemo } from "react";
import type { FlightFields, HospedagemFields, BlockFields } from "./useTravelBlock";
import { EMPTY_FLIGHT, EMPTY_HOSPEDAGEM } from "./useTravelBlock";

export interface TrechoState {
  id: string;
  blockType: "flight" | "hospedagem";
  fields: BlockFields;
  confirmed: boolean;
}

const MONTHS: Record<string, number> = {
  jan: 1, fev: 2, mar: 3, abr: 4, mai: 5, jun: 6,
  jul: 7, ago: 8, set: 9, out: 10, nov: 11, dez: 12,
};

function parseDateScore(dateStr: string): number {
  if (!dateStr) return Infinity;
  const parts = dateStr.toLowerCase().trim().split(/\s+/);
  const day = parseInt(parts[0] ?? "") || 0;
  const month = MONTHS[parts[1]?.slice(0, 3) ?? ""] ?? 0;
  const year = parseInt(parts[2] ?? "") || 2026;
  return year * 10000 + month * 100 + day;
}

function getDateStr(t: TrechoState): string {
  if (t.blockType === "flight") return (t.fields as FlightFields).data;
  return (t.fields as HospedagemFields).checkin;
}

export function useTrechos(storageKey: string) {
  const [trechos, setTrechos] = useState<TrechoState[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved: Array<{ id: string; blockType: "flight" | "hospedagem"; fields: BlockFields }> =
          JSON.parse(raw);
        setTrechos(saved.map((t) => ({ ...t, confirmed: true })));
      }
    } catch {}
    setHydrated(true);
  }, [storageKey]);

  const persist = useCallback(
    (updated: TrechoState[]) => {
      const confirmed = updated
        .filter((t) => t.confirmed)
        .map(({ id, blockType, fields }) => ({ id, blockType, fields }));
      localStorage.setItem(storageKey, JSON.stringify(confirmed));
    },
    [storageKey]
  );

  const add = useCallback((blockType: "flight" | "hospedagem") => {
    const id = `t_${Date.now()}`;
    const fields = blockType === "flight" ? { ...EMPTY_FLIGHT } : { ...EMPTY_HOSPEDAGEM };
    setTrechos((prev) => [...prev, { id, blockType, fields, confirmed: false }]);
  }, []);

  const confirm = useCallback(
    (id: string, fields: BlockFields) => {
      setTrechos((prev) => {
        const updated = prev.map((t) =>
          t.id === id ? { ...t, fields, confirmed: true } : t
        );
        persist(updated);
        return updated;
      });
    },
    [persist]
  );

  const startEdit = useCallback((id: string) => {
    setTrechos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, confirmed: false } : t))
    );
  }, []);

  const remove = useCallback(
    (id: string) => {
      setTrechos((prev) => {
        const updated = prev.filter((t) => t.id !== id);
        persist(updated);
        return updated;
      });
    },
    [persist]
  );

  const sorted = useMemo(() => {
    const confirmed = [...trechos.filter((t) => t.confirmed)].sort(
      (a, b) => parseDateScore(getDateStr(a)) - parseDateScore(getDateStr(b))
    );
    const pending = trechos.filter((t) => !t.confirmed);
    return [...confirmed, ...pending];
  }, [trechos]);

  return { trechos: sorted, hydrated, add, confirm, startEdit, remove };
}
