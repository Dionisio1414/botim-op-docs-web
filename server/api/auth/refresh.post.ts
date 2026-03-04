import { mockUsers } from '../../data/mockUsers'
import { accessTokens, refreshTokens, generateToken } from '../../data/mockTokens'
import { sanitizeUser } from '../../utils/auth'

export default defineEventHandler((event) => {
  const refresh = getCookie(event, 'refresh_token')

  if (!refresh) {
    throw createError({ statusCode: 401, statusMessage: 'No refresh token' })
  }

  const userId = refreshTokens.get(refresh)
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid refresh token' })
  }

  const user = mockUsers.find(u => u.id === userId)
  if (!user || user.status !== 'active') {
    refreshTokens.delete(refresh)
    throw createError({ statusCode: 401, statusMessage: 'User not found or disabled' })
  }

  // Rotate tokens
  const oldAccess = getCookie(event, 'access_token')
  if (oldAccess) accessTokens.delete(oldAccess)
  refreshTokens.delete(refresh)

  const newAccess = generateToken('acc')
  const newRefresh = generateToken('ref')
  accessTokens.set(newAccess, user.id)
  refreshTokens.set(newRefresh, user.id)

  setCookie(event, 'access_token', newAccess, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 15,
    sameSite: 'lax',
  })

  setCookie(event, 'refresh_token', newRefresh, {
    httpOnly: true,
    path: '/api/auth/refresh',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })

  return { user: sanitizeUser(user) }
})
