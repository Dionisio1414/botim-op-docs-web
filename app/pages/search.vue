<script setup lang="ts">
definePageMeta({ layout: 'default' })

useHead({ title: 'Search Documentation' })

const isMac = import.meta.client ? navigator.platform.toUpperCase().includes('MAC') : true

const query = ref('')
const debouncedQuery = ref('')
let timeout: ReturnType<typeof setTimeout>

watch(query, (val) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    debouncedQuery.value = val
  }, 200)
})

const { data: searchSections } = await useAsyncData('search-sections-page', () =>
  queryCollectionSearchSections('docs'),
)

const results = computed(() => {
  const q = debouncedQuery.value.toLowerCase().trim()
  if (!q || !searchSections.value) return []

  const terms = q.split(/\s+/).filter(Boolean)
  return searchSections.value
    .filter((section) => {
      const haystack = `${section.title} ${section.titles.join(' ')} ${section.content}`.toLowerCase()
      return terms.every(term => haystack.includes(term))
    })
    .slice(0, 50)
})

const groupedResults = computed(() => {
  const groups = new Map<string, typeof results.value>()
  for (const result of results.value) {
    const path = result.id.replace(/^docs:/, '/docs/').replace(/#.*$/, '')
    if (!groups.has(path)) groups.set(path, [])
    groups.get(path)!.push(result)
  }
  return groups
})

function highlightMatch(text: string) {
  if (!debouncedQuery.value.trim()) return text
  const terms = debouncedQuery.value.trim().split(/\s+/).filter(Boolean)
  let result = text
  for (const term of terms) {
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    result = result.replace(regex, '<mark class="bg-(--ui-primary)/20 text-(--ui-primary) rounded px-0.5">$1</mark>')
  }
  return result
}
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-12 lg:px-8">
    <h1 class="text-3xl font-bold tracking-tight text-(--ui-text-highlighted)">
      Search Documentation
    </h1>
    <p class="mt-2 text-(--ui-text-muted)">
      Find what you need across all documentation pages.
    </p>

    <div class="mt-8">
      <UInput
        v-model="query"
        icon="i-lucide-search"
        placeholder="Search for topics, APIs, guides..."
        size="lg"
        autofocus
        class="w-full"
      />
    </div>

    <div class="mt-8">
      <div v-if="!debouncedQuery.trim()" class="py-12 text-center text-(--ui-text-muted)">
        <UIcon name="i-lucide-search" class="mx-auto mb-4 size-12 opacity-50" />
        <p>Start typing to search across all documentation.</p>
        <p class="mt-1 text-sm">
          Tip: Use
          <UKbd>{{ isMac ? '⌘' : 'Ctrl' }}</UKbd>
          <UKbd>K</UKbd>
          for quick search anywhere.
        </p>
      </div>

      <div v-else-if="!results.length" class="py-12 text-center text-(--ui-text-muted)">
        <UIcon name="i-lucide-search-x" class="mx-auto mb-4 size-12 opacity-50" />
        <p>No results found for "{{ debouncedQuery }}"</p>
        <p class="mt-1 text-sm">Try different keywords or check your spelling.</p>
      </div>

      <div v-else>
        <p class="mb-6 text-sm text-(--ui-text-muted)">
          {{ results.length }} results in {{ groupedResults.size }} pages
        </p>

        <div class="space-y-6">
          <div
            v-for="[path, sections] in groupedResults"
            :key="path"
            class="rounded-lg border border-(--ui-border) p-4"
          >
            <NuxtLink
              :to="path"
              class="text-sm font-semibold text-(--ui-primary) hover:underline"
            >
              {{ path }}
            </NuxtLink>

            <div class="mt-3 space-y-3">
              <NuxtLink
                v-for="section in sections"
                :key="section.id"
                :to="path + (section.id.includes('#') ? `#${section.id.split('#').pop()}` : '')"
                class="block rounded-md px-3 py-2 transition-colors hover:bg-(--ui-bg-elevated)"
              >
                <p
                  class="text-sm font-medium text-(--ui-text-highlighted)"
                  v-html="highlightMatch(section.title || 'Untitled')"
                />
                <p
                  v-if="section.content"
                  class="mt-1 line-clamp-2 text-xs text-(--ui-text-muted)"
                  v-html="highlightMatch(section.content.slice(0, 300))"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
