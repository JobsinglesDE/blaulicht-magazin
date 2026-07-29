import Image from 'next/image';

interface RegionalHeroProps {
  title: string;
  kanton: string;
  city?: string;
  excerpt?: string;
  image?: string;
  imageAlt?: string;
  imageCredit?: string;
  /** KI-generiertes Bild — Kennzeichnung nach Art. 50 Abs. 4 KI-VO. */
  aiGenerated?: boolean;
}

export function RegionalHero({ title, kanton, city, excerpt, image, imageAlt, imageCredit, aiGenerated }: RegionalHeroProps) {
  return (
    <section className={`relative overflow-hidden ${image ? 'min-h-[320px] md:min-h-[400px]' : ''}`}>
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt || `Blaulicht-Singles ${city || kanton}, Schweiz — Partnersuche und Dating`}
            width={1920}
            height={800}
            priority
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: '50% 25%' }}
            sizes="100vw"
          />
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
            {/*
        Art. 50 Abs. 5 KI-VO: klar, unterscheidbar, bei erster Exposition, barrierefrei.
        Bewusst im DOM und nicht nur ins Bild gebrannt — das Hero-Bild wird per
        object-cover beschnitten, mobil ist ein eingebranntes Badge unsichtbar.
      */}
      {(imageCredit || aiGenerated) && image && (
        <div className="absolute bottom-1.5 right-3 flex items-center gap-2 text-white/85 drop-shadow-sm pointer-events-none">
          {aiGenerated && (
            <span className="rounded bg-black/45 px-1.5 py-0.5 text-[11px] font-medium leading-none backdrop-blur-[2px]">
              Bild: KI-generiert
            </span>
          )}
          {imageCredit && <span className="text-[10px] text-white/70">{imageCredit}</span>}
        </div>
      )}
    </section>
  );
}
