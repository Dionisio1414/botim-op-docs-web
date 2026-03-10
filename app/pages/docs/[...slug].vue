<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

const route = useRoute()
const slug = computed(() => {
  const params = route.params.slug
  return Array.isArray(params) ? params.join('/') : params
})

const { data: page, error } = await useDocPage(slug as Ref<string>)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useHead({
  title: page.value?.title ? `${page.value.title} - Botim OP Docs` : 'Botim OP Docs',
  meta: [
    { name: 'description', content: page.value?.description || '' },
  ],
})

const tocItems = computed(() =>
  [...(page.value?.body ?? '').matchAll(/^(#{2,3})\s+(.+)$/gm)].map(m => ({
    level: m[1]!.length,
    text: m[2]!.trim(),
    id: m[2]!.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
  })),
)

const viewMode = ref<'rendered' | 'source'>('rendered')
const isTocOpen = ref(false)
const copied = ref(false)

async function copyMarkdown() {
  if (!page.value?.body) return
  try {
    await navigator.clipboard.writeText(page.value.body)
  }
  catch {
    const ta = document.createElement('textarea')
    ta.value = page.value.body
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  }
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div>
    <div v-if="page?.body" class="flex gap-8">
      <div class="min-w-0 flex-1">
        <div class="mb-4 flex items-center justify-between">
          <h1 class="sr-only">
            {{ page.title }}
          </h1>
          <div class="ml-auto flex items-center gap-2">
            <UButton
              v-if="tocItems.length"
              icon="i-lucide-list"
              size="xs"
              variant="ghost"
              color="neutral"
              class="xl:hidden"
              @click="isTocOpen = !isTocOpen"
            >
              On this page
            </UButton>
            <UButton
              icon="i-lucide-book-open"
              size="xs"
              :variant="viewMode === 'rendered' ? 'solid' : 'ghost'"
              color="neutral"
              @click="viewMode = 'rendered'"
            >
              Rendered
            </UButton>
            <UButton
              icon="i-lucide-code"
              size="xs"
              :variant="viewMode === 'source' ? 'solid' : 'ghost'"
              color="neutral"
              @click="viewMode = 'source'"
            >
              Source
            </UButton>
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

        <!-- Mobile TOC dropdown -->
        <div
          v-if="isTocOpen && tocItems.length"
          class="mb-4 rounded-md border border-(--ui-border) bg-(--ui-bg-elevated) p-4 xl:hidden"
        >
          <DocsToc :items="tocItems" @navigate="isTocOpen = false" />
        </div>

        <MDC v-if="viewMode === 'rendered'" :value="page.body" />

        <pre
          v-else
          class="max-h-[calc(100vh-12rem)] overflow-auto rounded-md border border-(--ui-border) bg-(--ui-bg-elevated) p-4 text-sm leading-relaxed text-(--ui-text) whitespace-pre-wrap break-words"
        >{{ page.body }}</pre>
      </div>

      <aside v-if="tocItems.length" class="hidden w-48 shrink-0 xl:block">
        <div class="sticky top-20">
          <DocsToc :items="tocItems" />
        </div>
      </aside>
    </div>
    <div v-else class="py-20 text-center text-(--ui-text-muted)">
      Loading...
    </div>
  </div>
</template>
