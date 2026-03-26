import { ParticleText } from '@/components/ui/ParticleText';
import { SpotlightHero } from '@/components/ui/SpotlightHero';

interface PillarHeroProps {
  title: string;
  texts?: string[];
  subtitle?: string;
  image?: string;
}

export function PillarHero({ title, texts, subtitle, image }: PillarHeroProps) {
  return (
    <SpotlightHero>
      <section className="relative overflow-hidden pt-1 pb-6 md:pt-2 md:pb-20">
        {/* Background */}
        <div className="absolute inset-0 particle-overlay opacity-50" />
        {image && (
          <div className="absolute inset-0">
            <img src={image} alt="" className="w-full h-full object-cover opacity-15" />
          </div>
        )}

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <ParticleText text={title} texts={texts} className="w-full h-40 md:h-56 mb-4" />
          {subtitle && (
            <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </section>
    </SpotlightHero>
  );
}
