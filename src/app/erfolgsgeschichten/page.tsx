import { reader } from '@/lib/keystatic';
import { SuccessStory } from '@/components/content/SuccessStory';

export const metadata = {
  title: 'Erfolgsgeschichten',
  description: 'Echte Liebesgeschichten von Blaulicht-Singles — Paare die sich über uns gefunden haben.',
};

const rotations: Array<'left' | 'right' | 'slight'> = ['left', 'right', 'slight'];

export default async function Erfolgsgeschichten() {
  const stories = await reader.collections.stories.all();

  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 particle-overlay opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 particle-text">Erfolgsgeschichten</h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Echte Paare. Echte Geschichten. So findet Blaulicht die Liebe.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {stories.map((story, i) => (
            <SuccessStory
              key={story.slug}
              title={story.entry.title}
              couple={story.entry.couple}
              location={story.entry.location}
              excerpt={story.entry.excerpt}
              href={`/erfolgsgeschichten/${story.slug}`}
              image={story.entry.featuredImage || undefined}
              rotation={rotations[i % 3]}
            />
          ))}
        </div>
      </section>
    </>
  );
}
