export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated, isAdmin, isEditor } = useAuth()

  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }

  // Admin layout pages require at least editor role
  if (!isAdmin.value && !isEditor.value) {
    return navigateTo('/')
  }
})
