<script setup lang="ts">
const props = defineProps<{
  roles?: string[]
}>()

const { user, isAuthenticated } = useAuth()

const allowed = computed(() => {
  if (!isAuthenticated.value) return false
  if (!props.roles?.length) return true
  return props.roles.includes(user.value?.role || '')
})
</script>

<template>
  <slot v-if="allowed" />
</template>
