/**
 * Tipos da entidade CreditCard (cartão de crédito).
 * theme: aparência visual do cartão no UI.
 */

export type CreditCardTheme = 'black' | 'lime' | 'white'

export interface CreditCard {
  id: string
  name: string
  holderId: string
  limit: number
  currentBill: number
  closingDay: number
  dueDay: number
  theme: CreditCardTheme
  lastDigits?: string
  createdAt: string
  updatedAt: string
}
