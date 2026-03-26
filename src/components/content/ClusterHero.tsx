interface ClusterHeroProps {
  title: string;
  excerpt?: string;
  category?: string;
  image?: string;
  date?: string;
}

export function ClusterHero({ title, excerpt, category, image, date }: ClusterHeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Hero Image */}
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
        </div>
      )}

      <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-12">
        <div className="flex items-center gap-3 mb-6">
          {category && (
            <span className="text-xs uppercase tracking-widest font-bold text-brand-orange">
              {category}
            </span>
          )}
          {date && (
            <span className="text-xs text-foreground/40">{date}</span>
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
