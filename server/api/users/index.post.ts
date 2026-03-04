import { requireRole, sanitizeUser } from '../../utils/auth'
import { mockUsers, nextUserId } from '../../data/mockUsers'

export default defineEventHandler(async (event) => {
  requireRole(event, 'admin')

  const body = await readBody<{
    email?: string
    password?: string
    name?: string
    role?: 'admin' | 'editor' | 'viewer'
  }>(event)

  if (!body?.email || !body?.password || !body?.name) {
    throw createError({ statusCode: 400, statusMessage: 'Email, password, and name are required' })
  }

  if (mockUsers.some(u => u.email === body.email)) {
    throw createError({ statusCode: 409, statusMessage: 'Email already exists' })
  }

  const user = {
    id: nextUserId(),
    email: body.email,
    password: body.password,
    name: body.name,
    role: body.role || 'viewer' as const,
    status: 'active' as const,
    createdAt: new Date().toISOString(),
  }

  mockUsers.push(user)
  return { user: sanitizeUser(user) }
})
