"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import type { SectionConfig } from "@/lib/ordem-dia-config";

interface Props {
  config: SectionConfig;
  initialValues: Record<string, string>;
  onSave: (values: Record<string, string>) => void;
}

const inputCls =
  "w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-1.5 text-[12px] text-gray-900 placeholder:text-[#D1D5DB] outline-none transition-colors focus:border-[#1A7A3C]";
const labelCls = "block text-[9px] uppercase tracking-widest text-[#9CA3AF] mb-1";

export function OdEditForm({ config, initialValues, onSave }: Props) {
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const set = (key: string, val: string) => setValues((p) => ({ ...p, [key]: val }));

  return (
    <div className="p-3.5 space-y-4">
      {config.groups.map((group, gi) => (
        <div key={gi} className="space-y-2.5">
          {group.groupTitle && (
            <p className="text-[9px] uppercase tracking-widest font-semibold text-[#9CA3AF] pt-1 border-t border-[#F3F4F6]">
              {group.groupTitle}
            </p>
          )}
          {group.rows.map((row, ri) => {
            if (row.type === "full") {
              return (
                <div key={ri}>
                  <label className={labelCls}>{row.label}</label>
                  <input
                    type="text"
                    value={values[row.key] ?? ""}
                    onChange={(e) => set(row.key, e.target.value)}
                    placeholder={row.placeholder}
                    className={inputCls}
                  />
                </div>
              );
            }
            if (row.type === "timepair") {
              return (
                <div key={ri}>
                  <label className={labelCls}>{row.label}</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[13px]">🇺🇸</span>
                      <input
                        type="text"
                        value={values[`${row.key}_edt`] ?? ""}
                        onChange={(e) => set(`${row.key}_edt`, e.target.value)}
                        placeholder="EDT ex: 11h00"
                        className={`${inputCls} pl-8`}
                      />
                    </div>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[13px]">🇧🇷</span>
                      <input
                        type="text"
                        value={values[`${row.key}_brt`] ?? ""}
                        onChange={(e) => set(`${row.key}_brt`, e.target.value)}
                        placeholder="BRT ex: 12h00"
                        className={`${inputCls} pl-8`}
                      />
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div key={ri} className="grid grid-cols-2 gap-2">
                {[row.left, row.right].map((f) => (
                  <div key={f.key}>
                    <label className={labelCls}>{f.label}</label>
                    <input
                      type="text"
                      value={values[f.key] ?? ""}
                      onChange={(e) => set(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      className={inputCls}
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}
      <button
        onClick={() => onSave(values)}
        className="od-screen-only mt-1 w-full flex items-center justify-center gap-2 rounded-md bg-[#1A7A3C] px-4 py-2 text-[12px] font-medium text-white hover:bg-[#166534] transition-colors"
      >
        <Check className="h-3.5 w-3.5" />
        ok, salvar
      </button>
    </div>
  );
}
