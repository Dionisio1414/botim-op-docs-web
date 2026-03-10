export function useAdminAuth() {
  const isAuthenticated = useState('admin-auth', () => false)
  const isLoading = useState('admin-auth-loading', () => true)

  async function check() {
    try {
      const { authenticated } = await $fetch<{ authenticated: boolean }>('/api/auth/check')
      isAuthenticated.value = authenticated
    }
    catch {
      isAuthenticated.value = false
    }
    finally {
      isLoading.value = false
    }
  }

  async function login(password: string) {
    await $fetch('/api/auth/login', { method: 'POST', body: { password } })
    isAuthenticated.value = true
  }

  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' })
    isAuthenticated.value = false
    navigateTo('/admin/login')
  }

  return { isAuthenticated, isLoading, check, login, logout }
}
