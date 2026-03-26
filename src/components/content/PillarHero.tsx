import { ParticleText } from '@/components/ui/ParticleText';

interface PillarHeroProps {
  title: string;
  texts?: string[];
  subtitle?: string;
  image?: string;
}

export function PillarHero({ title, texts, subtitle, image }: PillarHeroProps) {
  return (
    <section className="relative overflow-hidden pt-2 pb-12 md:pt-2 md:pb-20">
      {/* Background */}
      <div className="absolute inset-0 particle-overlay opacity-50" />
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover opacity-15" />
        </div>
      )}

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <ParticleText text={title} texts={texts} className="w-full h-56 md:h-56 mb-6" />
        {subtitle && (
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
