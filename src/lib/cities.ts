import { BH_CONFIG } from "./data-bh";
import { POA_CONFIG } from "./data-poa";
import { CWB_CONFIG } from "./data-cwb";
import { CHAPECO_CONFIG } from "./data-chapeco";
import { RIOPRETO_CONFIG } from "./data-riopreto";
import type { CityConfig } from "./types-deslocamentos";

export const CITY_CONFIGS: CityConfig[] = [BH_CONFIG, POA_CONFIG, CWB_CONFIG, CHAPECO_CONFIG, RIOPRETO_CONFIG];

export function cityConfigById(id: string): CityConfig | undefined {
  return CITY_CONFIGS.find((c) => c.id === id);
}
