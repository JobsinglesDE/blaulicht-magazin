interface SteckbriefRow {
  label: string;
  value: string;
}

interface SteckbriefTableProps {
  rows: SteckbriefRow[];
}

export function SteckbriefTable({ rows }: SteckbriefTableProps) {
  if (!rows || rows.length === 0) return null;

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-white/10 bg-surface ambient-shadow">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? 'bg-surface' : 'bg-surface-dark/40'}
            >
              <td className="px-4 py-3 font-semibold text-foreground/60 w-1/3 align-top">
                {row.label}
              </td>
              <td className="px-4 py-3 text-foreground leading-relaxed">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
