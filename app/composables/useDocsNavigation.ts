export function useDocsNavigation() {
  return useFetch('/api/docs/navigation', {
    key: 'docs-navigation',
  })
}
