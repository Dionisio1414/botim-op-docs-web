<script setup lang="ts">
const route = useRoute()

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: 'i-lucide-layout-dashboard' },
  { label: 'Documents', to: '/admin/docs', icon: 'i-lucide-file-text' },
  { label: 'Create New', to: '/admin/create', icon: 'i-lucide-plus-circle' },
]
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header class="sticky top-0 z-50 border-b border-(--ui-border) bg-(--ui-bg)/80 backdrop-blur-lg">
      <div class="flex h-14 items-center gap-4 px-4 lg:px-8">
        <NuxtLink to="/admin" class="flex items-center gap-2 font-bold text-(--ui-text-highlighted)">
          <UIcon name="i-lucide-shield" class="size-5 text-(--ui-primary)" />
          Admin Panel
        </NuxtLink>

        <div class="ml-auto flex items-center gap-2">
          <UButton to="/" variant="ghost" color="neutral" size="sm" icon="i-lucide-external-link">
            View Site
          </UButton>
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-log-out"
            @click="$fetch('/api/auth/logout', { method: 'POST' }).then(() => navigateTo('/admin/login'))"
          />
        </div>
      </div>
    </header>

    <div class="flex flex-1">
      <aside class="hidden w-56 shrink-0 border-r border-(--ui-border) bg-(--ui-bg-elevated)/50 lg:block">
        <nav class="flex flex-col gap-1 p-4">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors"
            :class="route.path === item.to
              ? 'bg-(--ui-primary)/10 font-medium text-(--ui-primary)'
              : 'text-(--ui-text-muted) hover:bg-(--ui-bg-elevated) hover:text-(--ui-text)'"
          >
            <UIcon :name="item.icon" class="size-4" />
            {{ item.label }}
          </NuxtLink>
        </nav>
      </aside>

      <main class="flex-1 p-6 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
