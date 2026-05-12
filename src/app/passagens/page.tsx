"use client";
import { TravelCard } from "@/components/passagens/TravelCard";

const GROUPS = [
  { id: "fg",  name: "Fernanda",                  avatar: "FG",  avatarBg: "rgba(139,92,246,0.1)", avatarColor: "#7C3AED" },
  { id: "rr",  name: "Ricardo e Rodrigo",          avatar: "RR",  avatarBg: "rgba(26,122,60,0.1)",  avatarColor: "#1A7A3C" },
  { id: "rka", name: "Renata, Karol e Anderson",   avatar: "RKA", avatarBg: "rgba(184,134,11,0.1)", avatarColor: "#B8860B" },
];

export default function PassagensPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 space-y-5">
      <div>
        <h1 className="text-[18px] font-medium text-gray-900">Passagens e Hospedagens</h1>
        <p className="text-[13px] text-gray-400 mt-0.5">
          Suba o PDF do voucher · blocos preenchidos automaticamente · edite se necessário
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
        {GROUPS.map((g) => (
          <TravelCard key={g.id} group={g} />
        ))}
      </div>
    </div>
  );
}
