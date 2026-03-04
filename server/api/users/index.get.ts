import { requireRole, sanitizeUser } from '../../utils/auth'
import { mockUsers } from '../../data/mockUsers'

export default defineEventHandler((event) => {
  requireRole(event, 'admin')
  return { users: mockUsers.map(sanitizeUser) }
})
