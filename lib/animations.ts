import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

/**
 * Splits text of an HTML element into individual character spans wrapped in containers
 * to allow mask-like overflow:hidden animations.
 */
export function splitTextToChars(el: HTMLElement): HTMLSpanElement[] {
  const text = el.textContent || '';
  el.innerHTML = '';
  el.setAttribute('aria-label', text);

  return [...text].map((char, i) => {
    // Outer wrapper for masking overflow
    const outer = document.createElement('span');
    outer.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;';

    // Inner moving character
    const inner = document.createElement('span');
    inner.style.display = 'inline-block';
    inner.textContent = char === ' ' ? '\u00A0' : char;

    // Apply micro-random vertical alignment variation for high-end organic look
    if (char !== ' ' && i % 3 === 0) {
      inner.style.transform = `translateY(${(Math.random() * 2) - 1}px)`;
    }

    outer.appendChild(inner);
    el.appendChild(outer);
    return inner;
  });
}

/**
 * Animates split character spans in using a masking translateY reveal.
 */
export function animateTextIn(el: HTMLElement, delay = 0, onComplete?: () => void) {
  const chars = splitTextToChars(el);

  // Check for prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4, delay, onComplete });
    return;
  }

  gsap.fromTo(
    chars,
    {
      y: '110%',
      rotationZ: 8,
      opacity: 0,
    },
    {
      y: '0%',
      rotationZ: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.02,
      ease: 'power3.out',
      delay,
      onComplete,
    }
  );
}

/**
 * Configures ScrollTrigger to reveal text when it enters the viewport.
 */
export function scrollTriggerText(el: HTMLElement, delay = 0) {
  gsap.registerPlugin(ScrollTrigger);

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    return gsap.fromTo(el, 
      { opacity: 0 }, 
      { 
        opacity: 1, 
        duration: 0.4, 
        delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  }

  const chars = splitTextToChars(el);

  return gsap.fromTo(
    chars,
    {
      y: '110%',
      rotationZ: 8,
      opacity: 0,
    },
    {
      y: '0%',
      rotationZ: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.015,
      ease: 'power3.out',
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
}
