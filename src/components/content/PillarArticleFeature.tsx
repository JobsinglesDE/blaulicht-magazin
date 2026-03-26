import { SpotlightCard } from '@/components/ui/SpotlightCard';

interface PillarArticleFeatureProps {
  title: string;
  excerpt: string;
  href: string;
  icon: React.ReactNode;
  accentColor?: string;
}

export function PillarArticleFeature({
  title,
  excerpt,
  href,
  icon,
  accentColor = 'var(--brand-orange)',
}: PillarArticleFeatureProps) {
  return (
    <SpotlightCard className="hover-lift">
      <a href={href} className="block group p-6 md:p-8">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white text-xl"
          style={{ background: accentColor }}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-brand-orange transition-colors">
          {title}
        </h3>
        <p className="text-foreground/60 text-sm leading-relaxed line-clamp-3">{excerpt}</p>
        <span
          className="inline-block mt-4 text-sm font-bold transition-colors"
          style={{ color: accentColor }}
        >
          Weiterlesen →
        </span>
      </a>
    </SpotlightCard>
  );
}
