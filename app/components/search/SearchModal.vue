<script setup lang="ts">
const show = defineModel<boolean>({ default: false })
const query = ref('')
const results = ref<any[]>([])
const loading = ref(false)
const { api } = useApi()

async function search() {
  if (!query.value.trim()) {
    results.value = []
    return
  }
  loading.value = true
  try {
    const res = await api<{ results: any[] }>(`/search?q=${encodeURIComponent(query.value)}`)
    results.value = res.results
  }
  catch {
    results.value = []
  }
  finally {
    loading.value = false
  }
}

function onSelect(slug: string) {
  show.value = false
  query.value = ''
  results.value = []
  navigateTo(`/docs/${slug}`)
}

watch(query, () => {
  search()
})

watch(show, (val) => {
  if (!val) {
    query.value = ''
    results.value = []
  }
})
</script>

<template>
  <UModal v-model:open="show">
    <template #content>
      <div class="p-4">
        <UInput
          v-model="query"
          icon="i-lucide-search"
          placeholder="Search docs..."
          autofocus
          class="w-full"
          size="lg"
        />

        <div v-if="loading" class="mt-4 text-center text-sm text-(--ui-text-muted)">
          Searching...
        </div>

        <div v-else-if="results.length" class="mt-2 flex max-h-80 flex-col gap-1 overflow-y-auto">
          <button
            v-for="item in results"
            :key="item.slug"
            class="flex flex-col gap-0.5 rounded-md px-3 py-2 text-left transition-colors hover:bg-(--ui-bg-elevated)"
            @click="onSelect(item.slug)"
          >
            <span class="text-sm font-medium text-(--ui-text-highlighted)">{{ item.title }}</span>
            <span class="line-clamp-1 text-xs text-(--ui-text-muted)">{{ item.description }}</span>
          </button>
        </div>

        <div v-else-if="query.trim()" class="mt-4 text-center text-sm text-(--ui-text-muted)">
          No results found
        </div>

        <div class="mt-3 flex items-center justify-between text-xs text-(--ui-text-dimmed)">
          <span>Type to search</span>
          <kbd class="rounded border border-(--ui-border) px-1.5 py-0.5 text-xs">esc</kbd>
        </div>
      </div>
    </template>
  </UModal>
</template>
