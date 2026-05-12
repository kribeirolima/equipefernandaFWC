"use client";
import { useState, useEffect, useCallback } from "react";

export type VoucherEntry = {
  data: Record<string, string>;
  uploadedAt: string;
};

export type VoucherStore = {
  pass: VoucherEntry | null;
  hosp: VoucherEntry | null;
};

function storageKey(grupo: string, tipo: "pass" | "hosp") {
  return `voucher_${grupo}_${tipo}`;
}

function load(grupo: string): VoucherStore {
  const read = (tipo: "pass" | "hosp"): VoucherEntry | null => {
    try {
      const raw = localStorage.getItem(storageKey(grupo, tipo));
      return raw ? (JSON.parse(raw) as VoucherEntry) : null;
    } catch { return null; }
  };
  return { pass: read("pass"), hosp: read("hosp") };
}

export function useVoucherData(grupo: string) {
  const [store, setStore] = useState<VoucherStore>({ pass: null, hosp: null });

  useEffect(() => { setStore(load(grupo)); }, [grupo]);

  const save = useCallback((tipo: "pass" | "hosp", data: Record<string, string>) => {
    const entry: VoucherEntry = { data, uploadedAt: new Date().toISOString() };
    try { localStorage.setItem(storageKey(grupo, tipo), JSON.stringify(entry)); } catch {}
    setStore((prev) => ({ ...prev, [tipo]: entry }));
  }, [grupo]);

  const clear = useCallback((tipo: "pass" | "hosp") => {
    try { localStorage.removeItem(storageKey(grupo, tipo)); } catch {}
    setStore((prev) => ({ ...prev, [tipo]: null }));
  }, [grupo]);

  return { store, save, clear };
}
