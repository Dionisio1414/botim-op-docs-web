<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Admin - Dashboard' })

const { data: docs, refresh } = await useFetch<Array<{ slug: string, title: string, updatedAt: string }>>('/api/admin/docs')

const docCount = computed(() => docs.value?.length ?? 0)
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-(--ui-text-highlighted)">
        Dashboard
      </h1>
      <p class="mt-1 text-(--ui-text-muted)">
        Manage your documentation content.
      </p>
    </div>

    <div class="grid gap-4 sm:grid-cols-3">
      <div class="rounded-lg border border-(--ui-border) p-6">
        <p class="text-sm text-(--ui-text-muted)">Total Documents</p>
        <p class="mt-2 text-3xl font-bold text-(--ui-text-highlighted)">
          {{ docCount }}
        </p>
      </div>
      <div class="rounded-lg border border-(--ui-border) p-6">
        <p class="text-sm text-(--ui-text-muted)">Quick Actions</p>
        <div class="mt-3 flex gap-2">
          <UButton to="/admin/create" size="sm" icon="i-lucide-plus">
            New Doc
          </UButton>
          <UButton to="/admin/docs" size="sm" variant="outline" icon="i-lucide-list">
            View All
          </UButton>
        </div>
      </div>
      <div class="rounded-lg border border-(--ui-border) p-6">
        <p class="text-sm text-(--ui-text-muted)">Recently Updated</p>
        <div v-if="docs?.length" class="mt-3 space-y-1">
          <NuxtLink
            v-for="doc in docs.slice(0, 3)"
            :key="doc.slug"
            :to="`/admin/${doc.slug}/edit`"
            class="block truncate text-sm text-(--ui-primary) hover:underline"
          >
            {{ doc.title }}
          </NuxtLink>
        </div>
        <p v-else class="mt-3 text-sm text-(--ui-text-muted)">
          No documents yet.
        </p>
      </div>
    </div>
  </div>
</template>
