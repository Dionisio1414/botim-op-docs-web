export default defineEventHandler(async (event) => {
  const { password } = await readBody<{ password: string }>(event)
  const config = useRuntimeConfig()

  if (!password || password !== config.adminPassword) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid password' })
  }

  setCookie(event, 'admin-session', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  })

  return { ok: true }
})
