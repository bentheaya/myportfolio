import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export function initLenis() {
  if (typeof window === 'undefined') return null;
  if (lenisInstance) return lenisInstance;

  // Check for prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Register GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  lenisInstance = new Lenis({
    duration: prefersReduced ? 0 : 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard fast-to-slow exponential curve
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: !prefersReduced,
    syncTouch: false, // native scroll on touch devices
  });

  // Connect Lenis to GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Synchronize GSAP ticker with Lenis requestAnimationFrame
  const tickerCallback = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  // Store the clean-up handler directly on the instance for provider reference
  (lenisInstance as any)._cleanup = () => {
    gsap.ticker.remove(tickerCallback);
    lenisInstance?.destroy();
    lenisInstance = null;
  };

  return lenisInstance;
}
