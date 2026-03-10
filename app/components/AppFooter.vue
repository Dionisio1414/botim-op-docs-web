<template>
  <footer class="border-t border-(--ui-border) bg-(--ui-bg)">
    <div class="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 text-sm text-(--ui-text-muted) sm:flex-row sm:justify-between lg:px-8">
      <p>&copy; {{ new Date().getFullYear() }} Botim Open Platform. All rights reserved.</p>
      <div class="flex items-center gap-4">
        <NuxtLink to="/docs/getting-started/introduction" class="hover:text-(--ui-text)">
          Documentation
        </NuxtLink>
        <NuxtLink to="/search" class="hover:text-(--ui-text)">
          Search
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
