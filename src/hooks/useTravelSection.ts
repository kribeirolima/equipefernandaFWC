"use client";
import { useState, useEffect, useCallback } from "react";

export type BlockItem = {
  id: number;
  confirmed: boolean;
  auto?: boolean;
  data: Record<string, string>;
};

function newBlock(): BlockItem {
  return { id: Date.now() + Math.random(), confirmed: false, data: {} };
}

function persist(key: string, blocks: BlockItem[]) {
  try { localStorage.setItem(key, JSON.stringify(blocks)); } catch {}
}

export function useTravelSection(storageKey: string) {
  const [blocks, setBlocks] = useState<BlockItem[]>([newBlock()]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as BlockItem[];
        if (Array.isArray(parsed) && parsed.length > 0) { setBlocks(parsed); return; }
      }
    } catch {}
    setBlocks([newBlock()]);
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
      const next = prev.map((b) => b.id === id ? { ...b, confirmed: false, auto: false } : b);
      persist(storageKey, next);
      return next;
    });
  }, [storageKey]);

  const addBlocksFromPDF = useCallback((items: Record<string, string>[]) => {
    setBlocks((prev) => {
      const base = prev.length === 1 && !prev[0].confirmed && Object.keys(prev[0].data).length === 0
        ? [] : prev;
      const newBlocks: BlockItem[] = items.map((data) => ({
        id: Date.now() + Math.random(),
        confirmed: true,
        auto: true,
        data,
      }));
      const next = [...base, ...newBlocks];
      persist(storageKey, next);
      return next;
    });
  }, [storageKey]);

  return { blocks, add, remove, confirm, reopen, addBlocksFromPDF };
}
