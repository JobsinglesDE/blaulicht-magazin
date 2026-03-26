import { PolaroidCard } from '@/components/ui/PolaroidCard';

interface SuccessStoryProps {
  title: string;
  couple: string;
  location?: string;
  excerpt: string;
  href: string;
  image?: string;
  rotation?: 'left' | 'right' | 'slight';
}

export function SuccessStory({ title, couple, location, excerpt, href, image, rotation = 'slight' }: SuccessStoryProps) {
  return (
    <a href={href} className="block group">
      <PolaroidCard rotation={rotation}>
        {image && (
          <img
            src={image}
            alt={couple}
            className="w-full aspect-square object-cover"
            loading="lazy"
          />
        )}
        <div className="p-3 pt-4 text-center">
          <h3 className="font-bold text-sm text-gray-900 group-hover:text-brand-orange transition-colors">
            {couple}
          </h3>
          {location && (
            <p className="text-xs text-gray-500 mt-0.5">{location}</p>
          )}
          <p className="text-xs text-gray-600 mt-2 line-clamp-2">{excerpt}</p>
        </div>
      </PolaroidCard>
    </a>
  );
}
