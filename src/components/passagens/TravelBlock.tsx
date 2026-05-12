"use client";
import { useTravelBlock } from "@/hooks/useTravelBlock";
import { EditForm } from "./EditForm";
import { SummaryCard } from "./SummaryCard";

export function TravelBlock({
  storageKey,
  blockType,
}: {
  storageKey: string;
  blockType: "flight" | "hospedagem";
}) {
  const { fields, confirmed, hydrated, confirm, startEdit } = useTravelBlock(
    storageKey,
    blockType
  );

  if (!hydrated) return null;

  return confirmed ? (
    <SummaryCard blockType={blockType} data={fields} onEdit={startEdit} />
  ) : (
    <EditForm blockType={blockType} initialData={fields} onConfirm={confirm} />
  );
}
