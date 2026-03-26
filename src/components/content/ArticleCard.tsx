'use client';

import { SpotlightCard } from '@/components/ui/SpotlightCard';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  href: string;
  image?: string;
  category?: string;
  date?: string;
}

export function ArticleCard({ title, excerpt, href, image, category, date }: ArticleCardProps) {
  return (
    <SpotlightCard>
      <a href={href} className="block group">
        {image && (
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            {category && (
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-orange">
                {category}
              </span>
            )}
            {date && (
              <span className="text-[10px] text-foreground/40">{date}</span>
            )}
          </div>
          <h3 className="font-bold text-lg text-foreground leading-tight mb-2 group-hover:text-brand-orange transition-colors">
            {title}
          </h3>
          <p className="text-sm text-foreground/60 line-clamp-2">{excerpt}</p>
        </div>
      </a>
    </SpotlightCard>
  );
}
