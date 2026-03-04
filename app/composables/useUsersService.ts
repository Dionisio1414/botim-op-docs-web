import type { AuthUser } from './useAuth'

export function useUsersService() {
  const { api } = useApi()

  function listUsers() {
    return api<{ users: AuthUser[] }>('/users')
  }

  function getUser(id: string) {
    return api<{ user: AuthUser }>(`/users/${id}`)
  }

  function createUser(data: { email: string, password: string, name: string, role?: string }) {
    return api<{ user: AuthUser }>('/users', {
      method: 'POST',
      body: data,
    })
  }

  function updateUser(id: string, data: Partial<AuthUser>) {
    return api<{ user: AuthUser }>(`/users/${id}`, {
      method: 'PATCH',
      body: data,
    })
  }

  function deleteUser(id: string) {
    return api<{ ok: boolean }>(`/users/${id}`, {
      method: 'DELETE',
    })
  }

  return { listUsers, getUser, createUser, updateUser, deleteUser }
}
