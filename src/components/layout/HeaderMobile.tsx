import { useState } from 'react'
import { MenuDropdown } from './MenuDropdown'

const HEADER_HEIGHT = 'var(--header-mobile-height)'

export function HeaderMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between border-b border-border bg-surface-sidebar px-spacing-md shadow-sm lg:hidden"
        style={{ height: HEADER_HEIGHT, minHeight: '44px' }}
        aria-label="Cabeçalho mobile"
      >
        <span
          className="font-bold text-text-primary"
          style={{ fontSize: 'var(--font-size-lg)' }}
        >
          Mycash+
        </span>

        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
        >
          <div
            className="size-9 rounded-full bg-gray-300"
            aria-hidden
          />
        </button>
      </header>

      <MenuDropdown
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  )
}
