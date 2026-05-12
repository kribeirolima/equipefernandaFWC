"use client";
import { useState } from "react";
import { Plus, X, Plane, Bed } from "lucide-react";
import { useTrechos } from "@/hooks/useTrechos";
import { EditForm } from "./EditForm";
import { SummaryCard } from "./SummaryCard";

export function TrechoSection({ storageKey }: { storageKey: string }) {
  const { trechos, hydrated, add, confirm, startEdit, remove } = useTrechos(storageKey);
  const [showPicker, setShowPicker] = useState(false);

  if (!hydrated) return null;

  const handleAdd = (blockType: "flight" | "hospedagem") => {
    add(blockType);
    setShowPicker(false);
  };

  return (
    <div>
      {trechos.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "8px" }}>
          {trechos.map((t, idx) =>
            t.confirmed ? (
              <SummaryCard
                key={t.id}
                blockType={t.blockType}
                data={t.fields}
                onEdit={() => startEdit(t.id)}
                onDelete={() => remove(t.id)}
              />
            ) : (
              <div key={t.id}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#9CA3AF",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {t.blockType === "flight" ? "Passagem" : "Hospedagem"} {idx + 1}
                  </span>
                  <button
                    onClick={() => remove(t.id)}
                    title="Cancelar"
                    style={{
                      padding: "2px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "#D1D5DB",
                      display: "flex",
                      alignItems: "center",
                      transition: "color 0.1s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#EF4444")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
                  >
                    <X style={{ width: 12, height: 12 }} />
                  </button>
                </div>
                <EditForm
                  blockType={t.blockType}
                  initialData={t.fields}
                  onConfirm={(fields) => confirm(t.id, fields)}
                />
              </div>
            )
          )}
        </div>
      )}

      {/* Picker ou botão adicionar */}
      {showPicker ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "7px 8px",
            border: "0.5px solid #E5E7EB",
            borderRadius: "6px",
            background: "#FAFAFA",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              color: "#9CA3AF",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              flexShrink: 0,
              marginRight: "2px",
            }}
          >
            Tipo
          </span>

          <button
            onClick={() => handleAdd("flight")}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              padding: "5px 8px",
              fontSize: "11px",
              fontWeight: 500,
              color: "#374151",
              background: "#FFFFFF",
              border: "0.5px solid #E5E7EB",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "all 0.1s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#1A7A3C";
              e.currentTarget.style.color = "#1A7A3C";
              e.currentTarget.style.background = "rgba(26,122,60,0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#E5E7EB";
              e.currentTarget.style.color = "#374151";
              e.currentTarget.style.background = "#FFFFFF";
            }}
          >
            <Plane style={{ width: 11, height: 11 }} />
            Passagem
          </button>

          <button
            onClick={() => handleAdd("hospedagem")}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              padding: "5px 8px",
              fontSize: "11px",
              fontWeight: 500,
              color: "#374151",
              background: "#FFFFFF",
              border: "0.5px solid #E5E7EB",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "all 0.1s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#1A7A3C";
              e.currentTarget.style.color = "#1A7A3C";
              e.currentTarget.style.background = "rgba(26,122,60,0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#E5E7EB";
              e.currentTarget.style.color = "#374151";
              e.currentTarget.style.background = "#FFFFFF";
            }}
          >
            <Bed style={{ width: 11, height: 11 }} />
            Hospedagem
          </button>

          <button
            onClick={() => setShowPicker(false)}
            title="Cancelar"
            style={{
              flexShrink: 0,
              padding: "4px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#D1D5DB",
              display: "flex",
              alignItems: "center",
              transition: "color 0.1s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#6B7280")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
          >
            <X style={{ width: 13, height: 13 }} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowPicker(true)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            padding: "8px",
            fontSize: "12px",
            color: "#9CA3AF",
            background: "transparent",
            border: "0.5px dashed #E5E7EB",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#1A7A3C";
            e.currentTarget.style.borderColor = "#1A7A3C";
            e.currentTarget.style.background = "rgba(26,122,60,0.03)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#9CA3AF";
            e.currentTarget.style.borderColor = "#E5E7EB";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <Plus style={{ width: 12, height: 12 }} />
          adicionar trecho
        </button>
      )}
    </div>
  );
}
