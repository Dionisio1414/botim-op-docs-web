<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const route = useRoute()

const { data: page, error } = await useAsyncData(
  `docs-${route.path}`,
  () => queryCollection('docs').path(route.path).first(),
  { watch: [() => route.path] },
)

if (error.value || !page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useHead({
  title: page.value?.title,
  meta: [
    { name: 'description', content: page.value?.description },
  ],
})

const { data: surroundRaw } = await useAsyncData(
  `docs-surround-${route.path}`,
  () => queryCollectionItemSurroundings('docs', route.path),
  { watch: [() => route.path] },
)

const prev = computed(() => (surroundRaw.value as any)?.[0] ?? null)
const next = computed(() => (surroundRaw.value as any)?.[1] ?? null)
</script>

<template>
  <div>
    <div v-if="page" class="docs-content">
      <div class="mb-8">
        <p v-if="page.category" class="mb-2 text-sm font-medium text-(--ui-primary)">
          {{ page.category }}
        </p>
        <h1 class="text-3xl font-bold tracking-tight text-(--ui-text-highlighted)">
          {{ page.title }}
        </h1>
        <p v-if="page.description" class="mt-2 text-lg text-(--ui-text-muted)">
          {{ page.description }}
        </p>
      </div>

      <ContentRenderer :value="page" />

      <!-- Prev / Next navigation -->
      <div v-if="prev || next" class="mt-12 grid gap-4 border-t border-(--ui-border) pt-8 sm:grid-cols-2">
        <NuxtLink
          v-if="prev"
          :to="prev.path"
          class="group flex flex-col rounded-lg border border-(--ui-border) p-4 transition-colors hover:border-(--ui-primary)"
        >
          <span class="text-xs text-(--ui-text-muted)">Previous</span>
          <span class="mt-1 font-medium text-(--ui-text-highlighted) group-hover:text-(--ui-primary)">
            &larr; {{ prev.title }}
          </span>
        </NuxtLink>
        <NuxtLink
          v-if="next"
          :to="next.path"
          class="group flex flex-col items-end rounded-lg border border-(--ui-border) p-4 text-right transition-colors hover:border-(--ui-primary)"
        >
          <span class="text-xs text-(--ui-text-muted)">Next</span>
          <span class="mt-1 font-medium text-(--ui-text-highlighted) group-hover:text-(--ui-primary)">
            {{ next.title }} &rarr;
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
