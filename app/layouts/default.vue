<template>
  <div class="flex min-h-screen flex-col bg-(--ui-bg)">
    <AppHeader />
    <div class="flex-1">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>
