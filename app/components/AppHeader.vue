<script setup lang="ts">
const colorMode = useColorMode()
const { user, isAuthenticated, isAdmin, isEditor, logout } = useAuth()

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const showSearch = ref(false)

function openSearch() {
  showSearch.value = true
}

// Cmd+K / Ctrl+K shortcut
function onKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    openSearch()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

provide('search-modal', showSearch)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-(--ui-border) bg-(--ui-bg)/75 backdrop-blur">
    <div class="mx-auto flex h-14 items-center justify-between px-4 lg:px-6">
      <div class="flex items-center gap-3">
        <slot name="leading" />
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <img
            :src="colorMode.value === 'dark' ? '/logo/logo-light.svg' : '/logo/logo-dark.svg'"
            alt="Botim OP Docs Logo"
            class="h-7 w-7"
          >
          <span class="text-base font-semibold text-(--ui-text-highlighted)">Botim OP Docs</span>
        </NuxtLink>
      </div>

      <div class="flex items-center gap-1">
        <!-- Search button -->
        <UButton
          icon="i-lucide-search"
          color="neutral"
          variant="ghost"
          size="sm"
          aria-label="Search (Cmd+K)"
          @click="openSearch"
        />

        <UButton
          :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
          color="neutral"
          variant="ghost"
          size="sm"
          aria-label="Toggle color mode"
          @click="toggleColorMode"
        />

        <UButton
          icon="i-lucide-github"
          color="neutral"
          variant="ghost"
          size="sm"
          to="https://github.com/myorg/open-platform"
          target="_blank"
          aria-label="GitHub"
        />

        <!-- Auth nav -->
        <template v-if="isAuthenticated">
          <UDropdownMenu
            :items="[
              [
                { label: user?.name || 'Account', icon: 'i-lucide-user', disabled: true },
              ],
              [
                { label: 'My Tickets', icon: 'i-lucide-ticket', to: '/tickets' },
                { label: 'Account', icon: 'i-lucide-settings', to: '/account' },
              ],
              ...(isAdmin || isEditor
                ? [[{ label: 'Admin Panel', icon: 'i-lucide-shield', to: '/admin/docs' }]]
                : []),
              [
                { label: 'Sign Out', icon: 'i-lucide-log-out', click: logout },
              ],
            ]"
          >
            <UButton
              icon="i-lucide-user"
              color="neutral"
              variant="ghost"
              size="sm"
              aria-label="User menu"
            />
          </UDropdownMenu>
        </template>
        <template v-else>
          <UButton
            to="/login"
            variant="ghost"
            color="neutral"
            size="sm"
          >
            Sign In
          </UButton>
        </template>
      </div>
    </div>

    <!-- Search modal -->
    <SearchModal v-model="showSearch" />
  </header>
</template>
