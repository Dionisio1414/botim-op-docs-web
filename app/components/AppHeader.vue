<script setup lang="ts">
const colorMode = useColorMode()
const searchOpen = useState('search-open', () => false)

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

function openSearch() {
  searchOpen.value = true
}

const isMac = import.meta.client ? navigator.platform.toUpperCase().includes('MAC') : true
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-(--ui-border) bg-(--ui-bg)/80 backdrop-blur-lg">
    <div class="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 lg:px-8">
      <NuxtLink to="/" class="flex items-center gap-2 font-bold text-(--ui-text-highlighted)">
        <UIcon name="i-lucide-book-marked" class="size-6 text-(--ui-primary)" />
        <span class="hidden sm:inline">Botim OP Docs</span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 md:flex">
        <UButton to="/docs/getting-started/introduction" variant="ghost" color="neutral" size="sm">
          Docs
        </UButton>
        <UButton to="/search" variant="ghost" color="neutral" size="sm">
          Search
        </UButton>
      </nav>

      <div class="ml-auto flex items-center gap-2">
        <UButton
          variant="outline"
          color="neutral"
          size="sm"
          class="hidden w-52 justify-start text-(--ui-text-muted) sm:flex"
          icon="i-lucide-search"
          @click="openSearch"
        >
          <span class="flex-1 text-left">Search docs...</span>
          <UKbd>{{ isMac ? '⌘' : 'Ctrl' }}</UKbd>
          <UKbd>K</UKbd>
        </UButton>

        <UButton
          variant="ghost"
          color="neutral"
          size="sm"
          class="sm:hidden"
          icon="i-lucide-search"
          @click="openSearch"
        />

        <UButton
          :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
          variant="ghost"
          color="neutral"
          size="sm"
          @click="toggleColorMode"
        />

        <UButton
          to="/admin"
          icon="i-lucide-lock"
          variant="ghost"
          color="neutral"
          size="sm"
        />
      </div>
    </div>
  </header>
</template>
