import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const body = await readBody<{ currentPassword?: string, newPassword?: string }>(event)

  if (!body?.currentPassword || !body?.newPassword) {
    throw createError({ statusCode: 400, statusMessage: 'Current and new password are required' })
  }

  if (user.password !== body.currentPassword) {
    throw createError({ statusCode: 400, statusMessage: 'Current password is incorrect' })
  }

  user.password = body.newPassword
  return { ok: true }
})
