<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Admin - Documents' })

const { data: docs, refresh } = await useFetch<Array<{ slug: string, title: string, updatedAt: string }>>('/api/admin/docs')
const deletingSlug = ref<string | null>(null)

async function deleteDoc(slug: string) {
  if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return
  deletingSlug.value = slug
  try {
    await $fetch(`/api/admin/docs/${slug}`, { method: 'DELETE' })
    await refresh()
  }
  catch (e: any) {
    alert(e?.data?.statusMessage ?? 'Failed to delete')
  }
  finally {
    deletingSlug.value = null
  }
}
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-(--ui-text-highlighted)">
          Documents
        </h1>
        <p class="mt-1 text-sm text-(--ui-text-muted)">
          {{ docs?.length ?? 0 }} documents total
        </p>
      </div>
      <UButton to="/admin/create" icon="i-lucide-plus">
        New Document
      </UButton>
    </div>

    <div v-if="!docs?.length" class="rounded-lg border border-(--ui-border) py-16 text-center">
      <UIcon name="i-lucide-file-text" class="mx-auto mb-4 size-12 text-(--ui-text-muted) opacity-50" />
      <p class="text-(--ui-text-muted)">No documents yet.</p>
      <UButton to="/admin/create" class="mt-4" variant="outline">
        Create your first document
      </UButton>
    </div>

    <div v-else class="overflow-hidden rounded-lg border border-(--ui-border)">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-(--ui-border) bg-(--ui-bg-elevated)/50">
            <th class="px-4 py-3 text-left font-medium text-(--ui-text-muted)">Title</th>
            <th class="px-4 py-3 text-left font-medium text-(--ui-text-muted)">Path</th>
            <th class="px-4 py-3 text-left font-medium text-(--ui-text-muted)">Updated</th>
            <th class="px-4 py-3 text-right font-medium text-(--ui-text-muted)">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="doc in docs"
            :key="doc.slug"
            class="border-b border-(--ui-border) last:border-b-0"
          >
            <td class="px-4 py-3 font-medium text-(--ui-text-highlighted)">
              {{ doc.title }}
            </td>
            <td class="px-4 py-3 font-mono text-xs text-(--ui-text-muted)">
              {{ doc.slug }}
            </td>
            <td class="px-4 py-3 text-(--ui-text-muted)">
              {{ new Date(doc.updatedAt).toLocaleDateString() }}
            </td>
            <td class="px-4 py-3 text-right">
              <div class="flex items-center justify-end gap-1">
                <UButton
                  :to="`/admin/${doc.slug}/edit`"
                  size="xs"
                  variant="ghost"
                  icon="i-lucide-pencil"
                />
                <UButton
                  size="xs"
                  variant="ghost"
                  color="error"
                  icon="i-lucide-trash-2"
                  :loading="deletingSlug === doc.slug"
                  @click="deleteDoc(doc.slug)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
