#!/usr/bin/env node
// Generiert Header-Bilder für 14 fehlende Bekanntschaften-Städte
// FLUX.2-pro → 1440x768 → Upscale 2x → Filter 1+3 (warm tint + grain) → 1256x710 WebP
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const API_KEY = process.env.TOGETHER_API_KEY;
if (!API_KEY) {
  console.error('FATAL: TOGETHER_API_KEY env var fehlt');
  process.exit(1);
}
const OUT_ROOT = '/docker/projects/blaulicht-magazin/public/images/bekanntschaften';

const CITIES = {
  'aarau': {
    name: 'Aarau',
    scene: 'Aarau old town with famous painted eaves (Dachhimmel), medieval alleys, Aare river in background, late afternoon warm light',
  },
  'baden': {
    name: 'Baden',
    scene: 'Baden Switzerland Limmat riverside promenade, thermal spa old town architecture, stone bridge over turquoise river, golden hour',
  },
  'bellinzona': {
    name: 'Bellinzona',
    scene: 'Bellinzona UNESCO castle Castelgrande on hill above town, Italian-Swiss Ticino rooftops, warm Mediterranean afternoon light',
  },
  'biel': {
    name: 'Biel/Bienne',
    scene: 'Biel Bienne lakefront promenade, bilingual Swiss city, lake Biel with mountains, modern buildings near old town, soft overcast light',
  },
  'chur': {
    name: 'Chur',
    scene: 'Chur Switzerland old town narrow alleys, Rhaetian Alps dramatic backdrop, church tower, cobblestones, crisp alpine light',
  },
  'emmen': {
    name: 'Emmen',
    scene: 'Emmen near Lucerne aerial view, Mount Pilatus in background, modern Swiss town with Reuss river, residential neighborhood, warm daylight',
  },
  'kloten': {
    name: 'Kloten',
    scene: 'Kloten town centre near Zurich airport, modern Swiss suburban architecture, tree-lined street, airplane contrail in blue sky',
  },
  'lugano': {
    name: 'Lugano',
    scene: 'Lugano lakefront with palm trees, Italian-style piazza, Monte San Salvatore in background, Mediterranean Ticino atmosphere, golden light',
  },
  'neuenburg': {
    name: 'Neuchâtel',
    scene: 'Neuchâtel yellow-stone Collégiale church above lake, medieval castle, French-Swiss lakefront old town, soft late afternoon light',
  },
  'rapperswil': {
    name: 'Rapperswil',
    scene: 'Rapperswil rose town with castle on hill, wooden Seedamm bridge over upper Lake Zurich, Alps backdrop, warm summer light',
  },
  'schaffhausen': {
    name: 'Schaffhausen',
    scene: 'Schaffhausen Munot circular fortress above old town rooftops, Rhine river bend, ornate painted house facades, crisp morning light',
  },
  'sion': {
    name: 'Sion',
    scene: 'Sion Wallis twin hills with Valère basilica and Tourbillon castle ruins, Rhône valley vineyards, Alps, bright mountain sunlight',
  },
  'thun': {
    name: 'Thun',
    scene: 'Thun castle above old town, Lake Thun turquoise water, Eiger Mönch Jungfrau Alps panorama, covered wooden bridge, golden hour',
  },
  'uster': {
    name: 'Uster',
    scene: 'Uster Zurich Oberland town near Greifensee lake, historic cotton-mill industrial heritage, green rolling hills, soft afternoon light',
  },
};

const COMMON = [
  'atmospheric Swiss cityscape photography',
  'no people visible in foreground',
  'cinematic wide shot, 16:9 aspect',
  'subtle emergency vehicle or blue flashing light in far distance as tiny hint of rescue services theme',
  'warm authentic tone, slightly muted colors',
  'editorial photography style, shot on Canon EOS R5 24mm f/4',
];

async function genOne(slug, city) {
  const outDir = path.join(OUT_ROOT, `bekanntschaften-${slug}`);
  const outPath = path.join(outDir, `bekanntschaften-${slug}.webp`);
  if (fs.existsSync(outPath)) { console.log(`⏭  ${slug}: bereits vorhanden`); return; }
  fs.mkdirSync(outDir, { recursive: true });

  const prompt = [city.scene, ...COMMON].join(', ');
  console.log(`→ ${slug} …`);
  const res = await fetch('https://api.together.xyz/v1/images/generations', {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'black-forest-labs/FLUX.2-pro', prompt, width: 1440, height: 768, n: 1 }),
  });
  if (!res.ok) throw new Error(`${slug}: API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const imgUrl = data.data?.[0]?.url;
  if (!imgUrl) throw new Error(`${slug}: no URL in response`);
  const buf = Buffer.from(await (await fetch(imgUrl)).arrayBuffer());

  // Upscale 2x (2880x1536) sharp lanczos3 then filter
  const upscaled = await sharp(buf).resize(2880, 1536, { kernel: 'lanczos3' }).toBuffer();
  const { width: w, height: h } = await sharp(upscaled).metadata();

  // Filter 1: warm tint + gamma + desat. Filter 3: grain
  const grain = Buffer.alloc(w * h * 3);
  for (let i = 0; i < grain.length; i++) grain[i] = 128 + Math.floor((Math.random() - 0.5) * 25);
  const grainBuf = await sharp(grain, { raw: { width: w, height: h, channels: 3 } }).png().toBuffer();

  const styled = await sharp(upscaled)
    .modulate({ brightness: 1.03, saturation: 0.80 })
    .tint({ r: 255, g: 228, b: 192 })
    .gamma(1.05)
    .composite([{ input: grainBuf, blend: 'overlay', opacity: 0.10 }])
    .sharpen({ sigma: 0.8 })
    .toBuffer();

  // Final: 1256x710 WebP (matches existing reference)
  await sharp(styled).resize(1256, 710, { fit: 'cover', position: 'center' }).webp({ quality: 85 }).toFile(outPath);
  const size = fs.statSync(outPath).size;
  console.log(`✓ ${slug} → ${(size/1024).toFixed(0)} KB`);
}

const slugs = Object.keys(CITIES);
console.log(`Generiere ${slugs.length} Bekanntschaften-Header…`);
for (const slug of slugs) {
  try { await genOne(slug, CITIES[slug]); }
  catch (e) { console.error(`✗ ${slug}:`, e.message); }
  await new Promise(r => setTimeout(r, 1500)); // rate limit
}
console.log('Fertig.');
