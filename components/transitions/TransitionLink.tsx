'use client';

import React from 'react';
import { usePageTransition } from './TransitionContext';

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function TransitionLink({ href, children, ...props }: TransitionLinkProps) {
  const { startTransition } = usePageTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let browser handle modifier clicks (command/ctrl click) or external links
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      props.target === '_blank'
    ) {
      return;
    }

    e.preventDefault();
    
    // Capture cursor X coordinate for transition transform-origin alignment
    const cursorX = e.clientX || window.innerWidth / 2;
    startTransition(href, cursorX);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
