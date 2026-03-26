import { JsonLd, breadcrumbJsonLd } from './JsonLd';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  baseUrl?: string;
}

export function Breadcrumbs({ items, baseUrl = 'https://blaulichtsingles.ch/magazin' }: BreadcrumbsProps) {
  const allItems = [{ label: 'Magazin', href: '/' }, ...items];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          allItems.map((item) => ({
            name: item.label,
            url: `${baseUrl}${item.href}`,
          }))
        )}
      />
      <nav className="text-xs text-foreground/40 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 flex-wrap">
          {allItems.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 && <span>›</span>}
              {i < allItems.length - 1 ? (
                <a href={item.href} className="hover:text-brand-orange transition-colors">
                  {item.label}
                </a>
              ) : (
                <span className="text-foreground/60">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
