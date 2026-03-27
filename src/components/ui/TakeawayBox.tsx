interface TakeawayBoxProps {
  title?: string;
  items: readonly string[];
}

export function TakeawayBox({ title = 'Das Wichtigste', items }: TakeawayBoxProps) {
  return (
    <div className="bg-surface-dark rounded-2xl p-6 my-8">
      <h3 className="font-bold text-white text-lg mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-white/90 text-sm leading-relaxed">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0 text-brand-orange mt-0.5">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
