/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      /* Breakpoints oficiais (project rules): md 768, lg 1280, xl 1920 */
      screens: {
        md: '768px',
        lg: '1280px',
        xl: '1920px',
      },
      colors: {
        /* Semânticas — usar preferencialmente */
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        info: 'var(--color-info)',
        success: 'var(--color-success)',
        danger: 'var(--color-danger)',
        warning: 'var(--color-warning)',
        background: 'var(--color-background-default)',
        surface: 'var(--color-surface-default)',
        'surface-sidebar': 'var(--color-surface-sidebar)',
        border: 'var(--color-border-default)',
        'text-on-primary': 'var(--color-text-on-primary)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-placeholder': 'var(--color-text-placeholder)',
        'button-primary': 'var(--button-bg-primary)',
        'button-primary-text': 'var(--button-text-primary)',
        /* Primitivas */
        gray: {
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)',
        },
        lime: {
          500: 'var(--lime-500)',
          600: 'var(--lime-600)',
        },
        green: {
          500: 'var(--green-500)',
          600: 'var(--green-600)',
        },
        blue: {
          500: 'var(--blue-500)',
          600: 'var(--blue-600)',
        },
        red: {
          500: 'var(--red-500)',
          600: 'var(--red-600)',
        },
      },
      spacing: {
        'page-x': 'var(--spacing-page-x)',
        'page-y': 'var(--spacing-page-y)',
        'container-gap': 'var(--spacing-container-gap)',
        'card-padding': 'var(--spacing-card-padding)',
        'spacing-xs': 'var(--spacing-xs)',
        'spacing-sm': 'var(--spacing-sm)',
        'spacing-md': 'var(--spacing-md)',
        'spacing-lg': 'var(--spacing-lg)',
        'spacing-xl': 'var(--spacing-xl)',
        'spacing-2xl': 'var(--spacing-2xl)',
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
      },
      fontFamily: {
        sans: ['var(--font-family-default)'],
      },
      fontSize: {
        xs: ['var(--font-size-xs)', { lineHeight: '1.25rem' }],
        sm: ['var(--font-size-sm)', { lineHeight: '1.375rem' }],
        base: ['var(--font-size-base)', { lineHeight: '1.5rem' }],
        lg: ['var(--font-size-lg)', { lineHeight: '1.75rem' }],
        xl: ['var(--font-size-xl)', { lineHeight: '1.75rem' }],
        '2xl': ['var(--font-size-2xl)', { lineHeight: '2rem' }],
        '3xl': ['var(--font-size-3xl)', { lineHeight: '2.25rem' }],
        '4xl': ['var(--font-size-4xl)', { lineHeight: '2.5rem' }],
      },
      fontWeight: {
        normal: 'var(--font-weight-normal)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
      },
      borderRadius: {
        sm: 'var(--border-radius-sm)',
        md: 'var(--border-radius-md)',
        DEFAULT: 'var(--border-radius-default)',
        lg: 'var(--border-radius-lg)',
        full: 'var(--border-radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-default)',
        md: 'var(--shadow-md)',
      },
      width: {
        'sidebar-expanded': 'var(--sidebar-width-expanded)',
        'sidebar-collapsed': 'var(--sidebar-width-collapsed)',
      },
      transitionDuration: {
        sidebar: 'var(--sidebar-transition-duration)',
      },
    },
  },
  plugins: [],
}
