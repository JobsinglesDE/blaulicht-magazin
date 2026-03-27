interface RegionalHeroProps {
  title: string;
  kanton: string;
  city?: string;
  excerpt?: string;
  image?: string;
}

export function RegionalHero({ title, kanton, city, excerpt, image }: RegionalHeroProps) {
  return (
    <section className={`relative overflow-hidden ${image ? 'min-h-[320px] md:min-h-[400px]' : ''}`}>
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt={`${kanton}${city ? ` – ${city}` : ''}`} className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
        </div>
      )}

      <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-14">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-orange">
            {kanton}
          </span>
          {city && (
            <>
              <span className="text-foreground/20">·</span>
              <span className="text-xs text-foreground/50">{city}</span>
            </>
          )}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4 leading-tight">
          {title}
        </h1>
        {excerpt && (
          <p className="text-lg text-foreground/60 max-w-2xl leading-relaxed">
            {excerpt}
          </p>
        )}
      </div>
    </section>
  );
}
