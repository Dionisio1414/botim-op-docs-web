<script setup lang="ts">
defineProps<{
  title: string
  description: string
  slug: string
  section: string
}>()
</script>

<template>
  <NuxtLink
    :to="`/docs/${slug}`"
    class="flex flex-col gap-0.5 rounded-md px-3 py-2 transition-colors hover:bg-(--ui-bg-elevated)"
  >
    <div class="flex items-center gap-2">
      <UBadge variant="subtle" color="neutral" size="xs">{{ section }}</UBadge>
      <span class="text-sm font-medium text-(--ui-text-highlighted)">{{ title }}</span>
    </div>
    <span class="line-clamp-1 text-xs text-(--ui-text-muted)">{{ description }}</span>
  </NuxtLink>
</template>
