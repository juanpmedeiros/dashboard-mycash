import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { HeaderMobile, Sidebar } from '@/components/layout'

/**
 * Layout principal.
 * Desktop (≥1280px): apenas Sidebar; Mobile/Tablet (<1280px): apenas HeaderMobile. Nunca os dois juntos.
 */
export function MainLayout() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

  return (
    <div
      className="min-h-screen w-full bg-background"
      data-sidebar={isSidebarExpanded ? 'expanded' : 'collapsed'}
    >
      {/* HeaderMobile: só em < lg (1280px); some no desktop */}
      <div className="lg:hidden">
        <HeaderMobile />
      </div>

      {/* Sidebar: só em lg (≥1280px); não renderizar em mobile/tablet */}
      <div className="hidden lg:block">
        <Sidebar
          isExpanded={isSidebarExpanded}
          onToggle={() => setIsSidebarExpanded((prev) => !prev)}
        />
      </div>

      {/* Main: pt para header mobile; margin-left para sidebar em desktop */}
      <main
        className="min-h-screen transition-[margin-left] duration-sidebar ease-in-out pt-[var(--header-mobile-height)] lg:pt-0"
        style={{ marginLeft: 'var(--sidebar-width)' }}
      >
        <div className="mx-auto w-full max-w-[1400px] px-4 py-6 md:px-6 lg:px-8 xl:max-w-[1600px]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
