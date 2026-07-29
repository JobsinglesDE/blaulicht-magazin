import Link from 'next/link';
import Image from 'next/image';
import { PolaroidCard } from '@/components/ui/PolaroidCard';

interface SuccessStoryProps {
  title: string;
  couple: string;
  location?: string;
  excerpt: string;
  href: string;
  image?: string;
  imageAlt?: string;
  rotation?: 'left' | 'right' | 'slight';
}

export function SuccessStory({ title, couple, location, excerpt, href, image, imageAlt, rotation = 'slight' }: SuccessStoryProps) {
  return (
    <Link href={href} className="block group">
      <PolaroidCard rotation={rotation}>
        {image && (
          <div className="w-full aspect-square overflow-hidden">
            <Image
              src={image}
              alt={imageAlt || couple}
              width={600}
              height={600}
              className="w-full h-full object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-3 pt-4 text-center">
          <h3 className="font-bold text-sm text-gray-900 group-hover:text-brand-orange transition-colors">
            {couple}
          </h3>
          {location && (
            <p className="text-xs text-gray-500 mt-0.5">{location}</p>
          )}
          <p className="text-xs text-gray-600 mt-2 line-clamp-2">{excerpt}</p>
          {image && (
            /* Art. 50 Abs. 4 KI-VO + § 5 UWG. gray-500 statt gray-400: 4.83:1 statt
               2.54:1 Kontrast — Abs. 5 verlangt Barrierefreiheit (WCAG AA 4.5:1). */
            <p className="text-[10px] text-gray-500 mt-1">Symbolbild, KI-generiert</p>
          )}
        </div>
      </PolaroidCard>
    </Link>
  );
}
