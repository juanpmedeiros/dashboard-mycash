/**
 * Tipos da entidade Goal (objetivo financeiro).
 */

export type GoalStatus = 'active' | 'achieved' | 'cancelled'

export interface Goal {
  id: string
  name: string
  description?: string
  targetAmount: number
  currentAmount: number
  deadline?: string
  status: GoalStatus
  createdAt: string
  updatedAt: string
}
