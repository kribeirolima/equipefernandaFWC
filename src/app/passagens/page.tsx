import { Plane, Bed } from "lucide-react";
import { TravelBlock } from "@/components/passagens/TravelBlock";
import { TrechoSection } from "@/components/passagens/TrechoSection";

const GROUPS = [
  {
    id: "fg",
    name: "Fernanda",
    avatar: "FG",
    avatarBg: "rgba(139,92,246,0.1)",
    avatarColor: "#7C3AED",
  },
  {
    id: "rr",
    name: "Ricardo e Rodrigo",
    avatar: "RR",
    avatarBg: "rgba(26,122,60,0.1)",
    avatarColor: "#1A7A3C",
  },
  {
    id: "rka",
    name: "Renata, Karol e Anderson",
    avatar: "RKA",
    avatarBg: "rgba(184,134,11,0.1)",
    avatarColor: "#B8860B",
  },
];

function SectionLabel({ label, Icon }: { label: string; Icon: React.ElementType }) {
  return (
    <div className="flex items-center gap-1.5 mb-2">
      <Icon style={{ width: 13, height: 13, color: "#1A7A3C" }} />
      <span
        style={{
          fontSize: "11px",
          fontWeight: 500,
          color: "#1A7A3C",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function PassagensPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 space-y-6">
      <div>
        <h1 className="text-[18px] font-medium text-gray-900">Passagens e Hospedagens</h1>
        <p className="text-[13px] text-gray-400 mt-0.5">
          Preencha os dados · clique &ldquo;ok, salvar&rdquo; · blocos ficam confirmados no navegador
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
        {GROUPS.map((g) => (
          <div
            key={g.id}
            className="rounded-xl bg-white overflow-hidden"
            style={{ border: "0.5px solid #E5E7EB" }}
          >
            {/* Group header */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ background: "#F9FAFB", borderBottom: "0.5px solid #E5E7EB" }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium shrink-0"
                style={{ background: g.avatarBg, color: g.avatarColor }}
              >
                {g.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-gray-900 truncate">{g.name}</p>
                <p className="text-[10px] text-gray-400">Passagens · Hospedagem</p>
              </div>
            </div>

            {/* Blocks */}
            <div className="p-4 space-y-4">
              <div>
                <SectionLabel label="Voo de ida" Icon={Plane} />
                <TravelBlock storageKey={`pb_${g.id}_ida`} blockType="flight" />
              </div>

              <div style={{ height: "0.5px", background: "#E5E7EB" }} />

              <div>
                <SectionLabel label="Voo de volta" Icon={Plane} />
                <TravelBlock storageKey={`pb_${g.id}_volta`} blockType="flight" />
              </div>

              <div style={{ height: "0.5px", background: "#E5E7EB" }} />

              <div>
                <SectionLabel label="Hospedagem" Icon={Bed} />
                <TravelBlock storageKey={`pb_${g.id}_hosp`} blockType="hospedagem" />
              </div>

              <div style={{ height: "0.5px", background: "#E5E7EB" }} />

              <TrechoSection storageKey={`pb_${g.id}_trechos`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
