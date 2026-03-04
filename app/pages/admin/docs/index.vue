<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { listDocs, deleteDoc } = useDocsService()
const { isAdmin } = useAuth()

const docs = ref<any[]>([])
const loading = ref(true)

async function load() {
  loading.value = true
  try {
    const res = await listDocs()
    docs.value = res.docs
  }
  finally {
    loading.value = false
  }
}

async function onDelete(id: string) {
  if (!confirm('Delete this doc?')) return
  await deleteDoc(id)
  await load()
}

onMounted(load)
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-(--ui-text-highlighted)">
        Documents
      </h1>
      <UButton to="/admin/docs/create" icon="i-lucide-plus">
        New Doc
      </UButton>
    </div>

    <div v-if="loading" class="py-8 text-center text-(--ui-text-muted)">
      Loading...
    </div>

    <div v-else-if="!docs.length" class="py-8 text-center text-(--ui-text-muted)">
      No documents yet.
    </div>

    <UTable
      v-else
      :data="docs"
      :columns="[
        { accessorKey: 'title', header: 'Title' },
        { accessorKey: 'slug', header: 'Slug' },
        { accessorKey: 'section', header: 'Section' },
        { accessorKey: 'status', header: 'Status' },
        { accessorKey: 'actions', header: '' },
      ]"
    >
      <template #status-cell="{ row }">
        <UBadge :color="row.original.status === 'published' ? 'success' : 'neutral'" variant="subtle" size="sm">
          {{ row.original.status }}
        </UBadge>
      </template>
      <template #actions-cell="{ row }">
        <div class="flex items-center justify-end gap-1">
          <UButton
            :to="`/admin/docs/${row.original.id}/edit`"
            icon="i-lucide-pencil"
            size="xs"
            variant="ghost"
            color="neutral"
          />
          <UButton
            v-if="isAdmin"
            icon="i-lucide-trash-2"
            size="xs"
            variant="ghost"
            color="error"
            @click="onDelete(row.original.id)"
          />
        </div>
      </template>
    </UTable>
  </div>
</template>
