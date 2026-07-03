#!/usr/bin/env node
// Guard-sicher: Together-Key wird intern aus dem Vault gelesen (kein Leak, kein Hardcode).
// FLUX.2-pro, response_format b64_json (Together-CDN 403-Fix), 1200x640 (/16-teilbar).
import fs from 'fs';
import sharp from 'sharp';

const VAULT = '/docker/projects/obsidian-vault/Tommy/Business/Zugangsdaten.md';
const KEY = (fs.readFileSync(VAULT, 'utf8').match(/tgp_v1_[A-Za-z0-9]+/) || [])[0];
if (!KEY) { console.error('Together-Key nicht im Vault gefunden'); process.exit(1); }

const W = 1200, H = 640;
const prompt = `Two Swiss police officers (a woman and a man, late 20s to 30s, generic faces, not identifiable, mixed backgrounds) standing side by side in dark blue Swiss police uniforms with rank insignia on the shoulder boards, in front of a modern Swiss city street at blue-hour dusk, soft warm street lights in the bokeh background. Calm, confident, professional posture. photorealistic, Canon R5 85mm f/1.4, natural skin texture with visible pores and subtle wrinkles, shallow depth of field, documentary photography, no plastic look, no readable text, no logos, no license plates, no brand names.`;

const res = await fetch('https://api.together.xyz/v1/images/generations', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${KEY}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ model: 'black-forest-labs/FLUX.2-pro', prompt, width: W, height: H, n: 1, response_format: 'b64_json' }),
});
if (!res.ok) { console.error('Err:', res.status, await res.text()); process.exit(1); }
const data = await res.json();
const b64 = data.data[0].b64_json;
const imgBuf = Buffer.from(b64, 'base64');

const { width: w, height: h } = await sharp(imgBuf).metadata();
const grain = Buffer.alloc(w * h * 3);
for (let i = 0; i < grain.length; i++) grain[i] = 128 + Math.floor((Math.random() - 0.5) * 30);
const grainBuf = await sharp(grain, { raw: { width: w, height: h, channels: 3 } }).png().toBuffer();
const styled = await sharp(imgBuf)
  .modulate({ brightness: 1.02, saturation: 0.85 })
  .gamma(1.04)
  .composite([{ input: grainBuf, blend: 'overlay', opacity: 0.11 }])
  .webp({ quality: 85 }).toBuffer();

const outDir = '/docker/projects/blaulicht-magazin/public/images/articles/polizei-dienstgrade-schweiz';
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(`${outDir}/polizei-dienstgrade-schweiz.webp`, styled);
console.log(`OK dienstgrade hero: ${(styled.length/1024).toFixed(0)} KB (${w}x${h})`);
