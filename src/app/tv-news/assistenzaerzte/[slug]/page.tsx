import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const [series, articles] = await Promise.all([
    reader.collections.series.all(),
    reader.collections.articles.all(),
  ]);
  const fromSeries = series.filter((s) => s.entry.seriesId === 'assistenzaerzte').map((s) => ({ slug: s.slug }));
  const fromArticles = articles.filter((a) => a.entry.type === 'serie' && a.entry.series === 'assistenzaerzte').map((a) => ({ slug: a.slug }));
  return [...fromSeries, ...fromArticles];
}

export default async function AssistenzaerzteArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Try series collection first, then articles
  const seriesArticle = await reader.collections.series.read(slug);
  const article = seriesArticle || await reader.collections.articles.read(slug);
  if (!article) notFound();

  return (
    <div data-theme="dark" className="bg-background text-foreground min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-wider text-brand-orange font-semibold">Die Assistenzärzte</span>
          <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-6">{article.title}</h1>
          <p className="text-lg text-foreground/80">{article.excerpt}</p>

          {'calloutQuestion' in article && article.calloutQuestion && (
            <div className="bg-surface-dark border-l-4 border-brand-orange p-6 rounded-lg my-8">
              <p className="font-semibold text-brand-orange">{article.calloutQuestion}</p>
              {'calloutAnswer' in article && <p className="mt-2 text-foreground/80">{article.calloutAnswer}</p>}
            </div>
          )}

          {'takeaways' in article && article.takeaways && article.takeaways.length > 0 && (
            <div className="bg-surface-dark rounded-lg p-6 mt-8">
              <h3 className="text-lg font-bold mb-4">Das Wichtigste</h3>
              <ul className="space-y-2">
                {article.takeaways.map((point: string, i: number) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-brand-orange">&#x2713;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {'faqItems' in article && article.faqItems && article.faqItems.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Häufige Fragen</h3>
              <div className="space-y-4">
                {article.faqItems.map((faq: { question: string; answer: string }, i: number) => (
                  <details key={i} className="bg-surface-dark rounded-lg p-4">
                    <summary className="font-semibold cursor-pointer">{faq.question}</summary>
                    <p className="mt-2 text-foreground/80">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
