"use client";
import { useState, useEffect, useCallback } from "react";

type SectionState = { values: Record<string, string>; confirmed: boolean };
type OdStore = Record<string, SectionState>;

const empty = (ids: string[]): OdStore =>
  Object.fromEntries(ids.map((id) => [id, { values: {}, confirmed: false }]));

function load(id: string, prefix: string): SectionState {
  try {
    const raw = localStorage.getItem(`${prefix}_${id}`);
    if (raw) return JSON.parse(raw) as SectionState;
  } catch {}
  return { values: {}, confirmed: false };
}

function persist(id: string, state: SectionState, prefix: string) {
  try {
    localStorage.setItem(`${prefix}_${id}`, JSON.stringify(state));
  } catch {}
}

export function useOrdemDia(sectionIds: string[], storagePrefix = "od") {
  const [store, setStore] = useState<OdStore>(() => empty(sectionIds));

  useEffect(() => {
    setStore(Object.fromEntries(sectionIds.map((id) => [id, load(id, storagePrefix)])));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const save = useCallback((id: string, values: Record<string, string>) => {
    const next: SectionState = { values, confirmed: true };
    persist(id, next, storagePrefix);
    setStore((prev) => ({ ...prev, [id]: next }));
  }, [storagePrefix]);

  const reopen = useCallback((id: string) => {
    setStore((prev) => {
      const next: SectionState = { ...prev[id], confirmed: false };
      persist(id, next, storagePrefix);
      return { ...prev, [id]: next };
    });
  }, [storagePrefix]);

  const confirmedCount = Object.values(store).filter((s) => s.confirmed).length;

  return { store, save, reopen, confirmedCount };
}
