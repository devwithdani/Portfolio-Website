'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  advanceJourney,
  sceneFromHash,
  sections,
  type Journey,
} from '@/lib/journey';

export function usePortfolioJourney() {
  const [journey, setJourney] = useState<Journey>({ scene: 0, step: 0 });
  const current = useRef<Journey>({ scene: 0, step: 0 });
  const transitionUntil = useRef(0);
  const commit = useCallback(
    (next: Journey, focus = false, history: 'push' | 'replace' = 'replace') => {
      if (next.scene < 0 || next.scene >= sections.length) return false;
      const previous = current.current;
      const changed =
        next.scene !== previous.scene || next.step !== previous.step;
      if (!changed) return false;
      const reduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      transitionUntil.current =
        performance.now() +
        (reduced ? 100 : next.scene === previous.scene ? 950 : 1400);
      current.current = next;
      setJourney(next);
      const hash = `#${sections[next.scene].id}`;
      if (location.hash !== hash) {
        if (history === 'push') window.history.pushState(null, '', hash);
        else window.history.replaceState(null, '', hash);
      }
      if (focus)
        requestAnimationFrame(() =>
          document
            .getElementById(sections[next.scene].id)
            ?.focus({ preventScroll: true }),
        );
      return true;
    },
    [],
  );
  const go = useCallback(
    (scene: number) => commit({ scene, step: 0 }, true, 'push'),
    [commit],
  );
  const move = useCallback(
    (direction: number) => {
      if (performance.now() < transitionUntil.current) return false;
      return commit(advanceJourney(current.current, direction));
    },
    [commit],
  );
  useEffect(() => {
    const sync = () => {
      const scene = sceneFromHash(location.hash);
      if (scene < 0) return;
      current.current = { scene, step: 0 };
      setJourney({ scene, step: 0 });
    };
    sync();
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);
  useEffect(() => {
    let accumulated = 0,
      lastWheel = 0,
      consumed = false,
      startX = 0,
      startY = 0;
    const modalOpen = () =>
      !!document.querySelector('[role="dialog"][data-open]');
    const interactive = (target: EventTarget | null) =>
      target instanceof Element &&
      !!target.closest(
        'button,a,input,textarea,select,[role="dialog"],[contenteditable="true"]',
      );
    const key = (event: KeyboardEvent) => {
      if (
        modalOpen() ||
        interactive(event.target) ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      )
        return;
      if (
        event.key === 'ArrowRight' ||
        (current.current.scene === 0 &&
          ['ArrowDown', 'PageDown'].includes(event.key))
      ) {
        event.preventDefault();
        move(1);
      }
      if (
        event.key === 'ArrowLeft' ||
        (current.current.scene === 0 &&
          ['ArrowUp', 'PageUp'].includes(event.key))
      ) {
        event.preventDefault();
        move(-1);
      }
    };
    const wheel = (event: WheelEvent) => {
      if (
        modalOpen() ||
        event.ctrlKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        !event.deltaY
      )
        return;
      const now = performance.now();
      if (now - lastWheel > 180) {
        accumulated = 0;
        consumed = false;
      }
      lastWheel = now;
      const panel = document.querySelector<HTMLElement>(
        '.scene-content.is-active',
      );
      if (!panel) return;
      const direction = Math.sign(event.deltaY);
      const canScroll =
        direction > 0
          ? panel.scrollTop + panel.clientHeight < panel.scrollHeight - 2
          : panel.scrollTop > 2;
      if (now < transitionUntil.current || consumed) {
        event.preventDefault();
        return;
      }
      if (canScroll && current.current.scene !== 0) {
        accumulated = 0;
        if (!(event.target instanceof Node) || !panel.contains(event.target)) {
          event.preventDefault();
          panel.scrollBy({
            top: event.deltaY * (event.deltaMode === 1 ? 16 : 1),
          });
        }
        return;
      }
      event.preventDefault();
      if (Math.sign(accumulated) !== direction) accumulated = 0;
      accumulated +=
        event.deltaY *
        (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
      if (Math.abs(accumulated) >= 65) {
        consumed = move(direction);
        accumulated = 0;
      }
    };
    const touchStart = (event: TouchEvent) => {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    };
    const touchEnd = (event: TouchEvent) => {
      if (modalOpen() || interactive(event.target)) return;
      const dx = event.changedTouches[0].clientX - startX,
        dy = event.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5)
        move(dx < 0 ? 1 : -1);
      else if (
        current.current.scene === 0 &&
        Math.abs(dy) > 65 &&
        Math.abs(dy) > Math.abs(dx) * 1.5
      )
        move(dy < 0 ? 1 : -1);
    };
    window.addEventListener('keydown', key);
    window.addEventListener('wheel', wheel, { passive: false });
    window.addEventListener('touchstart', touchStart, { passive: true });
    window.addEventListener('touchend', touchEnd, { passive: true });
    return () => {
      window.removeEventListener('keydown', key);
      window.removeEventListener('wheel', wheel);
      window.removeEventListener('touchstart', touchStart);
      window.removeEventListener('touchend', touchEnd);
    };
  }, [move]);
  return { journey, go, move };
}
