<script setup lang="ts">
interface TocItem {
  id: string
  text: string
  level: number
}

const props = defineProps<{
  items: TocItem[]
}>()

const emit = defineEmits<{
  navigate: []
}>()

const activeId = ref('')

onMounted(() => {
  const headingEls = props.items
    .map(item => document.getElementById(item.id))
    .filter(Boolean) as HTMLElement[]

  if (!headingEls.length) return

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

  headingEls.forEach(el => observer.observe(el))

  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <nav v-if="items.length" class="flex flex-col gap-1 text-xs">
    <span class="mb-1 font-semibold uppercase tracking-wider text-(--ui-text-muted)">
      On this page
    </span>
    <a
      v-for="item in items"
      :key="item.id"
      :href="`#${item.id}`"
      class="block border-l-2 py-1 transition-colors"
      @click="emit('navigate')"
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
