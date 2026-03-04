import { mockUsers, nextUserId } from '../../data/mockUsers'
import { accessTokens, refreshTokens, generateToken } from '../../data/mockTokens'
import { sanitizeUser } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string, password?: string, name?: string }>(event)

  if (!body?.email || !body?.password || !body?.name) {
    throw createError({ statusCode: 400, statusMessage: 'Email, password, and name are required' })
  }

  if (mockUsers.some(u => u.email === body.email)) {
    throw createError({ statusCode: 409, statusMessage: 'Email already registered' })
  }

  const user = {
    id: nextUserId(),
    email: body.email,
    password: body.password,
    name: body.name,
    role: 'viewer' as const,
    status: 'active' as const,
    createdAt: new Date().toISOString(),
  }

  mockUsers.push(user)

  const access = generateToken('acc')
  const refresh = generateToken('ref')
  accessTokens.set(access, user.id)
  refreshTokens.set(refresh, user.id)

  setCookie(event, 'access_token', access, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 15,
    sameSite: 'lax',
  })

  setCookie(event, 'refresh_token', refresh, {
    httpOnly: true,
    path: '/api/auth/refresh',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })

  return { user: sanitizeUser(user) }
})
