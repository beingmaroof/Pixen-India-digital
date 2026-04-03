"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

// ─── CONFIG ────────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 240;
const LERP_FACTOR = 0.08; // smoothing — lower = silkier

// ─── STAGE DEFINITIONS ─────────────────────────────────────────────────────────
const stages = [
  {
    range: [0, 0.20] as [number, number],
    position: 'center' as const,
    eyebrow: 'Stage 01 — Foundation',
    heading: ['Growth doesn\'t start', 'with ads.'],
    subheading: 'It starts with structure.',
    body: '',
    glowColor: 'rgba(168, 85, 247, 0.15)',
    accentColor: '#A855F7',
    floatingCards: [
      { label: 'Reach', value: '2.4M', icon: '📊', pos: 'top-[15%] left-[8%]', delay: 0 },
      { label: 'CTR', value: '8.7%', icon: '🎯', pos: 'top-[60%] left-[5%]', delay: 0.15 },
      { label: 'Instagram', value: '12K+', icon: '📱', pos: 'top-[25%] right-[8%]', delay: 0.25 },
      { label: 'Revenue', value: '₹4.2Cr', icon: '💰', pos: 'bottom-[25%] right-[6%]', delay: 0.1 },
    ],
  },
  {
    range: [0.20, 0.45] as [number, number],
    position: 'left' as const,
    eyebrow: 'Stage 02 — Systems',
    heading: ['Systems.', 'Strategy. Data.'],
    subheading: '',
    body: 'We build the foundation your growth depends on — data architectures, conversion funnels, and automated pipelines that compound over time.',
    glowColor: 'rgba(59, 130, 246, 0.15)',
    accentColor: '#3B82F6',
    floatingCards: [
      { label: 'Funnel Score', value: '94/100', icon: '⚡', pos: 'top-[20%] right-[6%]', delay: 0 },
      { label: 'Automation', value: 'Active', icon: '🤖', pos: 'bottom-[30%] right-[8%]', delay: 0.2 },
      { label: 'Data Sync', value: '✓ Live', icon: '🔗', pos: 'top-[55%] right-[4%]', delay: 0.1 },
    ],
  },
  {
    range: [0.45, 0.70] as [number, number],
    position: 'right' as const,
    eyebrow: 'Stage 03 — Intelligence',
    heading: ['AI-powered', 'funnels.'],
    subheading: 'Smart automation. Real-time optimization.',
    body: 'Your business starts learning and scaling with every touchpoint.',
    glowColor: 'rgba(0, 214, 255, 0.12)',
    accentColor: '#00D6FF',
    floatingCards: [
      { label: 'AI Score', value: '99%', icon: '🧠', pos: 'top-[18%] left-[6%]', delay: 0 },
      { label: 'Leads/Day', value: '+340%', icon: '🚀', pos: 'top-[55%] left-[4%]', delay: 0.15 },
      { label: 'CPL Drop', value: '-45%', icon: '📉', pos: 'bottom-[28%] left-[8%]', delay: 0.1 },
    ],
  },
  {
    range: [0.70, 0.90] as [number, number],
    position: 'center' as const,
    eyebrow: 'Stage 04 — Transformation',
    heading: ['From clicks…', 'to customers.'],
    subheading: 'From traffic… to revenue.',
    body: '',
    glowColor: 'rgba(250, 204, 21, 0.08)',
    accentColor: '#FBBF24',
    floatingCards: [
      { label: 'Conversions', value: '4.2×', icon: '📈', pos: 'top-[20%] right-[8%]', delay: 0 },
      { label: 'ROAS', value: '7.8×', icon: '💎', pos: 'bottom-[28%] left-[7%]', delay: 0.2 },
    ],
  },
  {
    range: [0.90, 1.00] as [number, number],
    position: 'center' as const,
    eyebrow: 'Stage 05 — Dominance',
    heading: ['We Build Revenue-', 'Generating Growth Systems.'],
    subheading: 'Not Just Marketing Campaigns.',
    body: '',
    glowColor: 'rgba(168, 85, 247, 0.20)',
    accentColor: '#A855F7',
    floatingCards: [],
    isFinal: true,
  },
];

// ─── LERP UTILITY ──────────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// ─── FLOATING ANALYTICS CARD ───────────────────────────────────────────────────
function FloatingCard({
  label,
  value,
  icon,
  pos,
  opacity,
  delay,
}: {
  label: string;
  value: string;
  icon: string;
  pos: string;
  opacity: number;
  delay: number;
}) {
  if (opacity < 0.01) return null;
  return (
    <div
      className={`absolute ${pos} pointer-events-none`}
      style={{
        opacity: Math.max(0, opacity - delay),
        transform: `translateY(${(1 - Math.max(0, opacity - delay)) * 16}px)`,
        transition: 'none',
      }}
    >
      <div
        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-white/10 backdrop-blur-xl shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        <span className="text-base">{icon}</span>
        <div>
          <div className="text-xs font-semibold text-white/90 leading-none">{value}</div>
          <div className="text-[10px] text-white/40 font-medium mt-0.5 uppercase tracking-wide">{label}</div>
        </div>
        {/* Pulse dot */}
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse ml-1" />
      </div>
    </div>
  );
}

// ─── GLOW NODES LAYER ──────────────────────────────────────────────────────────
function GlowNodes({ progress, accentColor }: { progress: number; accentColor: string }) {
  const nodes = [
    { cx: '20%', cy: '30%', r: 3 },
    { cx: '75%', cy: '25%', r: 2.5 },
    { cx: '85%', cy: '65%', r: 3 },
    { cx: '15%', cy: '70%', r: 2 },
    { cx: '50%', cy: '15%', r: 2.5 },
    { cx: '60%', cy: '80%', r: 2 },
  ];
  const alpha = Math.min(progress * 5, 1) * 0.6;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: alpha }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="node-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Connection lines */}
      <line x1="20%" y1="30%" x2="75%" y2="25%" stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="4 8" />
      <line x1="75%" y1="25%" x2="85%" y2="65%" stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="4 8" />
      <line x1="85%" y1="65%" x2="60%" y2="80%" stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="4 8" />
      <line x1="15%" y1="70%" x2="20%" y2="30%" stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="4 8" />
      <line x1="50%" y1="15%" x2="75%" y2="25%" stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="4 8" />
      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i} filter="url(#node-glow)">
          <circle cx={n.cx} cy={n.cy} r={n.r * 2.5} fill={accentColor} opacity={0.08} />
          <circle cx={n.cx} cy={n.cy} r={n.r} fill={accentColor} opacity={0.8} />
        </g>
      ))}
    </svg>
  );
}

// ─── STAGE OVERLAY ─────────────────────────────────────────────────────────────
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

  // Cinematic fade — quick in, long plateau, quick out
  let opacity = 0;
  if (stageProgress < 0.15) opacity = stageProgress / 0.15;
  else if (stageProgress > 0.82) opacity = 1 - (stageProgress - 0.82) / 0.18;
  else opacity = 1;
  opacity = Math.max(0, Math.min(1, opacity));

  const translateY = stageProgress < 0.15 ? (1 - stageProgress / 0.15) * 40 : 0;
  const isVisible = opacity > 0.01;

  if (!isVisible) return null;

  // On mobile always center; left/right only on md+
  const positionClass =
    stage.position === 'left'
      ? 'items-center text-center px-5 md:items-start md:text-left md:pl-16 lg:pl-20 md:px-0'
      : stage.position === 'right'
      ? 'items-center text-center px-5 md:items-end md:text-right md:pr-16 lg:pr-20 md:px-0'
      : 'items-center text-center px-5';

  const accentHex = stage.accentColor;

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-center ${positionClass} pointer-events-none`}
      style={{ opacity, transform: `translateY(${translateY}px)`, transition: 'none' }}
    >

      {/* Text block */}
      <div className={`w-full max-w-xs sm:max-w-sm md:max-w-lg ${stage.position === 'center' ? 'mx-auto' : 'md:mx-0 mx-auto'} relative z-10`}>
        {/* Eyebrow */}
        <div className="flex items-center justify-center md:justify-start gap-2.5 mb-3 md:mb-5">
          <span className="w-5 h-px" style={{ background: accentHex }} />
          <span
            className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] uppercase"
            style={{ color: accentHex }}
          >
            {stage.eyebrow}
          </span>
          <span className="w-5 h-px" style={{ background: accentHex }} />
        </div>

        {/* Heading — line by line gradient */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight mb-3 md:mb-5">
          {stage.heading.map((line, i) => (
            <span
              key={i}
              className="block pb-3 -mb-3"
              style={{
                background:
                  i === 0
                    ? 'linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.85) 100%)'
                    : `linear-gradient(90deg, ${accentHex} 0%, #60a5fa 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: 'none',
              }}
            >
              {line}
            </span>
          ))}
        </h2>

        {/* Subheading */}
        {stage.subheading && (
          <p className="text-sm sm:text-base lg:text-lg font-medium text-white/65 mb-3 leading-snug">
            {stage.subheading}
          </p>
        )}

        {/* Body */}
        {stage.body && (
          <p className="text-xs sm:text-sm lg:text-base text-white/45 leading-relaxed">
            {stage.body}
          </p>
        )}

        {/* Glassmorphic divider */}
        {!('isFinal' in stage && stage.isFinal) && (
          <div
            className="mt-6 h-px max-w-[120px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${accentHex}60, transparent)`,
              marginLeft: stage.position === 'right' ? 'auto' : stage.position === 'center' ? 'auto' : '0',
              marginRight: stage.position === 'right' ? '0' : 'auto',
            }}
          />
        )}

        {/* Final CTAs */}
        {'isFinal' in stage && stage.isFinal && (
          <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-10 pointer-events-auto justify-center">
            <button
              onClick={onAuditClick}
              className="group relative px-5 sm:px-7 md:px-8 py-3 md:py-4 rounded-full font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-1 text-sm md:text-base"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                Get Your Free Growth Audit
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <button
              onClick={onCaseStudiesClick}
              className="px-5 sm:px-7 md:px-8 py-3 md:py-4 rounded-full font-semibold text-white/80 border border-white/15 hover:bg-white/8 hover:text-white hover:border-white/30 transition-all duration-300 text-sm md:text-base backdrop-blur-sm"
            >
              View Case Studies
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── AMBIENT GLOW LAYER ────────────────────────────────────────────────────────
function AmbientGlow({ stage, opacity }: { stage: typeof stages[0]; opacity: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none transition-none"
      style={{ opacity }}
    >
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${stage.glowColor}, transparent 70%)` }}
      />
    </div>
  );
}

// ─── PROGRESS INDICATOR ────────────────────────────────────────────────────────
function ProgressIndicator({ scrollProgress }: { scrollProgress: number }) {
  return (
    <div className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 flex flex-col items-end gap-2 md:gap-3 z-20">
      {stages.map((stage, i) => {
        const [s, e] = stage.range;
        const active = scrollProgress >= s && scrollProgress < e;
        const done = scrollProgress >= e;
        return (
          <div key={i} className="flex items-center gap-1.5 md:gap-2">
            {/* label — only on active, hidden on mobile */}
            <span
              className="hidden md:block text-[9px] font-bold tracking-widest uppercase text-white/40 transition-all duration-500 overflow-hidden"
              style={{
                maxWidth: active ? '80px' : '0px',
                opacity: active ? 1 : 0,
                marginRight: active ? '0' : '-2px',
              }}
            >
              0{i + 1}
            </span>
            <div
              className="rounded-full transition-all duration-500"
              style={{
                width: active ? '5px' : '3px',
                height: active ? '24px' : '5px',
                background: active
                  ? stage.accentColor
                  : done
                  ? `${stage.accentColor}60`
                  : 'rgba(255,255,255,0.15)',
                boxShadow: active ? `0 0 8px ${stage.accentColor}` : 'none',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
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
  const [lerpFactor, setLerpFactor] = useState(LERP_FACTOR);

  useEffect(() => {
    // Reduce interpolation overhead on mobile devices
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setLerpFactor(0.15); 
    }
  }, []);

  // Smooth lerp progress
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef(-1);
  const animatingRef = useRef(false);

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

    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  }, []);

  // Lerp animation loop
  const startLerpLoop = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const tick = () => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const newCurrent = lerp(current, target, lerpFactor);
      currentProgressRef.current = newCurrent;

      setScrollProgress(newCurrent);

      const frameIndex = getFrameIndex(newCurrent);
      if (frameIndex !== lastFrameRef.current) {
        lastFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      }

      if (Math.abs(newCurrent - target) > 0.0001) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        currentProgressRef.current = target;
        animatingRef.current = false;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [getFrameIndex, drawFrame, lerpFactor]);

  // Preload images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    imagesRef.current = images;

    const loadImage = (i: number): Promise<void> =>
      new Promise((resolve) => {
        const num = String(i + 1).padStart(3, '0');
        const img = new Image();
        img.decoding = 'async'; // Prevents main thread blocking
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

    loadImage(0).then(() => {
      // Small batch size + higher delay prevents network exhaustion and OOM crashes
      const batchSize = 2;
      const loadBatch = async (start: number) => {
        if (start >= TOTAL_FRAMES) return;
        const end = Math.min(start + batchSize, TOTAL_FRAMES);
        await Promise.all(Array.from({ length: end - start }, (_, j) => loadImage(start + j)));
        setTimeout(() => loadBatch(end), 120);
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

  // Scroll listener — feeds targetProgress
  useEffect(() => {
    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      const raw = Math.max(0, -rect.top) / scrollable;
      const progress = Math.max(0, Math.min(1, raw));
      targetProgressRef.current = progress;
      startLerpLoop();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [startLerpLoop]);

  const handleCaseStudiesClick = () => {
    document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Active stage
  const activeStageIndex = stages.findIndex(
    (s) => scrollProgress >= s.range[0] && scrollProgress < s.range[1]
  );
  const activeStage = stages[activeStageIndex >= 0 ? activeStageIndex : stages.length - 1];

  // Ambient glow opacity
  const getStageOpacity = (stage: typeof stages[0]) => {
    const [s, e] = stage.range;
    const p = Math.max(0, Math.min(1, (scrollProgress - s) / (e - s)));
    let o = 0;
    if (p < 0.15) o = p / 0.15;
    else if (p > 0.82) o = 1 - (p - 0.82) / 0.18;
    else o = 1;
    return Math.max(0, Math.min(1, o));
  };

  return (
    <div ref={containerRef} id="scroll-story" style={{ height: '400vh' }} className="relative">
      {/* Sticky viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* Canvas — image sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ imageRendering: 'auto' }}
        />

        {/* Dark vignette for text readability */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        </div>

        {/* Ambient glow layers — one per stage */}
        {stages.map((stage, i) => (
          <AmbientGlow key={i} stage={stage} opacity={getStageOpacity(stage)} />
        ))}

        {/* Glow nodes + lines on stage 2–4 */}
        {scrollProgress > 0.18 && scrollProgress < 0.92 && (
          <GlowNodes
            progress={Math.min((scrollProgress - 0.18) / 0.1, 1)}
            accentColor={activeStage.accentColor}
          />
        )}

        {/* Grid overlay — very subtle */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            opacity: Math.min(scrollProgress * 3, 0.6),
          }}
        />

        {/* Film grain overlay removed to maximize FPS and prevent GPU lagging */}

        {/* Loading state */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#050815]">
            <div className="flex flex-col items-center gap-5">
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
                <div className="absolute inset-2 rounded-full border border-blue-400/20 border-b-blue-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-white/60 text-sm font-semibold tracking-[0.15em] uppercase">Loading Experience</p>
                <p className="text-white/25 text-xs">Preparing cinematic sequence…</p>
              </div>
            </div>
          </div>
        )}

        {/* Stage overlays */}
        {isLoaded && (
          <div className="absolute inset-0">
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

        {/* Scroll progress bar — ultra thin */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/5">
          <div
            className="h-full transition-none"
            style={{
              width: `${scrollProgress * 100}%`,
              background: `linear-gradient(90deg, ${activeStage.accentColor}, #60a5fa)`,
              boxShadow: `0 0 8px ${activeStage.accentColor}`,
            }}
          />
        </div>

        {/* Progress indicator dots — right side */}
        <ProgressIndicator scrollProgress={scrollProgress} />

        {/* Scroll cue at start */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 transition-none"
          style={{ opacity: scrollProgress < 0.04 ? 1 - scrollProgress / 0.04 : 0 }}
        >
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/35">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white/40 animate-bounce" />
          </div>
        </div>

        {/* Stage label — bottom left */}
        <div
          className="absolute bottom-8 left-8 transition-none"
          style={{ opacity: scrollProgress > 0.04 ? Math.min((scrollProgress - 0.04) / 0.04, 1) : 0 }}
        >
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/25">
            {activeStage.eyebrow}
          </span>
        </div>

        {/* Corner accent — top right */}
        <div className="absolute top-6 right-20 flex items-center gap-2 opacity-30">
          <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
          <span className="text-[9px] tracking-widest uppercase text-white/50 font-medium">Pixen Digital</span>
        </div>
      </div>
    </div>
  );
}
