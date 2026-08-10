"use client";
import { useState, useEffect, useCallback } from "react";
import { Plus, X } from "lucide-react";

interface Tab { id: string; label: string; content: string }

const DEFAULT_TABS: Tab[] = [{ id: "t1", label: "Dia 1", content: "" }];

interface Props { storagePrefix: string }

export function AgendaBrasilNotes({ storagePrefix }: Props) {
  const key = `${storagePrefix}_agenda_brasil_notes`;
  const [tabs, setTabs]       = useState<Tab[]>(DEFAULT_TABS);
  const [activeId, setActiveId] = useState<string>(DEFAULT_TABS[0].id);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as Tab[];
        if (parsed.length > 0) { setTabs(parsed); setActiveId(parsed[0].id); }
      }
    } catch {}
  }, [key]);

  const persist = (next: Tab[]) => {
    try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
  };

  const update = useCallback((next: Tab[]) => { setTabs(next); persist(next); }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  const addTab = () => {
    const id    = `t_${Date.now()}`;
    const label = `Dia ${tabs.length + 1}`;
    const next  = [...tabs, { id, label, content: "" }];
    update(next);
    setActiveId(id);
  };

  const removeTab = (id: string) => {
    if (tabs.length === 1) return;
    const next = tabs.filter((t) => t.id !== id);
    update(next);
    if (activeId === id) setActiveId(next[next.length - 1].id);
  };

  const setContent = (id: string, content: string) => {
    update(tabs.map((t) => (t.id === id ? { ...t, content } : t)));
  };

  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <div
      className="od-screen-only rounded-xl overflow-hidden"
      style={{ border: "0.5px solid #E5E7EB" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-1.5 px-3.5 py-2.5"
        style={{ background: "#F9FAFB", borderBottom: "0.5px solid #E5E7EB" }}
      >
        <span className="text-base leading-none">🇧🇷</span>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 500,
            color: "#1A7A3C",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Agenda Brasil
        </span>
      </div>

      {/* Tabs strip */}
      <div
        className="flex items-center gap-1 overflow-x-auto px-3 pt-2.5 pb-0 scrollbar-none"
        style={{ borderBottom: "0.5px solid #E5E7EB" }}
      >
        {tabs.map((tab) => {
          const active_ = tab.id === activeId;
          return (
            <div key={tab.id} className="flex-shrink-0 flex items-center mb-[-1px]">
              <button
                onClick={() => setActiveId(tab.id)}
                className="rounded-t-md border-t border-l px-3 py-1 text-[11px] font-medium transition-colors"
                style={
                  active_
                    ? { background: "#fff", borderColor: "#E5E7EB", borderRight: "none", color: "#1A7A3C" }
                    : { background: "#F9FAFB", borderColor: "transparent", borderRight: "none", color: "#9CA3AF" }
                }
              >
                {tab.label}
              </button>
              {tabs.length > 1 && (
                <button
                  onClick={() => removeTab(tab.id)}
                  className="rounded-tr-md border-t border-r px-1 py-1 transition-colors"
                  style={
                    active_
                      ? { background: "#fff", borderColor: "#E5E7EB", color: "#D1D5DB" }
                      : { background: "#F9FAFB", borderColor: "transparent", color: "transparent" }
                  }
                  title="Remover"
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              )}
            </div>
          );
        })}
        <button
          onClick={addTab}
          className="flex-shrink-0 mb-1 flex items-center gap-1 rounded-full border border-dashed border-[#D1D5DB] px-2.5 py-0.5 text-[10px] text-[#9CA3AF] transition-colors hover:border-[#1A7A3C] hover:text-[#1A7A3C]"
        >
          <Plus className="h-2.5 w-2.5" />
          dia
        </button>
      </div>

      {/* Textarea */}
      <div className="bg-white p-3">
        <textarea
          key={active.id}
          value={active.content}
          onChange={(e) => setContent(active.id, e.target.value)}
          placeholder="O que vai rolar com o time Brasil nesse dia..."
          rows={5}
          className="w-full resize-y rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-[12px] text-gray-900 placeholder:text-[#D1D5DB] outline-none transition-colors focus:border-[#1A7A3C]"
          style={{ lineHeight: "1.6" }}
        />
      </div>
    </div>
  );
}
