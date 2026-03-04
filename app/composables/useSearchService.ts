export interface SearchResult {
  slug: string
  title: string
  description: string
  section: string
}

export function useSearchService() {
  const { api } = useApi()

  function search(q: string) {
    return api<{ results: SearchResult[] }>(`/search?q=${encodeURIComponent(q)}`)
  }

  return { search }
}
