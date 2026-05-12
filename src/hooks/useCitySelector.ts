"use client";
import { useState, useEffect } from "react";

export const CITIES = [
  { code: "cdmx", name: "Cidade do México", flag: "🇲🇽", short: "CDMX" },
  { code: "nj",   name: "New Jersey",        flag: "🇺🇸", short: "NJ"   },
  { code: "ny",   name: "Nova York",          flag: "🇺🇸", short: "NY"   },
  { code: "atl",  name: "Atlanta",            flag: "🇺🇸", short: "ATL"  },
  { code: "dal",  name: "Dallas",             flag: "🇺🇸", short: "DAL"  },
  { code: "hou",  name: "Houston",            flag: "🇺🇸", short: "HOU"  },
  { code: "mia",  name: "Miami",              flag: "🇺🇸", short: "MIA"  },
] as const;

const KEY = "passagens_cidade_atual";

export function useCitySelector() {
  const [city, setCity] = useState("ny");

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) setCity(saved);
  }, []);

  const selectCity = (code: string) => {
    setCity(code);
    localStorage.setItem(KEY, code);
  };

  const active = CITIES.find((c) => c.code === city) ?? CITIES[2];

  return { city, active, selectCity };
}
