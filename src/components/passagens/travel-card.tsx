"use client";
import { useState } from "react";
import { Plane, Bed, Check, Plus, X, Pencil, ArrowRight } from "lucide-react";
import { Calendar, MapPin, Home } from "lucide-react";
import { SectionLabel } from "./section-label";
import { FlightSection } from "./flight-section";
import { EditableField } from "./editable-field";
import type {
  GroupData,
  GroupKey,
  EditableSection,
  FlightData,
  TrechoExtra,
} from "@/hooks/useTravelData";
import { EMPTY_FLIGHT } from "@/hooks/useTravelData";

export interface GroupConfig {
  key: GroupKey;
  name: string;
  avatar: string;
  avatarBg: string;
  avatarColor: string;
}

// ─── Bloco compacto de trecho confirmado ─────────────────────────────────────

function TrechoCompact({
  trecho,
  index,
  onEdit,
  onDelete,
}: {
  trecho: TrechoExtra;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const v = trecho.voo;
  const hasRoute = v.aeroporto_saida || v.aeroporto_destino;
  const hasTimes = v.horario_saida || v.horario_chegada;
  const hasCities = v.cidade_saida || v.cidade_destino;

  return (
    <div
      className="rounded-lg p-3 space-y-1.5"
      style={{ background: "#F9FAFB", border: "0.5px solid #E5E7EB" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Plane className="h-3 w-3" style={{ color: "#1A7A3C" }} />
          <span
            className="text-[10px] font-medium uppercase"
            style={{ color: "#1A7A3C", letterSpacing: "0.08em" }}
          >
            Trecho {index + 1}
          </span>
        </div>
        <div className="flex gap-0.5">
          <button
            onClick={onEdit}
            title="Editar"
            className="p-1 rounded text-gray-400 hover:text-gray-700 transition-colors"
          >
            <Pencil className="h-3 w-3" />
          </button>
          <button
            onClick={onDelete}
            title="Remover"
            className="p-1 rounded text-gray-400 hover:text-red-500 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>

      {hasRoute && (
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] font-medium text-gray-900">
            {v.aeroporto_saida || "—"}
          </span>
          <ArrowRight className="h-3 w-3 text-gray-400 shrink-0" />
          <span className="text-[13px] font-medium text-gray-900">
            {v.aeroporto_destino || "—"}
          </span>
        </div>
      )}
      {v.data && <div className="text-[11px] text-gray-500">{v.data}</div>}
      {hasTimes && (
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
          <span>{v.horario_saida || "—"}</span>
          <ArrowRight className="h-2.5 w-2.5 text-gray-300 shrink-0" />
          <span>{v.horario_chegada || "—"}</span>
        </div>
      )}
      {hasCities && (
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
          <span>{v.cidade_saida}</span>
          {v.cidade_saida && v.cidade_destino && (
            <ArrowRight className="h-2.5 w-2.5 text-gray-300 shrink-0" />
          )}
          <span>{v.cidade_destino}</span>
        </div>
      )}
      {!hasRoute && !v.data && !hasTimes && (
        <p className="text-[11px] text-gray-400 italic">Sem dados</p>
      )}
    </div>
  );
}

// ─── Form inline de trecho ────────────────────────────────────────────────────

function TrechoForm({
  title,
  data,
  onChange,
  onConfirm,
  onCancel,
  confirmLabel = "OK — salvar trecho",
}: {
  title: string;
  data: FlightData;
  onChange: (field: keyof FlightData, value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
}) {
  return (
    <div
      className="rounded-lg p-4 space-y-3"
      style={{ border: "0.5px solid #1A7A3C", background: "#FFFFFF" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Plane className="h-3.5 w-3.5" style={{ color: "#1A7A3C" }} />
          <span
            className="text-[10px] font-medium uppercase"
            style={{ color: "#1A7A3C", letterSpacing: "0.08em" }}
          >
            {title}
          </span>
        </div>
        <button
          onClick={onCancel}
          className="p-1 rounded text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <FlightSection data={data} onUpdate={onChange} />

      <button
        onClick={onConfirm}
        className="w-full py-2 rounded-md text-white text-[13px] font-medium transition-colors"
        style={{ background: "#1A7A3C" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#166534")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#1A7A3C")}
      >
        {confirmLabel}
      </button>
    </div>
  );
}

// ─── Card principal ───────────────────────────────────────────────────────────

export function TravelCard({
  config,
  data,
  onUpdate,
  onAddTrecho,
  onUpdateTrecho,
  onRemoveTrecho,
  saved,
}: {
  config: GroupConfig;
  data: GroupData;
  onUpdate: (section: EditableSection, field: string, value: string) => void;
  onAddTrecho: (flight: FlightData) => void;
  onUpdateTrecho: (id: string, flight: FlightData) => void;
  onRemoveTrecho: (id: string) => void;
  saved: boolean;
}) {
  const [pendingForm, setPendingForm] = useState<FlightData | null>(null);
  const [editForms, setEditForms] = useState<Record<string, FlightData>>({});

  const openEdit = (t: TrechoExtra) =>
    setEditForms((prev) => ({ ...prev, [t.id]: { ...t.voo } }));

  const closeEdit = (id: string) =>
    setEditForms((prev) => { const n = { ...prev }; delete n[id]; return n; });

  const confirmEdit = (id: string) => {
    if (editForms[id]) onUpdateTrecho(id, editForms[id]);
    closeEdit(id);
  };

  return (
    <div
      className="group/card relative rounded-xl bg-white overflow-hidden flex flex-col"
      style={{ border: "0.5px solid #E5E7EB" }}
    >
      {/* Hover accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 scale-y-0 group-hover/card:scale-y-100 transition-transform origin-center duration-200 z-10"
        style={{ background: "#1A7A3C" }}
      />

      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 shrink-0"
        style={{ background: "#F9FAFB", borderBottom: "0.5px solid #E5E7EB" }}
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium shrink-0"
          style={{ background: config.avatarBg, color: config.avatarColor }}
        >
          {config.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-gray-900 truncate">{config.name}</p>
          <p className="text-[10px] text-gray-400">Passagens · Hospedagem</p>
        </div>
        <div
          className={`flex items-center gap-1 text-[11px] font-medium transition-opacity duration-300 ${
            saved ? "opacity-100" : "opacity-0"
          }`}
          style={{ color: "#1A7A3C" }}
        >
          <Check className="h-3 w-3" />
          <span>salvo</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-4 space-y-5">
        {/* Voo de ida */}
        <div>
          <SectionLabel label="Voo de ida" Icon={Plane} />
          <FlightSection
            data={data.voo_ida}
            onUpdate={(field, value) => onUpdate("voo_ida", field, value)}
          />
        </div>

        <div style={{ height: "0.5px", background: "#E5E7EB" }} />

        {/* Voo de volta */}
        <div>
          <SectionLabel label="Voo de volta" Icon={Plane} />
          <FlightSection
            data={data.voo_volta}
            onUpdate={(field, value) => onUpdate("voo_volta", field, value)}
          />
        </div>

        <div style={{ height: "0.5px", background: "#E5E7EB" }} />

        {/* Hospedagem */}
        <div>
          <SectionLabel label="Hospedagem" Icon={Bed} />
          <div className="space-y-2.5">
            <EditableField
              label="Local / endereço"
              Icon={Home}
              value={data.hospedagem.local}
              onChange={(v) => onUpdate("hospedagem", "local", v)}
              placeholder="— nome do local —"
            />
            <div className="grid grid-cols-2 gap-2">
              <EditableField
                label="Check-in"
                Icon={Calendar}
                value={data.hospedagem.checkin}
                onChange={(v) => onUpdate("hospedagem", "checkin", v)}
                placeholder="— data —"
              />
              <EditableField
                label="Check-out"
                Icon={Calendar}
                value={data.hospedagem.checkout}
                onChange={(v) => onUpdate("hospedagem", "checkout", v)}
                placeholder="— data —"
              />
            </div>
            <EditableField
              label="Cidade / País"
              Icon={MapPin}
              value={data.hospedagem.cidade_pais}
              onChange={(v) => onUpdate("hospedagem", "cidade_pais", v)}
              placeholder="— cidade, país —"
            />
          </div>
        </div>

        {/* Trechos confirmados */}
        {data.trechos_extras.length > 0 && (
          <>
            <div style={{ height: "0.5px", background: "#E5E7EB" }} />
            <div className="space-y-2">
              {data.trechos_extras.map((trecho, idx) =>
                editForms[trecho.id] !== undefined ? (
                  <TrechoForm
                    key={trecho.id}
                    title={`Editando trecho ${idx + 1}`}
                    data={editForms[trecho.id]}
                    onChange={(field, value) =>
                      setEditForms((prev) => ({
                        ...prev,
                        [trecho.id]: { ...prev[trecho.id], [field]: value },
                      }))
                    }
                    onConfirm={() => confirmEdit(trecho.id)}
                    onCancel={() => closeEdit(trecho.id)}
                    confirmLabel="OK — salvar edição"
                  />
                ) : (
                  <TrechoCompact
                    key={trecho.id}
                    trecho={trecho}
                    index={idx}
                    onEdit={() => openEdit(trecho)}
                    onDelete={() => onRemoveTrecho(trecho.id)}
                  />
                )
              )}
            </div>
          </>
        )}

        {/* Form de novo trecho */}
        {pendingForm !== null && (
          <TrechoForm
            title="Novo trecho"
            data={pendingForm}
            onChange={(field, value) =>
              setPendingForm((prev) => prev && { ...prev, [field]: value })
            }
            onConfirm={() => {
              if (pendingForm) onAddTrecho(pendingForm);
              setPendingForm(null);
            }}
            onCancel={() => setPendingForm(null)}
          />
        )}
      </div>

      {/* Botão adicionar */}
      {pendingForm === null && (
        <div className="px-4 pb-4 pt-1 shrink-0">
          <button
            onClick={() => setPendingForm({ ...EMPTY_FLIGHT })}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] text-gray-400 bg-transparent transition-all duration-150 hover:text-[#1A7A3C]"
            style={{ border: "0.5px dashed #E5E7EB" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#1A7A3C";
              e.currentTarget.style.background = "rgba(26,122,60,0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#E5E7EB";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <Plus className="h-3.5 w-3.5" />
            adicionar trecho
          </button>
        </div>
      )}
    </div>
  );
}
