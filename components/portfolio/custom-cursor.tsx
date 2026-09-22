'use client';
import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches)
      return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return;
    const el = cursorRef.current;
    if (!el) return;
    document.body.classList.add('custom-cursor-active');
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      el.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      const target = event.target as HTMLElement;
      const interactive = !!target.closest(
        'a, button, input, textarea, select, [role="button"]',
      );
      el.classList.toggle('custom-cursor--interactive', interactive);
      el.classList.add('custom-cursor--visible');
    };
    const hide = () => el.classList.remove('custom-cursor--visible');
    window.addEventListener('pointermove', move);
    document.addEventListener('mouseleave', hide);
    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('mouseleave', hide);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      SCROLL
    </div>
  );
}
