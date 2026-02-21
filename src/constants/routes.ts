/**
 * Rotas principais do sistema (SPA).
 * Apenas o conteúdo central muda; navegação permanece visível.
 */

export const ROUTES = {
  DASHBOARD: '/',
  OBJETIVOS: '/objetivos',
  CARTOES: '/cartoes',
  TRANSACOES: '/transacoes',
  PERFIL: '/perfil',
} as const

export const ROUTE_LIST = [
  { path: ROUTES.DASHBOARD, label: 'Home' },
  { path: ROUTES.OBJETIVOS, label: 'Objetivos' },
  { path: ROUTES.CARTOES, label: 'Cartões' },
  { path: ROUTES.TRANSACOES, label: 'Transações' },
  { path: ROUTES.PERFIL, label: 'Perfil' },
] as const
