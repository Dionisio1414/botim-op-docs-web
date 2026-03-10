export default defineEventHandler((event) => {
  const session = getCookie(event, 'admin-session')
  return { authenticated: session === 'authenticated' }
})
