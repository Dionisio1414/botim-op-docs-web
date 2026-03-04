import { mockUsers } from '../../data/mockUsers'
import { accessTokens, refreshTokens, generateToken } from '../../data/mockTokens'
import { sanitizeUser } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string, password?: string }>(event)

  if (!body?.email || !body?.password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required' })
  }

  const user = mockUsers.find(u => u.email === body.email && u.password === body.password)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  if (user.status !== 'active') {
    throw createError({ statusCode: 403, statusMessage: 'Account is disabled' })
  }

  const access = generateToken('acc')
  const refresh = generateToken('ref')

  accessTokens.set(access, user.id)
  refreshTokens.set(refresh, user.id)

  setCookie(event, 'access_token', access, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 15, // 15 minutes
    sameSite: 'lax',
  })

  setCookie(event, 'refresh_token', refresh, {
    httpOnly: true,
    path: '/api/auth/refresh',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
  })

  return { user: sanitizeUser(user) }
})
