<script setup lang="ts">
const isSidebarOpen = ref(false)
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />

    <div class="mx-auto flex w-full max-w-7xl flex-1 px-4 lg:px-8">
      <!-- Mobile sidebar toggle -->
      <div class="fixed bottom-4 right-4 z-40 lg:hidden">
        <UButton
          icon="i-lucide-panel-left"
          size="lg"
          color="primary"
          class="shadow-lg"
          @click="isSidebarOpen = true"
        />
      </div>

      <!-- Mobile sidebar drawer -->
      <USlideover v-model:open="isSidebarOpen" side="left" title="Navigation">
        <template #body>
          <DocsSidebar @navigate="isSidebarOpen = false" />
        </template>
      </USlideover>

      <!-- Desktop sidebar -->
      <aside class="hidden w-56 shrink-0 lg:block">
        <div class="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto py-8 pr-4">
          <DocsSidebar />
        </div>
      </aside>

      <!-- Main content -->
      <main class="min-w-0 flex-1 py-8 lg:px-8">
        <div class="mx-auto max-w-4xl">
          <slot />
        </div>
      </main>

      <!-- Table of contents -->
      <aside class="hidden w-48 shrink-0 xl:block">
        <div class="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto py-8 pl-4">
          <DocsToc />
        </div>
      </aside>
    </div>

    <AppFooter />
  </div>
</template>
