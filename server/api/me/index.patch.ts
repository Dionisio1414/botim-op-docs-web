import { requireAuth, sanitizeUser } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const body = await readBody<{ name?: string, email?: string }>(event)

  if (body?.name) user.name = body.name
  if (body?.email) user.email = body.email

  return { user: sanitizeUser(user) }
})
