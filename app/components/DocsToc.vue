<script setup lang="ts">
const headings = ref<Array<{ id: string, text: string, level: number }>>([])
const activeId = ref('')

function extractHeadings() {
  if (!import.meta.client) return
  const els = document.querySelectorAll('.docs-content h2, .docs-content h3')
  headings.value = Array.from(els).map(el => ({
    id: el.id,
    text: el.textContent?.trim() ?? '',
    level: el.tagName === 'H2' ? 2 : 3,
  }))
}

onMounted(() => {
  extractHeadings()

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
          break
        }
      }
    },
    { rootMargin: '-64px 0px -75% 0px', threshold: 0 },
  )

  watch(headings, (items) => {
    observer.disconnect()
    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
  }, { immediate: true })

  onUnmounted(() => observer.disconnect())
})

watch(() => useRoute().path, () => {
  nextTick(() => extractHeadings())
})
</script>

<template>
  <nav v-if="headings.length" class="flex flex-col gap-1 text-xs">
    <span class="mb-1 font-semibold uppercase tracking-wider text-(--ui-text-muted)">
      On this page
    </span>
    <a
      v-for="item in headings"
      :key="item.id"
      :href="`#${item.id}`"
      class="block border-l-2 py-1 transition-colors"
      :class="[
        item.level === 3 ? 'pl-5' : 'pl-3',
        activeId === item.id
          ? 'border-(--ui-primary) font-medium text-(--ui-text-highlighted)'
          : 'border-transparent text-(--ui-text-muted) hover:border-(--ui-border-hover) hover:text-(--ui-text)',
      ]"
    >
      {{ item.text }}
    </a>
  </nav>
</template>
