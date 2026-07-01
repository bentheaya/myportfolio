'use client'

import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { TransitionLink } from '@/components/transitions/TransitionLink'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-40 h-16 border-b border-canvas-border/20">
        <div className="glass h-full">
          <nav className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
            {/* Logo */}
            <TransitionLink
              href="/"
              className="text-lg font-mono font-bold text-accent-bright hover:opacity-80 transition-opacity"
            >
              // benaih
            </TransitionLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <TransitionLink
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-canvas-text-secondary hover:text-canvas-text transition-colors duration-200"
                >
                  {item.label}
                </TransitionLink>
              ))}
            </div>

            {/* CTA Button */}
            <TransitionLink
              href="/contact"
              className="px-4 py-2 rounded-lg bg-accent-bright text-canvas-bg font-mono font-medium text-xs tracking-wider uppercase hover:opacity-90 transition-opacity duration-200"
            >
              Contact
            </TransitionLink>
          </nav>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 border-b border-canvas-border/20">
        <div className="glass h-full">
          <nav className="h-full px-4 flex items-center justify-between">
            {/* Logo */}
            <TransitionLink
              href="/"
              className="text-md font-mono font-bold text-accent-bright hover:opacity-80 transition-opacity"
            >
              // benaih
            </TransitionLink>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-canvas-elevated/50 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-canvas-text" />
              ) : (
                <Menu className="w-5 h-5 text-canvas-text" />
              )}
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-canvas-elevated border-b border-canvas-border/20 animate-slideInDown">
            <nav className="flex flex-col p-4 gap-3">
              {navItems.map((item) => (
                <TransitionLink
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-canvas-text-secondary hover:text-canvas-text hover:bg-canvas-card/50 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </TransitionLink>
              ))}
              <TransitionLink
                href="/contact"
                className="mt-2 w-full px-3 py-2 text-center rounded-lg bg-accent-bright text-canvas-bg font-mono font-medium text-xs uppercase tracking-wide hover:opacity-90 transition-opacity duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </TransitionLink>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
