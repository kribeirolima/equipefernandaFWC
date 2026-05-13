import { PersonPanel } from "@/components/passagens/PersonPanel";

const PANELS = [
  {
    name: "Fernanda",
    passKey: "pv3_fg_pass",
    hospKey: "pv3_fg_hosp",
  },
  {
    name: "Renata · Karol · Anderson",
    passKey: "pv3_rka_pass",
    hospKey: "pv3_rka_hosp",
  },
  {
    name: "Rodrigo · Ricardo",
    passKey: "pv3_rr_pass",
    hospKey: "pv3_rr_hosp",
  },
];

export default function PassagensPage() {
  return (
    <div className="p-5 space-y-5 max-w-3xl">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Passagens e Hospedagens
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Equipe Brasil · Copa do Mundo 2026
        </p>
      </div>
      {PANELS.map((p) => (
        <PersonPanel
          key={p.passKey}
          name={p.name}
          passKey={p.passKey}
          hospKey={p.hospKey}
        />
      ))}
    </div>
  );
}
