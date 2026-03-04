interface DocPageResponse {
  title: string
  description: string
  body: string
}

export function useDocPage(slug: Ref<string> | ComputedRef<string>) {
  return useAsyncData(
    `doc-${toValue(slug)}`,
    () => $fetch<DocPageResponse>(`/api/docs/${toValue(slug)}`),
    {
      watch: [slug],
    },
  )
}
