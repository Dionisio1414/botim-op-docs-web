import { requireRole, sanitizeUser } from '../../utils/auth'
import { mockUsers } from '../../data/mockUsers'

export default defineEventHandler((event) => {
  requireRole(event, 'admin')

  const id = getRouterParam(event, 'id')
  const user = mockUsers.find(u => u.id === id)

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  return { user: sanitizeUser(user) }
})
