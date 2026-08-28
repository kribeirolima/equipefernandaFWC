export function parseTimeMid(s: string): number {
  const cleaned = s.replace("min", "").trim();
  const parts = cleaned.split("–").map((p) => p.trim());
  const toMinutes = (p: string): number => {
    const h = p.match(/(\d+)h/);
    let total = 0;
    if (h) total += parseInt(h[1], 10) * 60;
    if (h && /h\d+$/.test(p)) {
      const m = p.match(/h(\d+)$/);
      if (m) total += parseInt(m[1], 10);
    } else if (!h) {
      const m = p.match(/^(\d+)$/);
      if (m) total += parseInt(m[1], 10);
    }
    return total;
  };
  const a = toMinutes(parts[0]);
  const b = toMinutes(parts[1] ?? parts[0]);
  return (a + b) / 2;
}

export function formatMinutes(mins: number): string {
  if (mins < 60) return `${Math.round(mins)} min`;
  const h = Math.floor(mins / 60);
  const m = Math.round(mins % 60);
  return m === 0 ? `${h}h` : `${h}h${m.toString().padStart(2, "0")}`;
}
