'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Briefcase, Mail, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Briefcase, label: 'Work', href: '#portfolio' },
    { icon: Mail, label: 'Contact', href: '#contact' },
    { icon: Settings, label: 'Settings', href: '#settings' },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 border-t border-canvas-border/20">
      <div className="glass h-full">
        <div className="h-full px-2 flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-lg transition-all duration-200',
                  isActive
                    ? 'text-accent-bright bg-accent-bright/10'
                    : 'text-canvas-text-secondary hover:text-canvas-text hover:bg-canvas-elevated/30'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium font-mono">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
