'use client';

import { useEffect, useRef } from 'react';

interface Vector2D { x: number; y: number }

class Particle {
  pos: Vector2D = { x: 0, y: 0 };
  vel: Vector2D = { x: 0, y: 0 };
  acc: Vector2D = { x: 0, y: 0 };
  target: Vector2D = { x: 0, y: 0 };
  closeEnoughTarget = 100;
  maxSpeed = 1.0;
  maxForce = 0.1;
  particleSize = 10;
  isKilled = false;
  startColor = { r: 0, g: 0, b: 0 };
  targetColor = { r: 0, g: 0, b: 0 };
  colorWeight = 0;
  colorBlendRate = 0.01;

  move() {
    let proximityMult = 1;
    const dx = this.pos.x - this.target.x;
    const dy = this.pos.y - this.target.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < this.closeEnoughTarget) proximityMult = distance / this.closeEnoughTarget;

    const tx = this.target.x - this.pos.x;
    const ty = this.target.y - this.pos.y;
    const mag = Math.sqrt(tx * tx + ty * ty);
    const towards = mag > 0
      ? { x: (tx / mag) * this.maxSpeed * proximityMult, y: (ty / mag) * this.maxSpeed * proximityMult }
      : { x: 0, y: 0 };

    const sx = towards.x - this.vel.x;
    const sy = towards.y - this.vel.y;
    const sm = Math.sqrt(sx * sx + sy * sy);
    if (sm > 0) {
      this.acc.x += (sx / sm) * this.maxForce;
      this.acc.y += (sy / sm) * this.maxForce;
    }

    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.acc.x = 0;
    this.acc.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.colorWeight < 1.0) this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0);
    const r = Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight);
    const g = Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight);
    const b = Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
  }

  kill(w: number, h: number) {
    if (this.isKilled) return;
    const angle = Math.random() * Math.PI * 2;
    const dist = (w + h) / 2;
    this.target.x = w / 2 + Math.cos(angle) * dist;
    this.target.y = h / 2 + Math.sin(angle) * dist;
    this.startColor = {
      r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
      g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
      b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
    };
    this.targetColor = { r: 0, g: 0, b: 0 };
    this.colorWeight = 0;
    this.isKilled = true;
  }
}

interface ParticleTextProps {
  /** Single text (legacy) */
  text?: string;
  /** Multiple texts to rotate through */
  texts?: string[];
  className?: string;
  /** Colors cycle: default brand-orange → primary-light */
  colors?: Array<{ r: number; g: number; b: number }>;
}

// Blaulicht brand colors
const BRAND_COLORS = [
  { r: 255, g: 122, b: 0 },   // brand-orange #FF7A00
  { r: 74, g: 144, b: 217 },  // primary-light #4A90D9
  { r: 233, g: 195, b: 73 },  // secondary #e9c349
];

export function ParticleText({ text, texts, className = '', colors = BRAND_COLORS }: ParticleTextProps) {
  const allTexts = texts && texts.length > 0 ? texts : text ? [text] : [''];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const colorIdx = useRef(0);
  const textIdx = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;

    function spawnText(word: string) {
      const off = document.createElement('canvas');
      off.width = w;
      off.height = h;
      const oc = off.getContext('2d')!;

      // Split: first word on line 1, rest on line 2
      const words = word.split(' ');
      let lines: string[];
      if (words.length === 1) {
        lines = [word];
      } else {
        lines = [words[0], words.slice(1).join(' ')];
      }

      // Calculate font size — measure actual text width to prevent clipping
      const isMobile = w < 500;
      const usableWidth = w * (isMobile ? 0.9 : 0.85);
      const maxH = h / (lines.length * 1.4);
      let fontSize = Math.min(maxH, isMobile ? 80 : 120); // start large
      oc.font = `bold ${fontSize}px Arial`;
      // Shrink until longest line fits
      const longestLine = lines.reduce((a, b) => a.length > b.length ? a : b);
      while (fontSize > 12 && oc.measureText(longestLine).width > usableWidth) {
        fontSize -= 2;
        oc.font = `bold ${fontSize}px Arial`;
      }
      oc.fillStyle = 'white';
      oc.textAlign = 'center';
      oc.textBaseline = 'middle';

      const lineHeight = fontSize * 1.15;
      const startY = h / 2 - ((lines.length - 1) * lineHeight) / 2;
      const centerX = w / 2;
      for (let i = 0; i < lines.length; i++) {
        oc.fillText(lines[i], centerX, startY + i * lineHeight);
      }

      const imgData = oc.getImageData(0, 0, w, h).data;
      const color = colors[colorIdx.current % colors.length];
      colorIdx.current++;
      const particles = particlesRef.current;
      let pi = 0;
      const step = isMobile ? 2 : 4; // much more particles on mobile for sharp text

      const coords: number[] = [];
      for (let i = 0; i < imgData.length; i += step * 4) coords.push(i);
      for (let i = coords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [coords[i], coords[j]] = [coords[j], coords[i]];
      }

      for (const ci of coords) {
        if (imgData[ci + 3] > 0) {
          const x = (ci / 4) % w;
          const y = Math.floor(ci / 4 / w);
          let p: Particle;
          if (pi < particles.length) {
            p = particles[pi];
            p.isKilled = false;
          } else {
            p = new Particle();
            const angle = Math.random() * Math.PI * 2;
            const dist = (w + h) / 2;
            p.pos.x = w / 2 + Math.cos(angle) * dist;
            p.pos.y = h / 2 + Math.sin(angle) * dist;
            p.maxSpeed = isMobile ? Math.random() * 8 + 6 : Math.random() * 6 + 4;
            p.maxForce = p.maxSpeed * (isMobile ? 0.08 : 0.05);
            p.particleSize = Math.random() * 6 + 6;
            p.colorBlendRate = Math.random() * 0.0275 + 0.0025;
            particles.push(p);
          }
          p.startColor = {
            r: p.startColor.r + (p.targetColor.r - p.startColor.r) * p.colorWeight,
            g: p.startColor.g + (p.targetColor.g - p.startColor.g) * p.colorWeight,
            b: p.startColor.b + (p.targetColor.b - p.startColor.b) * p.colorWeight,
          };
          p.targetColor = color;
          p.colorWeight = 0;
          p.target.x = x;
          p.target.y = y;
          pi++;
        }
      }
      for (let i = pi; i < particles.length; i++) particles[i].kill(w, h);
    }

    // Get page background color for canvas trail
    const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--background').trim() || '#FDFBF7';

    function animate() {
      // Use page background with low opacity for trail effect
      const r = parseInt(bgColor.slice(1, 3), 16) || 253;
      const g = parseInt(bgColor.slice(3, 5), 16) || 251;
      const b = parseInt(bgColor.slice(5, 7), 16) || 247;
      const trailOpacity = w < 500 ? 0.35 : 0.15; // much faster fade on mobile = no italic trails
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${trailOpacity})`;
      ctx.fillRect(0, 0, w, h);
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].move();
        particles[i].draw(ctx);
        if (particles[i].isKilled) {
          const { x, y } = particles[i].pos;
          if (x < 0 || x > w || y < 0 || y > h) particles.splice(i, 1);
        }
      }
      animRef.current = requestAnimationFrame(animate);
    }

    spawnText(allTexts[0]);
    textIdx.current = 1;
    animate();

    // Re-trigger with next text + color every 8 seconds
    const interval = setInterval(() => {
      const nextText = allTexts[textIdx.current % allTexts.length];
      textIdx.current++;
      spawnText(nextText);
    }, 8000);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      clearInterval(interval);
    };
  }, [allTexts, colors]);

  return (
    <div className={`relative ${className}`} style={{ minHeight: '120px' }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full rounded-lg" />
    </div>
  );
}
