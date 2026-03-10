export default defineEventHandler((event) => {
  deleteCookie(event, 'admin-session', { path: '/' })
  return { ok: true }
})
