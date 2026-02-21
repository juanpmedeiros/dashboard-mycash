import { Outlet } from 'react-router-dom'

/**
 * Layout principal. Sidebar e Header Mobile serão adicionados nos PROMPT 2 e 3.
 * Conteúdo central (Outlet) muda conforme a rota; navegação permanece visível após PROMPT 2.
 */
export function MainLayout() {
  return (
    <div className="min-h-screen w-full bg-background">
      <Outlet />
    </div>
  )
}
