<script setup lang="ts">
const route = useRoute()
const { isAdmin } = useAuth()

const sections = computed(() => {
  const items = [
    { title: 'Documents', icon: 'i-lucide-file-text', to: '/admin/docs' },
  ]

  if (isAdmin.value) {
    items.unshift({ title: 'Dashboard', icon: 'i-lucide-layout-dashboard', to: '/admin' })
    items.push(
      { title: 'Users', icon: 'i-lucide-users', to: '/admin/users' },
      { title: 'Tickets', icon: 'i-lucide-ticket', to: '/admin/tickets' },
    )
  }

  return items
})

function isActive(to: string) {
  if (to === '/admin') return route.path === '/admin'
  return route.path.startsWith(to)
}
</script>

<template>
  <nav class="flex flex-col gap-1 py-4">
    <NuxtLink
      v-for="item in sections"
      :key="item.to"
      :to="item.to"
      class="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors"
      :class="[
        isActive(item.to)
          ? 'bg-(--ui-bg-elevated) font-medium text-(--ui-text-highlighted)'
          : 'text-(--ui-text-muted) hover:bg-(--ui-bg-elevated)/50 hover:text-(--ui-text)',
      ]"
    >
      <UIcon :name="item.icon" class="size-4" />
      {{ item.title }}
    </NuxtLink>

    <div class="my-2 border-t border-(--ui-border)" />

    <NuxtLink
      to="/tickets"
      class="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-(--ui-text-muted) hover:bg-(--ui-bg-elevated)/50 hover:text-(--ui-text)"
    >
      <UIcon name="i-lucide-arrow-left" class="size-4" />
      Back to site
    </NuxtLink>
  </nav>
</template>
