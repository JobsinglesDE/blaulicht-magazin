import { HeartButton } from '@/components/ui/HeartButton';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { JsonLd, faqJsonLd } from '@/components/seo/JsonLd';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata = {
  title: 'Über uns — BlaulichtSingles.ch',
  description: 'Thomas Honold: Vom Küchenmeister und Marine-Koch zum Gründer des grössten Berufs-Dating-Netzwerks der Schweiz. Die Geschichte hinter BlaulichtSingles.ch.',
};

const faqItems = [
  {
    question: 'Wer steckt hinter BlaulichtSingles.ch?',
    answer: 'BlaulichtSingles.ch wurde von Thomas Honold gegründet. Er ist gelernter Koch und Küchenmeister, war CEO des Online-Bewertungssiegels Ausgezeichnet.org und hat 2008 das Jobsingles-Netzwerk ins Leben gerufen. Heute betreibt er zusätzlich seeside.ai — KI-Agentenlösungen für Solopreneure und Unternehmen.',
  },
  {
    question: 'Warum eine Dating-Plattform speziell für Blaulicht-Berufe?',
    answer: 'Menschen bei Polizei, Feuerwehr und Sanität arbeiten im Schichtdienst, erleben belastende Einsätze und haben wenig planbare Freizeit. Normale Dating-Plattformen berücksichtigen das nicht. BlaulichtSingles.ch verbindet Menschen, die diese Herausforderungen kennen — und genau deshalb besser zueinander passen.',
  },
  {
    question: 'Gehört BlaulichtSingles.ch zu einem grösseren Netzwerk?',
    answer: 'Ja. BlaulichtSingles.ch ist Teil des Jobsingles-Netzwerks mit über 15 berufsspezifischen Dating-Portalen, darunter FarmerSingles.de, MedicSingles.de und SingleBuure.ch. Seit 2018 läuft die Technik über den bewährten Icony-Verbund mit Schweizer Servern.',
  },
  {
    question: 'Wie schützt BlaulichtSingles.ch meine Daten?',
    answer: 'Alle Daten liegen auf Schweizer Servern und sind DSGVO-konform geschützt. Profile sind nicht öffentlich einsehbar, und du entscheidest selbst, welche Informationen du teilst. Gerade für Blaulicht-Berufe ist Diskretion besonders wichtig — das respektieren wir.',
  },
  {
    question: 'Was kostet BlaulichtSingles.ch?',
    answer: 'Die Registrierung und das Erstellen eines Profils sind kostenlos. Du kannst dich umschauen, Profile ansehen und erste Kontakte knüpfen, ohne etwas zu bezahlen. Für erweiterte Funktionen wie unbegrenztes Messaging gibt es Premium-Optionen.',
  },
];

export default function UeberUns() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqItems)} />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 particle-overlay opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 particle-text">Über uns</h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Vom Küchenmeister zum Dating-Unternehmer — die Geschichte hinter BlaulichtSingles.ch
          </p>
        </div>
      </section>

      {/* Story */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6">Die Geschichte</h2>
          <div className="prose prose-lg text-foreground/80 space-y-4">
            <p>
              <strong>BlaulichtSingles.ch</strong> ist kein Zufallsprodukt. Hinter der Plattform steht <strong>Thomas Honold</strong> — ein Mann, der selbst weiss, was es heisst, in einem Beruf zu arbeiten, der das Privatleben bestimmt.
            </p>
            <p>
              Thomas wuchs in Radolfzell am Bodensee auf und lernte das Kochen im elterlichen Restaurant <strong>Mettnaustube</strong> — schon als Schüler stand er in den Ferien und an Wochenenden in der Küche seines Vaters Manfred. Mit 19 begann er die Ausbildung zum Koch, arbeitete sich vom <em>Commis de Cuisine</em> über den <em>Chef de Partie</em> bis zum <strong>Küchenmeister</strong> hoch.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold mb-6">Marine, Sternehäuser und die Schweiz</h2>
          <div className="prose prose-lg text-foreground/80 space-y-4">
            <p>
              Dazwischen lag der <strong>Wehrdienst bei der Marine</strong> — als Koch auf Sylt und im Offiziersrestaurant des Marine-Hauptquartiers in Glücksburg. Danach die <strong>Deutsch-Französische Brigade</strong> in Donaueschingen, wo er zum Feldkoch ausgebildet wurde. Thomas kennt den militärischen Schichtdienst und die Belastung aus eigener Erfahrung.
            </p>
            <p>
              Seine kulinarische Reise führte ihn ins legendäre <strong>Hotel Traube Tonbach</strong> in Baiersbronn — eines der besten Restaurants Deutschlands. Und in die <strong>Hummer Bar des Hotel St. Gotthard</strong> in Zürich — seine erste Station in der Schweiz.
            </p>
            <p>
              2003 legte er die <strong>Meisterprüfung</strong> an der IHK Villingen ab und übernahm als <em>Chef de Cuisine</em> die Küchenleitung der Mettnaustube. Von 2009 bis 2015 führte er das Restaurant als selbständiger Geschäftsführer und Küchenchef.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold mb-6">Von der Küche ins Internet</h2>
          <div className="prose prose-lg text-foreground/80 space-y-4">
            <p>
              Parallel zur Gastronomie gründete Thomas <strong>2008 das Jobsingles-Netzwerk</strong> — mit einer einfachen Idee: Menschen, die den gleichen Beruf teilen, verstehen einander besser. Wer weiss, wie sich eine 14-Stunden-Schicht anfühlt, muss das dem Partner nicht erklären.
            </p>
            <p>
              Was als kleines Projekt begann, wuchs zu <strong>Deutschlands und der Schweiz grösstem berufsspezifischen Dating-Netzwerk</strong> — mit über 15 spezialisierten Portalen: FarmerSingles.de, MedicSingles.de, SingleBuure.ch und eben BlaulichtSingles.ch.
            </p>
            <p>
              Von 2018 bis 2022 war Thomas zusätzlich <strong>Geschäftsführer (CEO) der Aubii GmbH</strong> — dem Unternehmen hinter <strong>Ausgezeichnet.org</strong>, einem der führenden Online-Bewertungssiegel im deutschsprachigen Raum. Dort baute er das B2B-Geschäft auf, führte ein Team und lernte, wie man digitale Plattformen skaliert.
            </p>
            <p>
              Heute baut Thomas nicht nur das Jobsingles-Netzwerk weiter aus, sondern betreibt mit <strong><a href="https://seeside.ai" target="_blank" rel="noopener" className="text-brand-orange hover:underline">seeside.ai</a></strong> auch KI-Agentenlösungen für Solopreneure und Unternehmen. Die gesamte Infrastruktur hinter BlaulichtSingles.ch — von der automatisierten Content-Erstellung bis zur SEO-Optimierung — läuft auf seiner eigenen KI-Plattform.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold mb-6">Warum BlaulichtSingles.ch?</h2>
          <div className="prose prose-lg text-foreground/80 space-y-4">
            <p>
              Polizistinnen, Feuerwehrmänner, Sanitäterinnen und Ärzte teilen eine Realität, die Aussenstehende selten verstehen: Schichtdienst, Nachtarbeit, belastende Einsätze und wenig planbare Freizeit. Normale Dating-Plattformen ignorieren das.
            </p>
            <p>
              <strong>BlaulichtSingles.ch</strong> ist anders. Hier treffen sich Menschen, die wissen, was es heisst, um 3 Uhr morgens einen Notruf zu beantworten. Die verstehen, warum ein Wochenende nicht immer am Samstag beginnt. Die wissen, dass der beste Partner jemand ist, der diese Welt kennt.
            </p>
            <p>
              <strong>Schweizer Server. DSGVO-konform. Diskret.</strong> Weil gerade Blaulicht-Berufe besonderen Schutz verdienen.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Steckbrief */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold mb-6">Thomas Honold — Steckbrief</h2>
          <div className="rounded-2xl p-6 md:p-8 border border-foreground/10" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white">
              <div>
                <p className="text-brand-orange text-xs uppercase tracking-wide mb-1">Name</p>
                <p className="font-semibold">Thomas Honold</p>
              </div>
              <div>
                <p className="text-brand-orange text-xs uppercase tracking-wide mb-1">Rolle</p>
                <p className="font-semibold">Gründer & CEO Jobsingles-Netzwerk</p>
              </div>
              <div>
                <p className="text-brand-orange text-xs uppercase tracking-wide mb-1">Ausbildung</p>
                <p className="font-semibold">Koch & Küchenmeister (IHK)</p>
              </div>
              <div>
                <p className="text-brand-orange text-xs uppercase tracking-wide mb-1">Militär</p>
                <p className="font-semibold">Marine-Koch & Feldkoch (Bundeswehr)</p>
              </div>
              <div>
                <p className="text-brand-orange text-xs uppercase tracking-wide mb-1">Stationen</p>
                <p className="font-semibold">Traube Tonbach · Hummer Bar Zürich · Mettnaustube</p>
              </div>
              <div>
                <p className="text-brand-orange text-xs uppercase tracking-wide mb-1">Netzwerk seit</p>
                <p className="font-semibold">2008 — 15+ Dating-Portale</p>
              </div>
              <div>
                <p className="text-brand-orange text-xs uppercase tracking-wide mb-1">Kontakt</p>
                <p className="font-semibold">jobsingles@gmail.com</p>
              </div>
              <div>
                <p className="text-brand-orange text-xs uppercase tracking-wide mb-1">Standort</p>
                <p className="font-semibold">Radolfzell am Bodensee</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 id="haeufige-fragen" className="text-2xl font-bold mb-6 scroll-mt-24">Häufige Fragen</h2>
          <FAQAccordion items={faqItems} />
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <section className="text-center py-12 px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Bereit für die Partnersuche?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Tausende Blaulicht-Singles warten auf dich.
          </p>
          <HeartButton href="https://blaulichtsingles.ch/?AID=magazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
