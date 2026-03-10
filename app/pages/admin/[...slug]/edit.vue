<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const slug = computed(() => {
  const params = route.params.slug
  return Array.isArray(params) ? params.join('/') : (params ?? '')
})

useHead({ title: () => `Edit - ${slug.value}` })

const content = ref('')
const originalContent = ref('')
const saving = ref(false)
const error = ref('')
const saved = ref(false)
const showPreview = ref(false)
const loading = ref(true)

async function loadDoc() {
  loading.value = true
  try {
    const doc = await $fetch<{ slug: string, content: string }>(`/api/admin/docs/${slug.value}`)
    content.value = doc.content
    originalContent.value = doc.content
  }
  catch {
    error.value = 'Document not found'
  }
  finally {
    loading.value = false
  }
}

const hasChanges = computed(() => content.value !== originalContent.value)

async function save() {
  saving.value = true
  error.value = ''
  saved.value = false
  try {
    await $fetch(`/api/admin/docs/${slug.value}`, {
      method: 'PUT' as any,
      body: { content: content.value },
    })
    originalContent.value = content.value
    saved.value = true
    setTimeout(() => { saved.value = false }, 2000)
  }
  catch (e: any) {
    error.value = e?.data?.statusMessage ?? 'Failed to save'
  }
  finally {
    saving.value = false
  }
}

onMounted(() => {
  loadDoc()

  const handler = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault()
      if (hasChanges.value) save()
    }
  }
  window.addEventListener('keydown', handler)
  onUnmounted(() => window.removeEventListener('keydown', handler))
})
</script>

<template>
  <div class="flex h-[calc(100vh-3.5rem)] flex-col">
    <div class="flex items-center justify-between border-b border-(--ui-border) px-4 py-3">
      <div class="flex items-center gap-4">
        <UButton to="/admin/docs" variant="ghost" size="sm" icon="i-lucide-arrow-left">
          Back
        </UButton>
        <div>
          <h1 class="text-sm font-semibold text-(--ui-text-highlighted)">
            Editing: {{ slug }}
          </h1>
          <p v-if="hasChanges" class="text-xs text-(--ui-warning)">Unsaved changes</p>
          <p v-else-if="saved" class="text-xs text-(--ui-success)">Saved</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <UButton
          :to="`/docs/${slug.replace(/^\d+\./g, '').replace(/\/\d+\./g, '/')}`"
          variant="ghost"
          size="sm"
          icon="i-lucide-external-link"
          target="_blank"
        >
          View
        </UButton>
        <UButton
          :variant="showPreview ? 'solid' : 'outline'"
          size="sm"
          icon="i-lucide-eye"
          @click="showPreview = !showPreview"
        >
          Preview
        </UButton>
        <UButton
          size="sm"
          icon="i-lucide-save"
          :loading="saving"
          :disabled="!hasChanges"
          @click="save"
        >
          Save
        </UButton>
      </div>
    </div>

    <p v-if="error" class="border-b border-(--ui-error)/20 bg-(--ui-error)/10 px-4 py-2 text-sm text-(--ui-error)">
      {{ error }}
    </p>

    <div v-if="loading" class="flex flex-1 items-center justify-center">
      <UIcon name="i-lucide-loader-2" class="size-8 animate-spin text-(--ui-text-muted)" />
    </div>

    <div v-else class="flex flex-1 overflow-hidden">
      <div :class="showPreview ? 'w-1/2 border-r border-(--ui-border)' : 'w-full'" class="flex flex-col">
        <AdminMonacoEditor v-model="content" class="flex-1" />
      </div>
      <div v-if="showPreview" class="w-1/2 overflow-y-auto p-6">
        <div class="prose prose-sm dark:prose-invert max-w-none">
          <MDC :value="content" />
        </div>
      </div>
    </div>
  </div>
</template>
