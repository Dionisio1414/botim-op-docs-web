export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/admin/login') return

  const { isAuthenticated, check } = useAdminAuth()
  await check()

  if (!isAuthenticated.value) {
    return navigateTo('/admin/login')
  }
})
