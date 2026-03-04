import type { FetchOptions } from 'ofetch'

export function useApi() {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl as string

  async function api<T>(path: string, opts: FetchOptions = {}): Promise<T> {
    try {
      return await $fetch<T>(path, {
        baseURL,
        credentials: 'include',
        ...opts,
      })
    }
    catch (error: any) {
      // Auto refresh on 401
      if (error?.status === 401 && !path.includes('/auth/')) {
        try {
          await $fetch('/auth/refresh', {
            baseURL,
            method: 'POST',
            credentials: 'include',
          })
          // Retry original request
          return await $fetch<T>(path, {
            baseURL,
            credentials: 'include',
            ...opts,
          })
        }
        catch {
          // Refresh failed — clear state and redirect
          useState('auth:user').value = null
          navigateTo('/login')
          throw error
        }
      }
      throw error
    }
  }

  return { api }
}
