<script setup lang="ts">
const isOpen = useState('search-open', () => false)
const query = ref('')
const selectedIndex = ref(0)
const router = useRouter()

const { data: searchSections } = await useAsyncData('search-sections', () =>
  queryCollectionSearchSections('docs'),
)

const results = computed(() => {
  const q = query.value.toLowerCase().trim()
  if (!q || !searchSections.value) return []

  const terms = q.split(/\s+/).filter(Boolean)
  const matches = searchSections.value
    .filter((section) => {
      const haystack = `${section.title} ${section.titles.join(' ')} ${section.content}`.toLowerCase()
      return terms.every(term => haystack.includes(term))
    })
    .slice(0, 20)

  return matches
})

watch(query, () => {
  selectedIndex.value = 0
})

function navigate(path: string) {
  isOpen.value = false
  query.value = ''
  router.push(path)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIndex.value = Math.min(selectedIndex.value + 1, results.value.length - 1)
  }
  else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
  }
  else if (e.key === 'Enter') {
    const item = results.value[selectedIndex.value]
    if (!item) return
    e.preventDefault()
    navigate(item.id.replace(/^docs:/, '/docs/').replace(/#.*$/, '') + (item.id.includes('#') ? `#${item.id.split('#').pop()}` : ''))
  }
}

function highlightMatch(text: string) {
  if (!query.value.trim()) return text
  const terms = query.value.trim().split(/\s+/).filter(Boolean)
  let result = text
  for (const term of terms) {
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    result = result.replace(regex, '<mark class="bg-(--ui-primary)/20 text-(--ui-primary) rounded px-0.5">$1</mark>')
  }
  return result
}

function getSectionPath(section: { id: string }) {
  return section.id.replace(/^docs:/, '/docs/').replace(/#.*$/, '')
}

onMounted(() => {
  const handler = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      isOpen.value = !isOpen.value
    }
    if (e.key === 'Escape') {
      isOpen.value = false
    }
  }
  window.addEventListener('keydown', handler)
  onUnmounted(() => window.removeEventListener('keydown', handler))
})
</script>

<template>
  <UModal v-model:open="isOpen">
    <template #content>
      <div class="flex flex-col">
        <div class="flex items-center gap-3 border-b border-(--ui-border) px-4 py-3">
          <UIcon name="i-lucide-search" class="size-5 shrink-0 text-(--ui-text-muted)" />
          <input
            v-model="query"
            type="text"
            placeholder="Search documentation..."
            class="w-full bg-transparent text-sm text-(--ui-text) outline-none placeholder:text-(--ui-text-muted)"
            autofocus
            @keydown="handleKeydown"
          >
          <UKbd>Esc</UKbd>
        </div>

        <div class="max-h-96 overflow-y-auto p-2">
          <div v-if="!query.trim()" class="px-3 py-8 text-center text-sm text-(--ui-text-muted)">
            Type to search the documentation...
          </div>

          <div v-else-if="!results.length" class="px-3 py-8 text-center text-sm text-(--ui-text-muted)">
            No results found for "{{ query }}"
          </div>

          <template v-else>
            <button
              v-for="(result, i) in results"
              :key="result.id"
              class="flex w-full flex-col gap-1 rounded-md px-3 py-2 text-left transition-colors"
              :class="i === selectedIndex ? 'bg-(--ui-bg-elevated)' : 'hover:bg-(--ui-bg-elevated)/50'"
              @click="navigate(getSectionPath(result) + (result.id.includes('#') ? `#${result.id.split('#').pop()}` : ''))"
              @mouseenter="selectedIndex = i"
            >
              <div class="flex items-center gap-2">
                <span
                  v-if="result.titles.length"
                  class="text-xs text-(--ui-text-muted)"
                >
                  {{ result.titles.join(' > ') }}
                </span>
              </div>
              <span
                class="text-sm font-medium text-(--ui-text-highlighted)"
                v-html="highlightMatch(result.title || 'Untitled')"
              />
              <span
                v-if="result.content"
                class="line-clamp-2 text-xs text-(--ui-text-muted)"
                v-html="highlightMatch(result.content.slice(0, 200))"
              />
            </button>
          </template>
        </div>

        <div v-if="results.length" class="flex items-center gap-4 border-t border-(--ui-border) px-4 py-2 text-xs text-(--ui-text-muted)">
          <span class="flex items-center gap-1">
            <UKbd size="sm">&uarr;</UKbd>
            <UKbd size="sm">&darr;</UKbd>
            Navigate
          </span>
          <span class="flex items-center gap-1">
            <UKbd size="sm">&crarr;</UKbd>
            Open
          </span>
          <span class="ml-auto">{{ results.length }} results</span>
        </div>
      </div>
    </template>
  </UModal>
</template>
