import { requireRole } from '../../utils/auth'
import { mockUsers } from '../../data/mockUsers'

export default defineEventHandler((event) => {
  requireRole(event, 'admin')

  const id = getRouterParam(event, 'id')
  const idx = mockUsers.findIndex(u => u.id === id)

  if (idx === -1) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  mockUsers.splice(idx, 1)
  return { ok: true }
})
