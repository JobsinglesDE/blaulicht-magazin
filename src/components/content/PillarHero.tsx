import { ParticleText } from '@/components/ui/ParticleText';

interface PillarHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export function PillarHero({ title, subtitle, image }: PillarHeroProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 particle-overlay opacity-50" />
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover opacity-15" />
        </div>
      )}

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          <ParticleText>{title}</ParticleText>
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
