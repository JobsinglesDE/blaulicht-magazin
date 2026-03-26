import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'JobsinglesDE/blaulicht-magazin',
  },
  ui: {
    brand: { name: 'Blaulicht Magazin' },
  },
  collections: {
    articles: collection({
      label: 'Artikel',
      slugField: 'title',
      path: 'content/articles/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        category: fields.select({
          label: 'Kategorie',
          defaultValue: 'polizei',
          options: [
            { label: 'Polizei', value: 'polizei' },
            { label: 'Sanität', value: 'sanitaet' },
            { label: 'Partnersuche', value: 'partnersuche' },
          ],
        }),
        type: fields.select({
          label: 'Typ',
          defaultValue: 'cluster',
          options: [
            { label: 'Cluster', value: 'cluster' },
            { label: 'Regional', value: 'regional' },
            { label: 'Serie', value: 'serie' },
            { label: 'Story', value: 'story' },
          ],
        }),
        series: fields.select({
          label: 'Serie',
          defaultValue: '',
          options: [
            { label: 'Keine', value: '' },
            { label: 'Die Assistenzärzte (SRF)', value: 'assistenzaerzte' },
            { label: 'Tatort Zürich (SRF)', value: 'tatort-zuerich' },
          ],
        }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Beitragsbild',
          directory: 'public/images/articles',
          publicPath: '/images/articles/',
        }),
        author: fields.relationship({
          label: 'Autor',
          collection: 'authors',
        }),
        calloutQuestion: fields.text({ label: 'Callout Frage' }),
        calloutAnswer: fields.text({ label: 'Callout Antwort', multiline: true }),
        content: fields.markdoc({ label: 'Inhalt' }),
        faqItems: fields.array(
          fields.object({
            question: fields.text({ label: 'Frage' }),
            answer: fields.text({ label: 'Antwort', multiline: true }),
          }),
          {
            label: 'FAQ',
            itemLabel: (props) => props.fields.question.value,
          }
        ),
        takeaways: fields.array(fields.text({ label: 'Punkt' }), {
          label: 'Das Wichtigste',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung' }),
        publishedAt: fields.date({ label: 'Veröffentlicht am' }),
        theme: fields.select({
          label: 'Theme',
          defaultValue: 'dark',
          options: [
            { label: 'Dark', value: 'dark' },
            { label: 'Light', value: 'light' },
          ],
        }),
      },
    }),

    pillars: collection({
      label: 'Pillar-Seiten',
      slugField: 'title',
      path: 'content/pillars/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Hero-Bild',
          directory: 'public/images/pillars',
          publicPath: '/images/pillars/',
        }),
        content: fields.markdoc({ label: 'Inhalt' }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung' }),
        theme: fields.select({
          label: 'Theme',
          defaultValue: 'light',
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ],
        }),
      },
    }),

    regional: collection({
      label: 'Regional',
      slugField: 'title',
      path: 'content/regional/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        kanton: fields.text({ label: 'Kanton' }),
        city: fields.text({ label: 'Stadt (optional)' }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Ortsbild',
          directory: 'public/images/regional',
          publicPath: '/images/regional/',
        }),
        content: fields.markdoc({ label: 'Inhalt' }),
        faqItems: fields.array(
          fields.object({
            question: fields.text({ label: 'Frage' }),
            answer: fields.text({ label: 'Antwort', multiline: true }),
          }),
          {
            label: 'FAQ',
            itemLabel: (props) => props.fields.question.value,
          }
        ),
        takeaways: fields.array(fields.text({ label: 'Punkt' }), {
          label: 'Das Wichtigste',
        }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung' }),
        publishedAt: fields.date({ label: 'Veröffentlicht am' }),
      },
    }),

    series: collection({
      label: 'Serien',
      slugField: 'title',
      path: 'content/series/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        seriesId: fields.select({
          label: 'Serie',
          defaultValue: 'assistenzaerzte',
          options: [
            { label: 'Die Assistenzärzte (SRF)', value: 'assistenzaerzte' },
            { label: 'Tatort Zürich (SRF)', value: 'tatort-zuerich' },
          ],
        }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Bild',
          directory: 'public/images/series',
          publicPath: '/images/series/',
        }),
        content: fields.markdoc({ label: 'Inhalt' }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung' }),
        publishedAt: fields.date({ label: 'Veröffentlicht am' }),
      },
    }),

    stories: collection({
      label: 'Erfolgsgeschichten',
      slugField: 'title',
      path: 'content/stories/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        couple: fields.text({ label: 'Paar-Namen' }),
        location: fields.text({ label: 'Ort' }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Paar-Foto',
          directory: 'public/images/stories',
          publicPath: '/images/stories/',
        }),
        content: fields.markdoc({ label: 'Geschichte' }),
        publishedAt: fields.date({ label: 'Veröffentlicht am' }),
      },
    }),

    authors: collection({
      label: 'Autoren',
      slugField: 'name',
      path: 'content/authors/*',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Rolle' }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        avatar: fields.image({
          label: 'Profilbild',
          directory: 'public/images/authors',
          publicPath: '/images/authors/',
        }),
        socialLinks: fields.array(
          fields.object({
            platform: fields.text({ label: 'Plattform' }),
            url: fields.url({ label: 'URL' }),
          }),
          { label: 'Social Links' }
        ),
      },
    }),
  },
});
