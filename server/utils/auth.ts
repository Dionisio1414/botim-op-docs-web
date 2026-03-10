import type { H3Event } from 'h3'

export function requireAdmin(event: H3Event) {
  const session = getCookie(event, 'admin-session')
  if (session !== 'authenticated') {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}
