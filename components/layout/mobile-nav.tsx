'use client'

import { usePathname } from 'next/navigation'
import { Home, Briefcase, Mail, User } from 'lucide-react'
import { TransitionLink } from '@/components/transitions/TransitionLink'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Briefcase, label: 'Work', href: '/work' },
    { icon: User, label: 'About', href: '/about' },
    { icon: Mail, label: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 border-t border-canvas-border/20">
      <div className="glass h-full">
        <div className="h-full px-2 flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <TransitionLink
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 w-16 h-12 rounded-lg transition-all duration-200',
                  isActive
                    ? 'text-accent-bright bg-accent-bright/10'
                    : 'text-canvas-text-secondary hover:text-canvas-text hover:bg-canvas-elevated/30'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium font-mono">{item.label}</span>
              </TransitionLink>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
