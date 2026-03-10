<script setup lang="ts">
definePageMeta({ layout: false })

const password = ref('')
const error = ref('')
const loading = ref(false)
const { login } = useAdminAuth()

async function handleSubmit() {
  error.value = ''
  loading.value = true
  try {
    await login(password.value)
    navigateTo('/admin')
  }
  catch {
    error.value = 'Invalid password. Please try again.'
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-(--ui-bg) px-4">
    <div class="w-full max-w-sm">
      <div class="mb-8 text-center">
        <UIcon name="i-lucide-shield" class="mx-auto mb-4 size-12 text-(--ui-primary)" />
        <h1 class="text-2xl font-bold text-(--ui-text-highlighted)">
          Admin Login
        </h1>
        <p class="mt-2 text-sm text-(--ui-text-muted)">
          Enter the admin password to continue.
        </p>
      </div>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <UFormField label="Password" :error="error">
          <UInput
            v-model="password"
            type="password"
            placeholder="Enter admin password"
            size="lg"
            class="w-full"
            autofocus
          />
        </UFormField>

        <UButton type="submit" block size="lg" :loading="loading">
          Sign In
        </UButton>
      </form>

      <p class="mt-6 text-center text-xs text-(--ui-text-muted)">
        <NuxtLink to="/" class="hover:text-(--ui-text)">
          &larr; Back to site
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
