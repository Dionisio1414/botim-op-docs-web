<script setup lang="ts">
const props = defineProps<{
  status: string
}>()

const colorMap: Record<string, string> = {
  open: 'info',
  in_progress: 'warning',
  resolved: 'success',
  closed: 'neutral',
}

const color = computed(() => colorMap[props.status] || 'neutral')
const label = computed(() => props.status.replace('_', ' '))
</script>

<template>
  <UBadge :color="color as any" variant="subtle" size="sm" class="capitalize">
    {{ label }}
  </UBadge>
</template>
