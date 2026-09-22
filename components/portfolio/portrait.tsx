/* oxlint-disable next/no-img-element -- Native local images preserve the existing transform-based portrait; Vinext has no configured image optimizer. */
'use client';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n';
import { copy } from '@/lib/translations';
export function Portrait({ scene, step }: { scene: number; step: number }) {
  const { lang } = useLanguage();
  const t = copy[lang];
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0,
      x = 0,
      y = 0,
      targetX = 0,
      targetY = 0,
      last = 0;
    const move = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };
    const reset = () => {
      targetX = 0;
      targetY = 0;
    };
    const draw = (time: number) => {
      const dt = Math.min(time - last || 16, 50);
      last = time;
      const ease = 1 - Math.exp(-dt / 240);
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      container.current?.style.setProperty('--pointer-x', String(x));
      container.current?.style.setProperty('--pointer-y', String(y));
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    window.addEventListener('pointermove', move);
    document.addEventListener('pointerleave', reset);
    window.addEventListener('blur', reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', reset);
      window.removeEventListener('blur', reset);
    };
  }, []);
  return (
    <figure
      ref={container}
      className={`portrait-stage portrait-scene-${scene} portrait-step-${step}`}
      aria-label={t.portraitAria}
    >
      <div className="portrait-wash" />
      <div className="portrait-composition">
        <div className="portrait-parallax">
          <div className="portrait-breath">
            <img
              width={1366}
              height={2048}
              className="portrait-image"
              src="/dani-studio-v1.png"
              alt={scene === 0 || scene === 2 ? t.portraitAlt0 : ''}
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
      <div className="ai-composition">
        <div className="portrait-parallax">
          <div className="portrait-breath">
            <img
              width={1366}
              height={2048}
              className="portrait-image"
              src="/dani-ai.png"
              alt={scene === 1 ? t.portraitAlt1 : ''}
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className="secondary-composition">
        <div className="portrait-parallax">
          <div className="portrait-breath">
            <img
              width={1366}
              height={2048}
              className="portrait-image"
              src="/dani-buiten.png"
              alt={scene === 3 ? t.portraitAlt3 : ''}
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className="portrait-shade" />
    </figure>
  );
}
