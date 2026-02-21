import { useState, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md'
import { ROUTE_LIST } from '@/constants'
import { navIcons } from './navIcons'

interface SidebarProps {
  isExpanded: boolean
  onToggle: () => void
}

export function Sidebar({ isExpanded, onToggle }: SidebarProps) {
  const [tooltipLabel, setTooltipLabel] = useState<string | null>(null)
  const [tooltipTimeout, setTooltipTimeout] = useState<ReturnType<typeof setTimeout> | null>(null)

  const handleNavMouseEnter = useCallback(
    (label: string) => {
      if (!isExpanded) {
        const t = setTimeout(() => setTooltipLabel(label), 400)
        setTooltipTimeout(t)
      }
    },
    [isExpanded]
  )

  const handleNavMouseLeave = useCallback(() => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout)
      setTooltipTimeout(null)
    }
    setTooltipLabel(null)
  }, [tooltipTimeout])

  return (
    <aside
      className="fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-border bg-surface-sidebar shadow-sm transition-[width] duration-sidebar ease-in-out lg:flex"
      style={{ width: 'var(--sidebar-width)', height: '100vh' }}
      aria-label="Navegação principal"
    >
      {/* Topo: Logo + Nav — Figma node 2006-1306 */}
      <div className="flex flex-col border-b border-border">
        <div className="relative flex min-h-[64px] items-center px-spacing-md">
          {isExpanded ? (
            <span
              className="truncate font-bold text-text-primary"
              style={{ fontSize: 'var(--font-size-xl)', lineHeight: 'var(--font-size-2xl)' }}
            >
              Mycash+
            </span>
          ) : (
            <div className="flex flex-col items-start gap-0">
              <span
                className="font-bold text-text-primary"
                style={{ fontSize: 'var(--font-size-base)' }}
              >
                My
              </span>
              <span
                className="text-text-secondary"
                style={{ fontSize: 'var(--font-size-xs)' }}
              >
                cash+
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-0 top-4 flex size-10 items-center justify-center rounded-full border border-border bg-gray-100 text-text-primary shadow-sm transition-colors duration-sidebar hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={isExpanded ? 'Recolher menu' : 'Expandir menu'}
          >
            {isExpanded ? (
              <MdOutlineChevronLeft className="size-5" aria-hidden />
            ) : (
              <MdOutlineChevronRight className="size-5" aria-hidden />
            )}
          </button>
        </div>

        <nav className="flex flex-col gap-spacing-xs px-spacing-md pb-spacing-lg pt-spacing-sm" aria-label="Seções">
          {ROUTE_LIST.map(({ path, label }) => (
            <div
              key={path}
              className={`relative flex ${isExpanded ? 'justify-start' : 'justify-center'}`}
              onMouseEnter={() => handleNavMouseEnter(label)}
              onMouseLeave={handleNavMouseLeave}
            >
              <NavLink
                to={path}
                className={({ isActive: active }) => {
                  const activeStyles = 'bg-primary text-text-on-primary [&_svg]:text-text-on-primary'
                  const inactiveStyles = 'text-text-primary hover:bg-gray-100'
                  if (isExpanded) {
                    return `flex items-center gap-spacing-md overflow-hidden rounded-full px-spacing-md py-spacing-md transition-colors duration-sidebar ${active ? activeStyles : inactiveStyles}`
                  }
                  return `flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full transition-colors duration-sidebar ${active ? activeStyles : inactiveStyles}`
                }}
                style={isExpanded ? { minHeight: '44px' } : undefined}
              >
                <span className="shrink-0 [&_svg]:size-6">
                  {navIcons[label] ?? navIcons.Home}
                </span>
                {isExpanded && (
                  <span
                    className="truncate font-semibold"
                    style={{ fontSize: 'var(--font-size-base)', lineHeight: '20px' }}
                  >
                    {label}
                  </span>
                )}
              </NavLink>
              {!isExpanded && tooltipLabel === label && (
                <div
                  className="absolute left-full top-1/2 z-50 ml-spacing-sm -translate-y-1/2 rounded-md border border-border bg-surface-sidebar px-spacing-md py-spacing-sm shadow-md"
                  style={{ fontSize: 'var(--font-size-sm)', whiteSpace: 'nowrap' }}
                  role="tooltip"
                >
                  {label}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="flex-1" aria-hidden />

      {/* Rodapé: perfil — Figma: avatar, nome e email em coluna, alinhados à esquerda */}
      <div
        className="border-t border-border p-spacing-md"
        style={{ minHeight: '44px' }}
      >
        {isExpanded ? (
          <div className="flex flex-col gap-spacing-sm">
            <div
              className="size-10 shrink-0 rounded-full border border-border bg-gray-300"
              aria-hidden
            />
            <div className="min-w-0">
              <p
                className="truncate font-semibold text-text-primary"
                style={{ fontSize: 'var(--font-size-base)', lineHeight: '20px' }}
              >
                Lucas Marte
              </p>
              <p
                className="truncate font-normal text-text-primary"
                style={{ fontSize: 'var(--font-size-sm)', lineHeight: '20px' }}
              >
                lucasmarte@gmail.com
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div
              className="size-10 shrink-0 rounded-full border border-border bg-gray-300"
              aria-label="Avatar do usuário"
            />
          </div>
        )}
      </div>
    </aside>
  )
}
