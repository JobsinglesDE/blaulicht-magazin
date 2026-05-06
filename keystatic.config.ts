import { config, fields, collection, singleton } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

const articleComponents = {
  youtube: block({
    label: 'YouTube',
    schema: {
      url: fields.url({ label: 'URL', description: 'YouTube watch- oder Shorts-URL' }),
      title: fields.text({ label: 'Titel', description: 'Optional', }),
    },
  }),
};

export default config({
  storage: {
    kind: 'github',
    repo: 'JobsinglesDE/blaulicht-magazin',
  },
  ui: {
    brand: { name: 'Blaulicht Magazin' },
  },
  singletons: {
    regionalPolizei: singleton({
      label: 'Regional — Polizei (Pillar-Page)',
      path: 'content/singletons/regional-polizei',
      schema: {
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung', multiline: true }),
        intro1: fields.text({ label: 'Intro Absatz 1', multiline: true }),
        intro2: fields.text({ label: 'Intro Absatz 2', multiline: true }),
      },
    }),
    regionalSanitaet: singleton({
      label: 'Regional — Sanität (Pillar-Page)',
      path: 'content/singletons/regional-sanitaet',
      schema: {
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung', multiline: true }),
        intro1: fields.text({ label: 'Intro Absatz 1', multiline: true }),
        intro2: fields.text({ label: 'Intro Absatz 2', multiline: true }),
      },
    }),
    regionalFeuerwehr: singleton({
      label: 'Regional — Feuerwehr (Pillar-Page)',
      path: 'content/singletons/regional-feuerwehr',
      schema: {
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung', multiline: true }),
        intro1: fields.text({ label: 'Intro Absatz 1', multiline: true }),
        intro2: fields.text({ label: 'Intro Absatz 2', multiline: true }),
      },
    }),
  },
  collections: {
    articles: collection({
      label: 'Artikel',
      slugField: 'title',
      path: 'content/articles/*',
      columns: ['publishedAt', 'title', 'category'],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        focusKeyword: fields.text({
          label: 'Focus-Keyword',
          description: 'Haupt-Keyword fuer SEO-Check (z.B. "Hans Sigl Bergdoktor"). Aktiviert 7 Yoast-Style-Checks im SEO-Score-Widget.',
        }),
        category: fields.select({
          label: 'Kategorie',
          defaultValue: 'polizei',
          options: [
            { label: 'Polizei', value: 'polizei' },
            { label: 'Feuerwehr', value: 'feuerwehr' },
            { label: 'Sanität', value: 'sanitaet' },
            { label: 'Partnersuche', value: 'partnersuche' },
            { label: 'TV News', value: 'tv-news' },
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
            { label: 'Die Assistenzärzte (Schweizer Fernsehen)', value: 'assistenzaerzte' },
            { label: 'Tatort Zürich (Schweizer Fernsehen)', value: 'tatort-zuerich' },
          ],
        }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Beitragsbild',
          directory: 'public/images/articles',
          publicPath: '/images/articles/',
        }),
        featuredImageAlt: fields.text({
          label: 'Alt-Text Beitragsbild',
          description: 'Beschreibung des Bild-Motivs (SEO + Barrierefreiheit). Beispiel: "Hans Sigl im weißen Arztkittel vor Bergpanorama". Falls leer, wird der Artikel-Titel als Fallback genutzt.',
        }),
        featuredImageCredit: fields.text({
          label: 'Bild-Credit',
          description: 'Urhebernennung unter dem Bild. Beispiel: "Foto: ZDF/Sabine Finger Fotografie" oder "© Superbass / CC BY-SA 4.0 via Wikimedia Commons". Pflicht bei Pressebildern.',
        }),
        author: fields.relationship({
          label: 'Autor',
          collection: 'authors',
        }),
        calloutQuestion: fields.text({ label: 'Callout Frage' }),
        calloutAnswer: fields.text({ label: 'Callout Antwort', multiline: true }),
        content: fields.markdoc({ label: 'Inhalt', components: articleComponents }),
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
        status: fields.select({
          label: 'Status',
          defaultValue: 'published',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
        }),
        isNews: fields.checkbox({ label: 'News-Artikel (NewsArticle JSON-LD)', defaultValue: false }),
        isFeatured: fields.checkbox({ label: 'Auf ICONY-Startseite anzeigen (max. 3)', defaultValue: false }),
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

    regional: collection({
      label: 'Regional',
      slugField: 'title',
      path: 'content/regional/*',
      columns: ['publishedAt', 'kanton', 'title'],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        focusKeyword: fields.text({
          label: 'Focus-Keyword',
          description: 'Haupt-Keyword fuer SEO-Check (z.B. "Hans Sigl Bergdoktor"). Aktiviert 7 Yoast-Style-Checks im SEO-Score-Widget.',
        }),
        beruf: fields.select({
          label: 'Beruf',
          defaultValue: 'polizei',
          options: [
            { label: 'Polizei', value: 'polizei' },
            { label: 'Sanität', value: 'sanitaet' },
            { label: 'Feuerwehr', value: 'feuerwehr' },
          ],
        }),
        kanton: fields.text({ label: 'Kanton' }),
        city: fields.text({ label: 'Stadt (optional)' }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Ortsbild',
          directory: 'public/images/regional',
          publicPath: '/images/regional/',
        }),
        featuredImageAlt: fields.text({
          label: 'Alt-Text Ortsbild',
          description: 'Beschreibung des Bild-Motivs (SEO + Barrierefreiheit). Falls leer → Titel als Fallback.',
        }),
        featuredImageCredit: fields.text({
          label: 'Bild-Credit',
          description: 'Urhebernennung unter dem Bild. Beispiel: "Foto: ZDF/Sabine Finger Fotografie" oder "© Superbass / CC BY-SA 4.0 via Wikimedia Commons". Pflicht bei Pressebildern.',
        }),
        content: fields.markdoc({ label: 'Inhalt', components: articleComponents }),
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

    bekanntschaften: collection({
      label: 'Bekanntschaften',
      slugField: 'title',
      path: 'content/bekanntschaften/*',
      columns: ['publishedAt', 'city', 'title'],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        focusKeyword: fields.text({
          label: 'Focus-Keyword',
          description: 'Haupt-Keyword fuer SEO-Check (z.B. "Hans Sigl Bergdoktor"). Aktiviert 7 Yoast-Style-Checks im SEO-Score-Widget.',
        }),
        city: fields.text({ label: 'Stadt' }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Stadtbild',
          directory: 'public/images/bekanntschaften',
          publicPath: '/images/bekanntschaften/',
        }),
        featuredImageAlt: fields.text({
          label: 'Alt-Text Stadtbild',
          description: 'Beschreibung des Bild-Motivs (SEO + Barrierefreiheit). Falls leer → Titel als Fallback.',
        }),
        featuredImageCredit: fields.text({
          label: 'Bild-Credit',
          description: 'Urhebernennung unter dem Bild. Beispiel: "Foto: ZDF/Sabine Finger Fotografie" oder "© Superbass / CC BY-SA 4.0 via Wikimedia Commons". Pflicht bei Pressebildern.',
        }),
        content: fields.markdoc({ label: 'Inhalt', components: articleComponents }),
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
      label: 'TV News',
      slugField: 'title',
      path: 'content/series/*',
      columns: ['publishedAt', 'seriesId', 'title', 'status'],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        focusKeyword: fields.text({
          label: 'Focus-Keyword',
          description: 'Haupt-Keyword fuer SEO-Check (z.B. "Hans Sigl Bergdoktor"). Aktiviert 7 Yoast-Style-Checks im SEO-Score-Widget.',
        }),
        status: fields.select({
          label: 'Status',
          defaultValue: 'published',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
        }),
        seriesId: fields.select({
          label: 'Serie',
          defaultValue: 'tatort-zuerich',
          options: [
            { label: 'Tatort Zürich (Schweizer Fernsehen)', value: 'tatort-zuerich' },
            { label: 'Der Bergdoktor (ZDF)', value: 'bergdoktor' },
          ],
        }),
        isNews: fields.checkbox({ label: 'News-Artikel (NewsArticle JSON-LD)', defaultValue: false }),
        theme: fields.select({
          label: 'Theme',
          defaultValue: 'dark',
          options: [
            { label: 'Dark', value: 'dark' },
            { label: 'Light', value: 'light' },
          ],
        }),
        author: fields.relationship({ label: 'Autor', collection: 'authors' }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Bild',
          directory: 'public/images/articles',
          publicPath: '/images/articles/',
        }),
        featuredImageAlt: fields.text({
          label: 'Alt-Text Bild',
          description: 'Beschreibung des Bild-Motivs (SEO + Barrierefreiheit). Falls leer → Titel als Fallback.',
        }),
        featuredImageCredit: fields.text({
          label: 'Bild-Credit',
          description: 'Urhebernennung unter dem Bild. Beispiel: "Foto: ZDF/Sabine Finger Fotografie" oder "© Superbass / CC BY-SA 4.0 via Wikimedia Commons". Pflicht bei Pressebildern.',
        }),
        calloutQuestion: fields.text({ label: 'Callout Frage' }),
        calloutAnswer: fields.text({ label: 'Callout Antwort', multiline: true }),
        content: fields.markdoc({ label: 'Inhalt', components: articleComponents }),
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
        takeaways: fields.array(fields.text({ label: 'Punkt' }), { label: 'Das Wichtigste' }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung' }),
        publishedAt: fields.date({ label: 'Veröffentlicht am' }),
      },
    }),

    stories: collection({
      label: 'Erfolgsgeschichten',
      slugField: 'title',
      path: 'content/stories/*',
      columns: ['publishedAt', 'couple', 'location'],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        focusKeyword: fields.text({
          label: 'Focus-Keyword',
          description: 'Haupt-Keyword fuer SEO-Check (z.B. "Hans Sigl Bergdoktor"). Aktiviert 7 Yoast-Style-Checks im SEO-Score-Widget.',
        }),
        couple: fields.text({ label: 'Paar-Namen' }),
        location: fields.text({ label: 'Ort' }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Paar-Foto',
          directory: 'public/images/stories',
          publicPath: '/images/stories/',
        }),
        featuredImageAlt: fields.text({
          label: 'Alt-Text Paar-Foto',
          description: 'Beschreibung des Bild-Motivs (SEO + Barrierefreiheit). Falls leer → Titel als Fallback.',
        }),
        featuredImageCredit: fields.text({
          label: 'Bild-Credit',
          description: 'Urhebernennung unter dem Bild. Beispiel: "Foto: ZDF/Sabine Finger Fotografie" oder "© Superbass / CC BY-SA 4.0 via Wikimedia Commons". Pflicht bei Pressebildern.',
        }),
        content: fields.markdoc({ label: 'Geschichte' }),
        isFeatured: fields.checkbox({ label: 'Auf ICONY-Startseite anzeigen (max. 3)', defaultValue: false }),
        publishedAt: fields.date({ label: 'Veröffentlicht am' }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung' }),
      },
    }),

    authors: collection({
      label: 'Autoren',
      slugField: 'name',
      path: 'content/authors/*',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Rolle' }),
        bio: fields.text({ label: 'Kurz-Bio (Artikel-Box)', multiline: true }),
        longBio: fields.text({ label: 'Ausführliche Bio (Autoren-Seite)', multiline: true }),
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
