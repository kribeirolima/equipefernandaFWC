import { Lightbulb } from "lucide-react";

export function InsightsPanel({ insights }: { insights: string[] }) {
  return (
    <ul className="space-y-2.5">
      {insights.map((text, i) => (
        <li
          key={i}
          className="flex items-start gap-2.5 rounded-md border bg-muted/30 px-3 py-2 text-sm"
        >
          <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
          <span className="text-foreground/90">{text}</span>
        </li>
      ))}
    </ul>
  );
}
