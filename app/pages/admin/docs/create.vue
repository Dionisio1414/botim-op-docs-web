<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { createDoc } = useDocsService()

const form = reactive({
  title: '',
  slug: '',
  description: '',
  section: 'guides',
  icon: '',
  status: 'draft' as 'draft' | 'published',
  body: '',
})

const error = ref('')
const saving = ref(false)

const sectionOptions = [
  { label: 'Guides', value: 'guides' },
  { label: 'API Reference', value: 'api-reference' },
  { label: 'Examples', value: 'examples' },
]

// Auto-generate slug from title
watch(() => form.title, (title) => {
  if (!form.slug || form.slug === slugify(form.title)) {
    form.slug = slugify(title)
  }
})

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

async function onSubmit() {
  error.value = ''
  saving.value = true
  try {
    // Prefix slug with section
    const fullSlug = `${form.section}/${form.slug}`
    await createDoc({ ...form, slug: fullSlug })
    navigateTo('/admin/docs')
  }
  catch (e: any) {
    error.value = e?.data?.statusMessage || 'Failed to create doc'
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div>
    <div class="mb-6">
      <NuxtLink to="/admin/docs" class="text-sm text-(--ui-text-muted) hover:text-(--ui-text)">
        &larr; Back to docs
      </NuxtLink>
      <h1 class="mt-2 text-2xl font-bold text-(--ui-text-highlighted)">
        New Document
      </h1>
    </div>

    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <div class="grid gap-4 sm:grid-cols-2">
        <UFormField label="Title">
          <UInput v-model="form.title" required class="w-full" />
        </UFormField>

        <UFormField label="Slug">
          <UInput v-model="form.slug" required class="w-full" />
        </UFormField>
      </div>

      <UFormField label="Description">
        <UInput v-model="form.description" class="w-full" />
      </UFormField>

      <div class="grid gap-4 sm:grid-cols-3">
        <UFormField label="Section">
          <USelect v-model="form.section" :items="sectionOptions" class="w-full" />
        </UFormField>

        <UFormField label="Icon">
          <UInput v-model="form.icon" placeholder="i-lucide-file" class="w-full" />
        </UFormField>

        <UFormField label="Status">
          <USelect
            v-model="form.status"
            :items="[
              { label: 'Draft', value: 'draft' },
              { label: 'Published', value: 'published' },
            ]"
            class="w-full"
          />
        </UFormField>
      </div>

      <UFormField label="Content">
        <DocsMarkdownEditor v-model="form.body" />
      </UFormField>

      <p v-if="error" class="text-sm text-(--ui-error)">
        {{ error }}
      </p>

      <div class="flex justify-end gap-2">
        <UButton to="/admin/docs" variant="ghost" color="neutral">
          Cancel
        </UButton>
        <UButton type="submit" :loading="saving">
          Create Document
        </UButton>
      </div>
    </form>
  </div>
</template>
