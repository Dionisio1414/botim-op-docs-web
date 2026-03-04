<script setup lang="ts">
const { data: nav } = await useDocsNavigation()
const route = useRoute()

function isActive(slug: string) {
  return route.path === `/docs/${slug}`
}

function isSectionActive(section: { children: { slug: string }[] }) {
  return section.children.some(child => isActive(child.slug))
}
</script>

<template>
  <nav class="flex flex-col gap-1 py-4">
    <template v-for="section in nav?.sections" :key="section.slug">
      <div class="px-3 py-2">
        <h3 class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-(--ui-text-muted)">
          <UIcon :name="section.icon" class="size-4" />
          {{ section.title }}
        </h3>
      </div>
      <ul class="flex flex-col gap-0.5">
        <li v-for="child in section.children" :key="child.slug">
          <NuxtLink
            :to="`/docs/${child.slug}`"
            class="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors"
            :class="[
              isActive(child.slug)
                ? 'bg-(--ui-bg-elevated) font-medium text-(--ui-text-highlighted)'
                : 'text-(--ui-text-muted) hover:bg-(--ui-bg-elevated)/50 hover:text-(--ui-text)',
            ]"
          >
            {{ child.title }}
          </NuxtLink>
        </li>
      </ul>
    </template>
  </nav>
</template>
