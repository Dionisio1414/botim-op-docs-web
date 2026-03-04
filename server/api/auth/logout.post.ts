import { accessTokens, refreshTokens } from '../../data/mockTokens'

export default defineEventHandler((event) => {
  const access = getCookie(event, 'access_token')
  const refresh = getCookie(event, 'refresh_token')

  if (access) accessTokens.delete(access)
  if (refresh) refreshTokens.delete(refresh)

  deleteCookie(event, 'access_token', { path: '/' })
  deleteCookie(event, 'refresh_token', { path: '/api/auth/refresh' })

  return { ok: true }
})
