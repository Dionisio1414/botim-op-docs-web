<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
  icon: string
  color?: string
}>()
</script>

<template>
  <div class="rounded-lg border border-(--ui-border) p-4">
    <div class="flex items-center gap-3">
      <div class="flex size-10 items-center justify-center rounded-md bg-(--ui-bg-elevated)">
        <UIcon :name="icon" class="size-5 text-(--ui-text-muted)" />
      </div>
      <div>
        <p class="text-2xl font-bold text-(--ui-text-highlighted)">
          {{ value }}
        </p>
        <p class="text-xs text-(--ui-text-muted)">
          {{ title }}
        </p>
      </div>
    </div>
  </div>
</template>
