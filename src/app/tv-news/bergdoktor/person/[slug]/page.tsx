import { reader } from '@/lib/keystatic';
import { PersonHubPage } from '@/components/content/PersonHubPage';
import { getPersonHubUrl } from '@/lib/routes';

const SHOW = 'bergdoktor';

export async function generateStaticParams() {
  const persons = await reader.collections.persons.all();
  return persons
    .filter((p) => p.entry.show === SHOW && p.entry.status !== 'draft')
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = await reader.collections.persons.read(slug);
  if (!person) return {};
  return {
    title: person.seoTitle || person.name,
    description: person.seoDescription || person.intro || undefined,
    alternates: { canonical: getPersonHubUrl(slug, SHOW) },
    openGraph: {
      title: person.seoTitle || person.name,
      description: person.seoDescription || person.intro || undefined,
      images: person.featuredImage ? [person.featuredImage] : [],
    },
  };
}

export default async function BergdoktorPersonHub({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PersonHubPage slug={slug} show={SHOW} />;
}
