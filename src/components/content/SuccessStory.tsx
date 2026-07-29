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
            /* Art. 50 Abs. 4 KI-VO + § 5 UWG: Die Story nennt konkrete Personen,
               das Bild zeigt sie nicht. "Symbolbild" ist hier Teil der Wahrheit. */
            <p className="text-[10px] text-gray-400 mt-1.5">Symbolbild · KI-generiert</p>
          )}
        </div>
      </PolaroidCard>
    </Link>
  );
}
