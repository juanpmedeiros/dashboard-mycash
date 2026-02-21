import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout'

/**
 * Layout principal. Sidebar apenas em desktop (≥1280px); abaixo disso não renderiza (Header Mobile no PROMPT 3).
 * Conteúdo central ajusta margem esquerda com transição suave conforme estado da sidebar.
 */
export function MainLayout() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

  return (
    <div
      className="min-h-screen w-full bg-background"
      data-sidebar={isSidebarExpanded ? 'expanded' : 'collapsed'}
    >
      {/* Sidebar: só em lg (≥1280px); não renderizar em mobile/tablet */}
      <div className="hidden lg:block">
        <Sidebar
          isExpanded={isSidebarExpanded}
          onToggle={() => setIsSidebarExpanded((prev) => !prev)}
        />
      </div>

      {/* Main: margem esquerda = --sidebar-width (0 em <lg, animado em lg) */}
      <main
        className="min-h-screen transition-[margin-left] duration-sidebar ease-in-out"
        style={{ marginLeft: 'var(--sidebar-width)' }}
      >
        <div className="mx-auto w-full max-w-[1400px] px-4 py-6 md:px-6 lg:px-8 xl:max-w-[1600px]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
