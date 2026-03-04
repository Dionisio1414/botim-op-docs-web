import { requireAuth, sanitizeUser } from '../../utils/auth'

export default defineEventHandler((event) => {
  const user = requireAuth(event)
  return { user: sanitizeUser(user) }
})
