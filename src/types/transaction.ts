/**
 * Tipos da entidade Transaction (transação financeira).
 * Tipo de transação: "income" (receita) ou "expense" (despesa).
 */

export type TransactionType = 'income' | 'expense'

export type TransactionStatus = 'pending' | 'completed' | 'cancelled'

export interface Transaction {
  id: string
  type: TransactionType
  value: number
  description: string
  category: string
  date: string
  accountId: string
  memberId: string | null
  installments: number
  installmentCurrent?: number
  status: TransactionStatus
  isRecurring: boolean
  isPaid: boolean
  dueDate?: string
  createdAt: string
  updatedAt: string
}
