<script setup lang="ts">
const emit = defineEmits<{ navigate: [] }>()
const route = useRoute()

const { data: navigation } = await useAsyncData('docs-navigation', () =>
  queryCollectionNavigation('docs'),
)
</script>

<template>
  <nav v-if="navigation?.length" class="flex flex-col gap-1">
    <template v-for="group in navigation" :key="group.path">
      <p class="mb-1 mt-4 first:mt-0 text-xs font-semibold uppercase tracking-wider text-(--ui-text-muted)">
        {{ group.title }}
      </p>
      <template v-if="group.children?.length">
        <NuxtLink
          v-for="child in group.children"
          :key="child.path"
          :to="child.path"
          class="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors"
          :class="route.path === child.path
            ? 'bg-(--ui-primary)/10 font-medium text-(--ui-primary)'
            : 'text-(--ui-text-muted) hover:bg-(--ui-bg-elevated) hover:text-(--ui-text)'"
          @click="emit('navigate')"
        >
          {{ child.title }}
        </NuxtLink>
      </template>
    </template>
  </nav>
</template>
