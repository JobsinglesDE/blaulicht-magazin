interface TocItem {
  label: string;
  id: string;
}

interface Props {
  items: TocItem[];
}

export function TableOfContents({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <nav className="mb-8 p-4 rounded-xl border border-border bg-muted/40 text-sm">
      <p className="font-semibold text-foreground mb-3 uppercase tracking-wide text-xs">
        Inhaltsverzeichnis
      </p>
      <ol className="space-y-1 list-none pl-0">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-brand-orange hover:underline"
            >
              {i + 1}. {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
