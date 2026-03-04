<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

const route = useRoute()
const slug = computed(() => {
  const params = route.params.slug
  return Array.isArray(params) ? params.join('/') : params
})

const { data: page, error } = await useDocPage(slug)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useHead({
  title: page.value?.title ? `${page.value.title} - Botim OP Docs` : 'Botim OP Docs',
  meta: [
    { name: 'description', content: page.value?.description || '' },
  ],
})

const copied = ref(false)

async function copyMarkdown() {
  if (!page.value?.body) return
  await navigator.clipboard.writeText(page.value.body)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div>
    <div v-if="page?.body">
      <div class="mb-4 flex items-center justify-between">
        <h1 class="sr-only">
          {{ page.title }}
        </h1>
        <div class="ml-auto">
          <UButton
            :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
            :color="copied ? 'success' : 'neutral'"
            variant="ghost"
            size="xs"
            @click="copyMarkdown"
          >
            {{ copied ? 'Copied!' : 'Copy Markdown' }}
          </UButton>
        </div>
      </div>
      <MDC :value="page.body" />
    </div>
    <div v-else class="py-20 text-center text-(--ui-text-muted)">
      Loading...
    </div>
  </div>
</template>
