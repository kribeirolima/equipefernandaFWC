import { PassagensTabs } from "@/components/passagens/PassagensTabs";

export default function PassagensPage() {
  return (
    <div className="p-5 max-w-3xl space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Passagens e Hospedagens
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Equipe Brasil · Copa do Mundo 2026
        </p>
      </div>
      <PassagensTabs />
    </div>
  );
}
