<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Admin - Create Document' })

const slug = ref('')
const content = ref(`---
title: New Document
description: A brief description of this document.
icon: i-lucide-file-text
category: Guides
---

# New Document

Start writing your documentation here.

## Section One

Content goes here...
`)

const saving = ref(false)
const error = ref('')
const showPreview = ref(false)

async function save() {
  if (!slug.value.trim()) {
    error.value = 'Slug is required (e.g., "2.guides/3.my-doc")'
    return
  }

  saving.value = true
  error.value = ''
  try {
    await $fetch('/api/admin/docs', {
      method: 'POST',
      body: { slug: slug.value, content: content.value },
    })
    navigateTo('/admin/docs')
  }
  catch (e: any) {
    error.value = e?.data?.statusMessage ?? 'Failed to create document'
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="flex h-[calc(100vh-3.5rem)] flex-col">
    <div class="flex items-center justify-between border-b border-(--ui-border) px-4 py-3">
      <div class="flex items-center gap-4">
        <UButton to="/admin/docs" variant="ghost" size="sm" icon="i-lucide-arrow-left">
          Back
        </UButton>
        <h1 class="text-lg font-semibold text-(--ui-text-highlighted)">
          Create Document
        </h1>
      </div>
      <div class="flex items-center gap-2">
        <UButton
          :variant="showPreview ? 'solid' : 'outline'"
          size="sm"
          icon="i-lucide-eye"
          @click="showPreview = !showPreview"
        >
          Preview
        </UButton>
        <UButton size="sm" icon="i-lucide-save" :loading="saving" @click="save">
          Create
        </UButton>
      </div>
    </div>

    <div class="border-b border-(--ui-border) px-4 py-2">
      <UInput
        v-model="slug"
        placeholder="File path, e.g.: 2.guides/3.my-new-doc"
        size="sm"
        class="max-w-lg"
        icon="i-lucide-folder"
      />
      <p v-if="error" class="mt-1 text-xs text-(--ui-error)">
        {{ error }}
      </p>
    </div>

    <div class="flex flex-1 overflow-hidden">
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
