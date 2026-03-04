<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const { search } = useSearchService()

const q = computed(() => (route.query.q as string) || '')
const results = ref<any[]>([])
const loading = ref(false)

async function doSearch() {
  if (!q.value.trim()) {
    results.value = []
    return
  }
  loading.value = true
  try {
    const res = await search(q.value)
    results.value = res.results
  }
  finally {
    loading.value = false
  }
}

watch(q, doSearch, { immediate: true })

useHead({ title: q.value ? `Search: ${q.value}` : 'Search' })
</script>

<template>
  <div class="mx-auto max-w-3xl px-6 py-8">
    <h1 class="text-2xl font-bold text-(--ui-text-highlighted)">
      Search Results
    </h1>
    <p v-if="q" class="mt-1 text-sm text-(--ui-text-muted)">
      Results for "{{ q }}"
    </p>

    <div v-if="loading" class="mt-8 text-center text-(--ui-text-muted)">
      Searching...
    </div>

    <div v-else-if="results.length" class="mt-6 flex flex-col gap-2">
      <SearchResultItem
        v-for="item in results"
        :key="item.slug"
        v-bind="item"
      />
    </div>

    <div v-else-if="q" class="mt-8 text-center text-(--ui-text-muted)">
      No results found for "{{ q }}"
    </div>

    <div v-else class="mt-8 text-center text-(--ui-text-muted)">
      Enter a search query to get started.
    </div>
  </div>
</template>
