import { reader } from '@/lib/keystatic';
import { SuccessStory } from '@/components/content/SuccessStory';
import { PillarHero } from '@/components/content/PillarHero';

export const metadata = {
  title: 'Erfolgsgeschichten',
  description: 'Echte Liebesgeschichten von Blaulicht-Singles — Paare die sich über uns gefunden haben.',
};

const rotations: Array<'left' | 'right' | 'slight'> = ['left', 'right', 'slight'];

export default async function Erfolgsgeschichten() {
  const stories = await reader.collections.stories.all();

  return (
    <>
      <PillarHero
        title="Erfolgsgeschichten"
        subtitle="Echte Paare. Echte Geschichten. Echte Liebe."
      />

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
