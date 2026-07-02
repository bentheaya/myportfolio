import { Header } from './header'
import { MobileNav } from './mobile-nav'
import { CustomCursor } from '@/components/cursor/CustomCursor'
import { CursorTrail } from '@/components/cursor/CursorTrail'
import { LenisProvider } from '@/components/layout/LenisProvider'
import { TransitionProvider } from '@/components/transitions/TransitionContext'
import { PageTransition } from '@/components/transitions/PageTransition'

interface ShellProps {
  children: React.ReactNode
}

export function Shell({ children }: ShellProps) {
  return (
    <TransitionProvider>
      <LenisProvider>
        <div className="min-h-screen bg-canvas-bg text-canvas-text relative">
          {/* Custom Cursor System */}
          <CustomCursor />

          {/* Comet trail canvas overlay */}
          <CursorTrail />

          {/* Page Transition overlay */}
          <PageTransition />

          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="pt-16 md:pt-16 pb-16 md:pb-0">
            {children}
          </main>

          {/* Mobile Bottom Navigation */}
          <MobileNav />
        </div>
      </LenisProvider>
    </TransitionProvider>
  )
}
