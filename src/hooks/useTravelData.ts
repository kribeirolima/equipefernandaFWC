"use client";
import { useState, useEffect, useCallback } from "react";

export interface PassBlockData {
  voo: string;
  data: string;
  saida: string;
  chegada: string;
  origem_cod: string;
  origem_cidade: string;
  origem_pais: string;
  destino_cod: string;
  destino_cidade: string;
  destino_pais: string;
  bagagem: string;
}

export interface HospBlockData {
  hotel: string;
  checkin: string;
  checkout: string;
  cidade: string;
  pais: string;
  endereco: string;
  quarto: string;
  confirmacao: string;
}

export interface TravelBlock<T = PassBlockData | HospBlockData> {
  id: number;
  auto: boolean;
  confirmed: boolean;
  data: T;
}

const PT_MONTHS: Record<string, number> = {
  jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5,
  jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11,
};

function parsePtDate(str: string): number {
  const parts = str.trim().toLowerCase().split(" ");
  const d = parseInt(parts[0] ?? "1");
  const m = PT_MONTHS[parts[1] ?? ""] ?? 0;
  const y = parseInt(parts[2] ?? "2026");
  return new Date(y, m, d).getTime();
}

export function sortPassBlocks(
  blocks: TravelBlock<PassBlockData>[]
): TravelBlock<PassBlockData>[] {
  return [...blocks].sort(
    (a, b) => parsePtDate(a.data.data) - parsePtDate(b.data.data)
  );
}

export function sortHospBlocks(
  blocks: TravelBlock<HospBlockData>[]
): TravelBlock<HospBlockData>[] {
  return [...blocks].sort(
    (a, b) => parsePtDate(a.data.checkin) - parsePtDate(b.data.checkin)
  );
}

export function useTravelData<T>(
  storageKey: string,
  sort: (blocks: TravelBlock<T>[]) => TravelBlock<T>[]
): {
  blocks: TravelBlock<T>[];
  addMany: (items: T[], fromPDF: boolean) => void;
  update: (id: number, patch: Partial<T>) => void;
  remove: (id: number) => void;
} {
  const [blocks, setBlocks] = useState<TravelBlock<T>[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setBlocks(JSON.parse(raw) as TravelBlock<T>[]);
    } catch {}
  }, [storageKey]);

  const addMany = useCallback(
    (items: T[], fromPDF: boolean) => {
      setBlocks((prev) => {
        let id = prev.length > 0 ? Math.max(...prev.map((b) => b.id)) + 1 : 1;
        const added = items.map((d) => ({
          id: id++,
          auto: fromPDF,
          confirmed: !fromPDF,
          data: d,
        }));
        const updated = sort([...prev, ...added]);
        localStorage.setItem(storageKey, JSON.stringify(updated));
        return updated;
      });
    },
    [storageKey, sort]
  );

  const update = useCallback(
    (id: number, patch: Partial<T>) => {
      setBlocks((prev) => {
        const updated = sort(
          prev.map((b) =>
            b.id === id
              ? { ...b, confirmed: true, data: { ...b.data, ...patch } }
              : b
          )
        );
        localStorage.setItem(storageKey, JSON.stringify(updated));
        return updated;
      });
    },
    [storageKey, sort]
  );

  const remove = useCallback(
    (id: number) => {
      setBlocks((prev) => {
        const updated = prev.filter((b) => b.id !== id);
        localStorage.setItem(storageKey, JSON.stringify(updated));
        return updated;
      });
    },
    [storageKey]
  );

  return { blocks, addMany, update, remove };
}
