import { TravelSection } from "./TravelSection";

interface Props {
  name: string;
  passKey: string;
  hospKey: string;
}

export function PersonPanel({ name, passKey, hospKey }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-[15px] font-semibold text-gray-900">{name}</h2>
      </div>
      <div className="p-5">
        <TravelSection passKey={passKey} hospKey={hospKey} />
      </div>
    </div>
  );
}
