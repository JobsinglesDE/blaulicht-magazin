'use client';

import { SpotlightCard } from '@/components/ui/SpotlightCard';

interface SeriesCardProps {
  title: string;
  excerpt: string;
  href: string;
  image?: string;
  seriesLabel?: string;
  episodeNumber?: number;
}

export function SeriesCard({ title, excerpt, href, image, seriesLabel, episodeNumber }: SeriesCardProps) {
  return (
    <SpotlightCard>
      <a href={href} className="block group">
        {image && (
          <div className="aspect-video overflow-hidden relative">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {episodeNumber && (
              <span className="absolute top-3 left-3 bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded">
                Ep. {episodeNumber}
              </span>
            )}
          </div>
        )}
        <div className="p-5">
          {seriesLabel && (
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary-light mb-2 block">
              {seriesLabel}
            </span>
          )}
          <h3 className="font-bold text-lg text-foreground leading-tight mb-2 group-hover:text-brand-orange transition-colors">
            {title}
          </h3>
          <p className="text-sm text-foreground/60 line-clamp-2">{excerpt}</p>
        </div>
      </a>
    </SpotlightCard>
  );
}
