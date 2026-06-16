// Custom next/image-Loader: liefert statische WebP direkt aus (kein Vercel-Optimizer
// -> keine Account-Quota/402) UND ergänzt den /magazin-basePath, den der Default-Loader
// bei "unoptimized" NICHT voranstellt (sonst 404 auf rohe <Image src="/images/...">).
// Idempotent — vertraegt sich mit withBasePath()-Stellen (kein Doppel-Prefix).
const BASE_PATH = '/magazin';

export default function imageLoader({ src }: { src: string; width: number; quality?: number }): string {
  if (src.startsWith('//') || /^[a-z]+:/i.test(src) || src.startsWith('#')) return src;
  if (src.startsWith(`${BASE_PATH}/`) || src === BASE_PATH) return src;
  if (src.startsWith('/')) return `${BASE_PATH}${src}`;
  return src;
}
