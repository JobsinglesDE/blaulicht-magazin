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
          <img src={image} alt={`Blaulicht-Singles ${city || kanton}, Schweiz — Partnersuche und Dating`} className="w-full h-full object-cover" style={{ objectPosition: '50% 25%' }} />
          {/* Dark scrim for text contrast in both light + dark mode */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
        </div>
      )}

      <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-14">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-orange">
            {kanton}
          </span>
          {city && (
            <>
              <span className="text-white/40">·</span>
              <span className="text-xs text-white/70">{city}</span>
            </>
          )}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight drop-shadow-lg">
          {title}
        </h1>
        {excerpt && (
          <p className="text-lg text-white/80 max-w-2xl leading-relaxed drop-shadow">
            {excerpt}
          </p>
        )}
      </div>
    </section>
  );
}
