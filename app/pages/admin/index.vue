<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { api } = useApi()

const stats = ref<any>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await api<{ stats: any }>('/admin/stats')
    stats.value = res.stats
  }
  finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h1 class="mb-6 text-2xl font-bold text-(--ui-text-highlighted)">
      Dashboard
    </h1>

    <div v-if="loading" class="py-8 text-center text-(--ui-text-muted)">
      Loading...
    </div>

    <div v-else-if="stats" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <AdminStatCard
        title="Total Users"
        :value="stats.totalUsers"
        icon="i-lucide-users"
      />
      <AdminStatCard
        title="Published Docs"
        :value="stats.publishedDocs"
        icon="i-lucide-file-text"
      />
      <AdminStatCard
        title="Draft Docs"
        :value="stats.draftDocs"
        icon="i-lucide-file-edit"
      />
      <AdminStatCard
        title="Open Tickets"
        :value="stats.openTickets"
        icon="i-lucide-ticket"
      />
    </div>

    <div v-if="stats" class="mt-8 grid gap-4 sm:grid-cols-2">
      <div class="rounded-lg border border-(--ui-border) p-4">
        <h2 class="mb-2 text-sm font-semibold text-(--ui-text-highlighted)">
          Documents
        </h2>
        <p class="text-sm text-(--ui-text-muted)">
          {{ stats.totalDocs }} total &middot; {{ stats.publishedDocs }} published &middot; {{ stats.draftDocs }} drafts
        </p>
        <UButton to="/admin/docs" size="xs" variant="ghost" class="mt-2">
          Manage Docs
        </UButton>
      </div>

      <div class="rounded-lg border border-(--ui-border) p-4">
        <h2 class="mb-2 text-sm font-semibold text-(--ui-text-highlighted)">
          Tickets
        </h2>
        <p class="text-sm text-(--ui-text-muted)">
          {{ stats.totalTickets }} total &middot; {{ stats.openTickets }} open &middot; {{ stats.resolvedTickets }} resolved
        </p>
        <UButton to="/admin/tickets" size="xs" variant="ghost" class="mt-2">
          Manage Tickets
        </UButton>
      </div>
    </div>
  </div>
</template>
