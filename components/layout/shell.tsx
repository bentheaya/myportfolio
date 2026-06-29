import { Header } from './header'
import { MobileNav } from './mobile-nav'

interface ShellProps {
  children: React.ReactNode
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="min-h-screen bg-canvas-bg">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-16 md:pt-16 pb-16 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
}
