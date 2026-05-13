"use client";
import { useState } from "react";
import { PassBlock } from "./PassBlock";
import { HospBlock } from "./HospBlock";
import { UploadButton } from "./UploadButton";
import {
  useTravelData,
  sortPassBlocks,
  sortHospBlocks,
  type PassBlockData,
  type HospBlockData,
} from "@/hooks/useTravelData";

const EMPTY_PASS: PassBlockData = {
  voo: "",
  data: "",
  saida: "",
  chegada: "",
  origem_cod: "",
  origem_cidade: "",
  origem_pais: "",
  destino_cod: "",
  destino_cidade: "",
  destino_pais: "",
  bagagem: "",
};

const EMPTY_HOSP: HospBlockData = {
  hotel: "",
  checkin: "",
  checkout: "",
  cidade: "",
  pais: "",
  endereco: "",
  quarto: "",
  confirmacao: "",
};

interface Props {
  passKey: string;
  hospKey: string;
}

export function TravelSection({ passKey, hospKey }: Props) {
  const pass = useTravelData<PassBlockData>(passKey, sortPassBlocks);
  const hosp = useTravelData<HospBlockData>(hospKey, sortHospBlocks);

  const [passError, setPassError] = useState("");
  const [hospError, setHospError] = useState("");

  return (
    <div className="space-y-7">
      {/* Passagens */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-sm font-semibold text-gray-700">✈ Passagens</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <UploadButton
              label="Subir PDF de passagem"
              type="pass"
              onSuccess={(blocks) => {
                setPassError("");
                pass.addMany(blocks as PassBlockData[], true);
              }}
              onError={(msg) => setPassError(msg)}
            />
            <button
              className="text-[13px] text-blue-600 hover:text-blue-800 transition-colors"
              onClick={() => {
                setPassError("");
                pass.addMany([{ ...EMPTY_PASS }], false);
              }}
            >
              + trecho manual
            </button>
          </div>
        </div>
        {passError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {passError}
          </p>
        )}
        {pass.blocks.length === 0 ? (
          <p className="text-sm text-gray-400 italic">
            Nenhuma passagem adicionada.
          </p>
        ) : (
          <div className="space-y-2">
            {pass.blocks.map((b) => (
              <PassBlock
                key={b.id}
                block={b}
                onUpdate={pass.update}
                onRemove={pass.remove}
              />
            ))}
          </div>
        )}
      </div>

      {/* Hospedagens */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-sm font-semibold text-gray-700">🛏 Hospedagens</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <UploadButton
              label="Subir PDF de hospedagem"
              type="hosp"
              onSuccess={(blocks) => {
                setHospError("");
                hosp.addMany(blocks as HospBlockData[], true);
              }}
              onError={(msg) => setHospError(msg)}
            />
            <button
              className="text-[13px] text-blue-600 hover:text-blue-800 transition-colors"
              onClick={() => {
                setHospError("");
                hosp.addMany([{ ...EMPTY_HOSP }], false);
              }}
            >
              + hospedagem manual
            </button>
          </div>
        </div>
        {hospError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {hospError}
          </p>
        )}
        {hosp.blocks.length === 0 ? (
          <p className="text-sm text-gray-400 italic">
            Nenhuma hospedagem adicionada.
          </p>
        ) : (
          <div className="space-y-2">
            {hosp.blocks.map((b) => (
              <HospBlock
                key={b.id}
                block={b}
                onUpdate={hosp.update}
                onRemove={hosp.remove}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
