import type { H3Event } from 'h3'
import { mockUsers } from '../data/mockUsers'
import { accessTokens } from '../data/mockTokens'

export function getUserFromEvent(event: H3Event) {
  const token = getCookie(event, 'access_token')
  if (!token) return null

  const userId = accessTokens.get(token)
  if (!userId) return null

  const user = mockUsers.find(u => u.id === userId)
  if (!user || user.status !== 'active') return null

  return user
}

export function requireAuth(event: H3Event) {
  const user = getUserFromEvent(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  return user
}

export function requireRole(event: H3Event, ...roles: string[]) {
  const user = requireAuth(event)
  if (!roles.includes(user.role)) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }
  return user
}

export function sanitizeUser(user: typeof mockUsers[number]) {
  const { password: _, ...safe } = user
  return safe
}
