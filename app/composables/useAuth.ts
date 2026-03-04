export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'editor' | 'viewer'
  status: string
  createdAt: string
}

export function useAuth() {
  const user = useState<AuthUser | null>('auth:user', () => null)
  const pending = useState('auth:pending', () => false)
  const { api } = useApi()

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isEditor = computed(() => user.value?.role === 'editor' || user.value?.role === 'admin')

  async function login(email: string, password: string) {
    pending.value = true
    try {
      const res = await api<{ user: AuthUser }>('/auth/login', {
        method: 'POST',
        body: { email, password },
      })
      user.value = res.user
      return res.user
    }
    finally {
      pending.value = false
    }
  }

  async function register(email: string, password: string, name: string) {
    pending.value = true
    try {
      const res = await api<{ user: AuthUser }>('/auth/register', {
        method: 'POST',
        body: { email, password, name },
      })
      user.value = res.user
      return res.user
    }
    finally {
      pending.value = false
    }
  }

  async function logout() {
    try {
      await api('/auth/logout', { method: 'POST' })
    }
    catch {}
    user.value = null
    navigateTo('/login')
  }

  async function fetchUser() {
    try {
      const res = await api<{ user: AuthUser }>('/me')
      user.value = res.user
    }
    catch {
      user.value = null
    }
  }

  async function updateProfile(data: { name?: string, email?: string }) {
    const res = await api<{ user: AuthUser }>('/me', {
      method: 'PATCH',
      body: data,
    })
    user.value = res.user
    return res.user
  }

  async function changePassword(currentPassword: string, newPassword: string) {
    await api('/me/password', {
      method: 'PATCH',
      body: { currentPassword, newPassword },
    })
  }

  return {
    user,
    pending,
    isAuthenticated,
    isAdmin,
    isEditor,
    login,
    register,
    logout,
    fetchUser,
    updateProfile,
    changePassword,
  }
}
