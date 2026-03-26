interface RegionalProgressProps {
  label: string;
  value: number;
  max?: number;
}

export function RegionalProgress({ label, value, max = 100 }: RegionalProgressProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="my-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-bold text-foreground">{label}</span>
        <span className="text-foreground/50">{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-surface-dark overflow-hidden">
        <div
          className="h-full rounded-full bg-brand-orange transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
