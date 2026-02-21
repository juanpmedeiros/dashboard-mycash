import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineClose } from 'react-icons/md'
import { ROUTE_LIST } from '@/constants'
import { navIcons } from './navIcons'

interface MenuDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export function MenuDropdown({ isOpen, onClose }: MenuDropdownProps) {
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setIsAnimated(false)
      return
    }
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsAnimated(true))
    })
    return () => cancelAnimationFrame(t)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay: fecha ao clicar/tocar fora */}
      <button
        type="button"
        className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-200"
        style={{ opacity: 1 }}
        onClick={onClose}
        aria-label="Fechar menu"
      />

      {/* Painel: mesma identidade da Sidebar desktop — primary (lime) ativo, surface branco, pill */}
      <div
        className={`fixed left-0 right-0 top-0 z-50 rounded-b-lg border-b border-border bg-surface-sidebar shadow-md ease-out ${
          isAnimated ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{
          transitionProperty: 'transform',
          transitionDuration: 'var(--dropdown-transition-duration)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <div className="flex items-center justify-end border-b border-border px-spacing-md py-spacing-sm">
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Fechar menu"
          >
            <MdOutlineClose className="size-6" aria-hidden />
          </button>
        </div>

        <nav className="max-h-[70vh] overflow-y-auto px-spacing-md py-spacing-sm" aria-label="Seções">
          {ROUTE_LIST.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive: active }) =>
                `flex min-h-[44px] items-center gap-spacing-md rounded-full px-spacing-md py-spacing-md transition-colors duration-sidebar ${
                  active
                    ? 'bg-primary text-text-on-primary [&_svg]:text-text-on-primary'
                    : 'text-text-primary hover:bg-gray-100'
                }`
              }
              style={{ fontSize: 'var(--font-size-base)', lineHeight: '20px' }}
            >
              <span className="shrink-0 [&_svg]:size-6">{navIcons[label] ?? navIcons.Home}</span>
              <span className="font-semibold">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border p-spacing-md">
          <button
            type="button"
            className="flex w-full min-h-[44px] items-center justify-center rounded-full bg-danger text-text-on-primary font-semibold transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-2"
            style={{ fontSize: 'var(--font-size-base)' }}
            onClick={onClose}
          >
            Sair
          </button>
        </div>
      </div>
    </>
  )
}
