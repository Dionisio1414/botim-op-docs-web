import { requireRole, sanitizeUser } from '../../utils/auth'
import { mockUsers } from '../../data/mockUsers'

export default defineEventHandler(async (event) => {
  requireRole(event, 'admin')

  const id = getRouterParam(event, 'id')
  const user = mockUsers.find(u => u.id === id)

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  const body = await readBody<{
    name?: string
    email?: string
    role?: 'admin' | 'editor' | 'viewer'
    status?: 'active' | 'disabled'
  }>(event)

  if (body?.name) user.name = body.name
  if (body?.email) user.email = body.email
  if (body?.role) user.role = body.role
  if (body?.status) user.status = body.status

  return { user: sanitizeUser(user) }
})
