"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { CITY_CONFIGS } from "./cities";

const STORAGE_KEY = "giro-brasileirao-cidade";
const DEFAULT_CITY = CITY_CONFIGS[0].id;

interface CityContextValue {
  cityId: string;
  setCityId: (id: string) => void;
}

const CityContext = createContext<CityContextValue | null>(null);

export function CityProvider({ children }: { children: ReactNode }) {
  const [cityId, setCityIdState] = useState(DEFAULT_CITY);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && CITY_CONFIGS.some((c) => c.id === stored)) {
        setCityIdState(stored);
      }
    } catch {
      // localStorage indisponível — mantém o padrão
    }
  }, []);

  const setCityId = (id: string) => {
    setCityIdState(id);
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // ignora falha de storage
    }
  };

  return <CityContext.Provider value={{ cityId, setCityId }}>{children}</CityContext.Provider>;
}

export function useCity(): CityContextValue {
  const ctx = useContext(CityContext);
  if (!ctx) throw new Error("useCity precisa estar dentro de um CityProvider");
  return ctx;
}
