"use client";
import { useState, useEffect, useCallback } from "react";

export type BlockItem = {
  id: number;
  confirmed: boolean;
  data: Record<string, string>;
};

function newBlock(): BlockItem {
  return { id: Date.now() + Math.random(), confirmed: false, data: {} };
}

function persist(key: string, blocks: BlockItem[]) {
  try { localStorage.setItem(key, JSON.stringify(blocks)); } catch {}
}

function loadImported(key: string): Set<number> {
  try {
    const raw = localStorage.getItem(`${key}_imported`);
    if (raw) return new Set(JSON.parse(raw) as number[]);
  } catch {}
  return new Set();
}

function saveImported(key: string, ids: Set<number>) {
  try { localStorage.setItem(`${key}_imported`, JSON.stringify([...ids])); } catch {}
}

function parseKeyParts(storageKey: string): { grupo: string; tipo: string } | null {
  // storageKey pattern: pb2_{grupo}_pass | pb2_{grupo}_hosp
  const m = storageKey.match(/^pb2_(.+)_(pass|hosp)$/);
  if (!m) return null;
  return { grupo: m[1], tipo: m[2] === "pass" ? "passagem" : "hospedagem" };
}

export function useTravelSection(storageKey: string) {
  const [blocks, setBlocks] = useState<BlockItem[]>([newBlock()]);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      // 1. Load from localStorage
      let local: BlockItem[] = [];
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw) as BlockItem[];
          if (Array.isArray(parsed) && parsed.length > 0) local = parsed;
        }
      } catch {}

      if (!cancelled) setBlocks(local.length > 0 ? local : [newBlock()]);

      // 2. Fetch from sheet and merge new blocks
      const parts = parseKeyParts(storageKey);
      if (!parts) return;

      try {
        const res = await fetch(`/api/sheet-data?grupo=${parts.grupo}&tipo=${parts.tipo}`);
        if (!res.ok || cancelled) return;
        const sheetBlocks = (await res.json()) as BlockItem[];
        if (!Array.isArray(sheetBlocks) || sheetBlocks.length === 0) return;

        setBlocks((prev) => {
          const imported = loadImported(storageKey);
          const newFromSheet = sheetBlocks.filter((b) => !imported.has(b.id));
          if (newFromSheet.length === 0) return prev;

          // Remove the placeholder empty block if it's the only one and unconfirmed
          const base = prev.length === 1 && !prev[0].confirmed && Object.keys(prev[0].data).length === 0
            ? []
            : prev;

          const merged = [...base, ...newFromSheet];
          persist(storageKey, merged);
          newFromSheet.forEach((b) => imported.add(b.id));
          saveImported(storageKey, imported);
          return merged;
        });
      } catch {}
    }

    init();
    return () => { cancelled = true; };
  }, [storageKey]);

  const add = useCallback(() => {
    setBlocks((prev) => {
      const next = [...prev, newBlock()];
      persist(storageKey, next);
      return next;
    });
  }, [storageKey]);

  const remove = useCallback((id: number) => {
    setBlocks((prev) => {
      const filtered = prev.filter((b) => b.id !== id);
      const next = filtered.length > 0 ? filtered : [newBlock()];
      persist(storageKey, next);
      return next;
    });
  }, [storageKey]);

  const confirm = useCallback((id: number, data: Record<string, string>) => {
    setBlocks((prev) => {
      const next = prev.map((b) => b.id === id ? { ...b, confirmed: true, data } : b);
      persist(storageKey, next);
      return next;
    });
  }, [storageKey]);

  const reopen = useCallback((id: number) => {
    setBlocks((prev) => {
      const next = prev.map((b) => b.id === id ? { ...b, confirmed: false } : b);
      persist(storageKey, next);
      return next;
    });
  }, [storageKey]);

  return { blocks, add, remove, confirm, reopen };
}
