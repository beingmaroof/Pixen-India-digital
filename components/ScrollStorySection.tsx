"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 240;

const stages = [
  {
    range: [0, 0.20] as [number, number],
    position: 'center' as const,
    eyebrow: 'Stage 01 — Foundation',
    heading: 'Growth doesn\'t start\nwith ads.',
    subheading: 'It starts with structure.',
    body: '',
  },
  {
    range: [0.20, 0.45] as [number, number],
    position: 'left' as const,
    eyebrow: 'Stage 02 — Systems',
    heading: 'Systems.\nStrategy. Data.',
    subheading: '',
    body: 'We build the foundation your growth depends on — data architectures, conversion funnels, and automated pipelines that compound over time.',
  },
  {
    range: [0.45, 0.70] as [number, number],
    position: 'right' as const,
    eyebrow: 'Stage 03 — Intelligence',
    heading: 'AI-powered\nfunnels.',
    subheading: 'Smart automation. Real-time optimization.',
    body: 'Your business starts learning and scaling with every touchpoint.',
  },
  {
    range: [0.70, 0.90] as [number, number],
    position: 'center' as const,
    eyebrow: 'Stage 04 — Acceleration',
    heading: 'From clicks…\nto customers.',
    subheading: 'From traffic… to revenue.',
    body: '',
  },
  {
    range: [0.90, 1.00] as [number, number],
    position: 'center' as const,
    eyebrow: 'Stage 05 — Dominance',
    heading: 'We Build Revenue-\nGenerating Growth Systems.',
    subheading: 'Not Just Marketing Campaigns.',
    body: '',
    isFinal: true,
  },
];

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function StageOverlay({
  stage,
  progress,
  onAuditClick,
  onCaseStudiesClick,
}: {
  stage: typeof stages[0];
  progress: number;
  onAuditClick: () => void;
  onCaseStudiesClick: () => void;
}) {
  const [start, end] = stage.range;
  const stageLen = end - start;
  const stageProgress = Math.max(0, Math.min(1, (progress - start) / stageLen));

  // Fade in during first 20%, full from 20–80%, fade out last 20%
  let opacity = 0;
  if (stageProgress < 0.2) opacity = stageProgress / 0.2;
  else if (stageProgress > 0.8) opacity = 1 - (stageProgress - 0.8) / 0.2;
  else opacity = 1;

  const translateY = stageProgress < 0.2 ? (1 - stageProgress / 0.2) * 30 : 0;
  const isVisible = opacity > 0.01;

  if (!isVisible) return null;

  const positionClass = stage.position === 'left'
    ? 'items-start text-left pl-8 lg:pl-16'
    : stage.position === 'right'
    ? 'items-end text-right pr-8 lg:pr-16'
    : 'items-center text-center';

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-center ${positionClass} pointer-events-none`}
      style={{ opacity, transform: `translateY(${translateY}px)`, transition: 'none' }}
    >
      <div className={`max-w-lg ${stage.position === 'center' ? 'mx-auto' : ''}`}>
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-4" style={{ justifyContent: stage.position === 'center' ? 'center' : stage.position === 'right' ? 'flex-end' : 'flex-start' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-purple-400">
            {stage.eyebrow}
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white mb-4 whitespace-pre-line">
          {stage.heading.split('\n').map((line, i) => (
            <span key={i} className={`block ${i === 0 ? 'bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent' : 'bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent'}`}>
              {line}
            </span>
          ))}
        </h2>

        {/* Subheading */}
        {stage.subheading && (
          <p className="text-lg lg:text-xl font-medium text-white/70 mb-3">
            {stage.subheading}
          </p>
        )}

        {/* Body copy */}
        {stage.body && (
          <p className="text-sm lg:text-base text-white/50 leading-relaxed max-w-sm">
            {stage.body}
          </p>
        )}

        {/* Final CTAs */}
        {'isFinal' in stage && stage.isFinal && (
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pointer-events-auto" style={{ justifyContent: 'center' }}>
            <button
              onClick={onAuditClick}
              className="group relative px-7 py-3.5 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-1"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                Get Your Free Growth Audit
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <button
              onClick={onCaseStudiesClick}
              className="px-7 py-3.5 rounded-full font-semibold text-white/80 border border-white/20 hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              View Case Studies
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface ScrollStorySectionProps {
  onAuditClick: () => void;
}

export default function ScrollStorySection({ onAuditClick }: ScrollStorySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>(Array(TOTAL_FRAMES).fill(false));
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef(-1);
  const currentProgressRef = useRef(0);

  const getFrameIndex = useCallback((progress: number) => {
    return Math.min(Math.floor(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
  }, []);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[frameIndex];
    if (!canvas || !img || !img.complete || !loadedRef.current[frameIndex]) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover-fit the image
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  }, []);

  // Preload images — load first frame first, then all others
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    imagesRef.current = images;

    const loadImage = (i: number): Promise<void> => {
      return new Promise((resolve) => {
        const num = String(i + 1).padStart(3, '0');
        const img = new Image();
        img.src = `/frames/ezgif-frame-${num}.jpg`;
        img.onload = () => {
          loadedRef.current[i] = true;
          if (i === 0) {
            setIsLoaded(true);
            drawFrame(0);
          }
          resolve();
        };
        img.onerror = () => resolve();
        images[i] = img;
      });
    };

    // Load first frame immediately
    loadImage(0).then(() => {
      // Then batch-load remaining frames in groups for speed
      const batchSize = 20;
      const loadBatch = async (start: number) => {
        if (start >= TOTAL_FRAMES) return;
        const end = Math.min(start + batchSize, TOTAL_FRAMES);
        await Promise.all(Array.from({ length: end - start }, (_, j) => loadImage(start + j)));
        setTimeout(() => loadBatch(end), 16);
      };
      loadBatch(1);
    });
  }, [drawFrame]);

  // Resize canvas
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const pr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pr;
      canvas.height = window.innerHeight * pr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(pr, pr);
      drawFrame(lastFrameRef.current >= 0 ? lastFrameRef.current : 0);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const scrollable = container.offsetHeight - window.innerHeight;
        const raw = Math.max(0, -rect.top) / scrollable;
        const progress = Math.max(0, Math.min(1, raw));

        currentProgressRef.current = progress;
        setScrollProgress(progress);

        const frameIndex = getFrameIndex(progress);
        if (frameIndex !== lastFrameRef.current) {
          lastFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [getFrameIndex, drawFrame]);

  const handleCaseStudiesClick = () => {
    document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeStageIndex = stages.findIndex(
    (s) => scrollProgress >= s.range[0] && scrollProgress < s.range[1]
  );
  const activeStage = stages[activeStageIndex >= 0 ? activeStageIndex : stages.length - 1];

  return (
    <div ref={containerRef} id="scroll-story" style={{ height: '400vh' }} className="relative">
      {/* Sticky viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Canvas — image sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ imageRendering: 'auto' }}
        />

        {/* Gradient vignettes for readability */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        </div>

        {/* Loading state */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#050815]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
              <p className="text-white/40 text-sm font-medium tracking-widest uppercase">Loading Experience</p>
            </div>
          </div>
        )}

        {/* Scroll progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-none"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Stage overlays */}
        {isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            {stages.map((stage, i) => (
              <StageOverlay
                key={i}
                stage={stage}
                progress={scrollProgress}
                onAuditClick={onAuditClick}
                onCaseStudiesClick={handleCaseStudiesClick}
              />
            ))}
          </div>
        )}

        {/* Scroll indicator — shown at start */}
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500"
          style={{ opacity: scrollProgress < 0.05 ? 1 - scrollProgress / 0.05 : 0 }}
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/40">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white/40 animate-bounce" />
          </div>
        </div>

        {/* Stage indicator dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {stages.map((stage, i) => {
            const [s, e] = stage.range;
            const active = scrollProgress >= s && scrollProgress < e;
            const done = scrollProgress >= e;
            return (
              <div
                key={i}
                className={`rounded-full transition-all duration-500 ${
                  active ? 'w-1.5 h-6 bg-purple-400' :
                  done ? 'w-1 h-1 bg-purple-500/60' :
                  'w-1 h-1 bg-white/20'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
