<script setup lang="ts">
const isSidebarOpen = ref(false)
</script>

<template>
  <div class="flex min-h-screen flex-col bg-(--ui-bg)">
    <AppHeader>
      <template #leading>
        <UButton
          icon="i-lucide-menu"
          color="neutral"
          variant="ghost"
          size="sm"
          class="lg:hidden"
          aria-label="Toggle sidebar"
          @click="isSidebarOpen = !isSidebarOpen"
        />
      </template>
    </AppHeader>

    <div class="mx-auto flex max-w-7xl flex-1">
      <!-- Desktop sidebar -->
      <aside class="hidden w-64 shrink-0 lg:block">
        <div class="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-(--ui-border) px-2">
          <DocsSidebar />
        </div>
      </aside>

      <!-- Mobile sidebar overlay -->
      <Teleport to="body">
        <Transition name="fade">
          <div
            v-if="isSidebarOpen"
            class="fixed inset-0 z-40 bg-black/50 lg:hidden"
            @click="isSidebarOpen = false"
          />
        </Transition>
        <Transition name="slide">
          <aside
            v-if="isSidebarOpen"
            class="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto border-r border-(--ui-border) bg-(--ui-bg) px-2 shadow-xl lg:hidden"
          >
            <div class="flex h-14 items-center justify-between px-3">
              <span class="text-sm font-semibold text-(--ui-text-highlighted)">Navigation</span>
              <UButton
                icon="i-lucide-x"
                color="neutral"
                variant="ghost"
                size="xs"
                @click="isSidebarOpen = false"
              />
            </div>
            <DocsSidebar />
          </aside>
        </Transition>
      </Teleport>

      <!-- Main content -->
      <main class="min-w-0 flex-1 px-6 py-8 lg:px-10">
        <div class="mx-auto max-w-3xl">
          <slot />
        </div>
      </main>
    </div>

    <AppFooter />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
