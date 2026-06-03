"use client";
import { useState, useEffect, useCallback } from "react";

export interface DayEntry { id: string; label: string }

const STORAGE_KEY = "agenda_brasil_days";
const ACTIVE_KEY  = "agenda_brasil_active";
const DEFAULT_DAY: DayEntry = { id: "day_1", label: "Dia 1" };

export function useAgenda() {
  const [days, setDays]     = useState<DayEntry[]>([DEFAULT_DAY]);
  const [activeId, setActiveIdState] = useState<string>(DEFAULT_DAY.id);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DayEntry[];
        if (parsed.length > 0) setDays(parsed);
      }
      const active = localStorage.getItem(ACTIVE_KEY);
      if (active) setActiveIdState(active);
    } catch {}
  }, []);

  const persist = (next: DayEntry[]) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  const setActiveId = useCallback((id: string) => {
    setActiveIdState(id);
    try { localStorage.setItem(ACTIVE_KEY, id); } catch {}
  }, []);

  const addDay = useCallback(() => {
    setDays((prev) => {
      const num = prev.length + 1;
      const id  = `day_${Date.now()}`;
      const next: DayEntry[] = [...prev, { id, label: `Dia ${num}` }];
      persist(next);
      setActiveIdState(id);
      try { localStorage.setItem(ACTIVE_KEY, id); } catch {}
      return next;
    });
  }, []);

  const removeDay = useCallback((id: string) => {
    setDays((prev) => {
      if (prev.length === 1) return prev;
      const next = prev.filter((d) => d.id !== id);
      persist(next);
      setActiveIdState((cur) => {
        const newActive = cur === id ? next[0].id : cur;
        try { localStorage.setItem(ACTIVE_KEY, newActive); } catch {}
        return newActive;
      });
      return next;
    });
  }, []);

  return { days, activeId, setActiveId, addDay, removeDay };
}
