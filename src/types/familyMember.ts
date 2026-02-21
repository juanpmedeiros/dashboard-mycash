/**
 * Tipos da entidade FamilyMember (membro da família).
 */

export interface FamilyMember {
  id: string
  name: string
  role: string
  avatarUrl: string
  email?: string
  monthlyIncome: number
  createdAt: string
  updatedAt: string
}
