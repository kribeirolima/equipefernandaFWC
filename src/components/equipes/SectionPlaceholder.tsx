interface Props {
  section: string;
  team: string;
}

export function SectionPlaceholder({ section, team }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
      <span className="text-4xl">🚧</span>
      <h2 className="text-base font-semibold text-gray-700">{section}</h2>
      <p className="text-sm text-gray-400 max-w-xs">
        Em construção para {team}. Em breve disponível.
      </p>
    </div>
  );
}
