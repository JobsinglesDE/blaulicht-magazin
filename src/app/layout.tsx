import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { StickyCTA } from '@/components/ui/StickyCTA';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
});

const BASE_URL = 'https://blaulichtsingles.ch/magazin';

export const metadata: Metadata = {
  title: {
    default: 'Blaulicht Magazin — Dating für Blaulicht-Singles',
    template: '%s | Blaulicht Magazin',
  },
  description:
    'Das Magazin für Singles bei Polizei, Feuerwehr und Sanität. Partnersuche, Erfolgsgeschichten und regionale Tipps.',
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: 'Blaulicht Magazin — Dating für Blaulicht-Singles',
    description: 'Das Magazin für Singles bei Polizei, Feuerwehr und Sanität.',
    url: BASE_URL,
    type: 'website',
    siteName: 'Blaulicht Magazin',
    locale: 'de_CH',
    images: [{ url: `${BASE_URL}/images/hero-startseite.webp`, width: 1256, height: 710, alt: 'Blaulicht-Singles — Polizei, Feuerwehr, Sanität und Ärzte' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blaulicht Magazin — Dating für Blaulicht-Singles',
    description: 'Das Magazin für Singles bei Polizei, Feuerwehr und Sanität.',
    images: [`${BASE_URL}/images/hero-startseite.webp`],
  },
  verification: {
    google: 'wX9Cm671l9E8x5f5BB72cAo-r_RcVHKKk3Eu0rr-fZM',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider theme="light">
          <Header />
          <main className="flex-1 pt-20 pb-20 md:pb-0">{children}</main>
          <Footer />
          <StickyCTA />
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
