import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';
import { ArticleBody } from '@/components/content/ArticleBody';

export async function generateStaticParams() {
  const articles = await reader.collections.articles.all();
  return articles
    .filter((a) => a.entry.type === 'cluster')
    .map((a) => ({ slug: a.slug }));
}

export default async function ClusterArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await reader.collections.articles.read(slug, { resolveLinkedFiles: true });
  if (!article) notFound();

  return (
    <div data-theme="dark" className="bg-background text-foreground min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-wider text-brand-orange font-semibold">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-6">{article.title}</h1>
          <p className="text-lg text-foreground/80 mb-8">{article.excerpt}</p>

          {article.calloutQuestion && (
            <div className="bg-surface-dark border-l-4 border-brand-orange p-6 rounded-lg mb-8">
              <p className="font-semibold text-brand-orange">{article.calloutQuestion}</p>
              <p className="mt-2 text-foreground/80">{article.calloutAnswer}</p>
            </div>
          )}

          <ArticleBody content={article.content} />

          {article.takeaways && article.takeaways.length > 0 && (
            <div className="bg-surface-dark rounded-lg p-6 mt-12">
              <h3 className="text-lg font-bold mb-4">Das Wichtigste</h3>
              <ul className="space-y-2">
                {article.takeaways.map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-brand-orange">&#x2713;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {article.faqItems && article.faqItems.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Häufige Fragen</h3>
              <div className="space-y-4">
                {article.faqItems.map((faq, i) => (
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
