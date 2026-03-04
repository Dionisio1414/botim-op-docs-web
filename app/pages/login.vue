<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { login, pending, isAuthenticated } = useAuth()

const email = ref('')
const password = ref('')
const error = ref('')

if (isAuthenticated.value) {
  navigateTo('/')
}

async function onSubmit() {
  error.value = ''
  try {
    await login(email.value, password.value)
    navigateTo('/')
  }
  catch (e: any) {
    error.value = e?.data?.statusMessage || e?.statusMessage || 'Login failed'
  }
}
</script>

<template>
  <div class="flex min-h-[60vh] items-center justify-center px-4">
    <div class="w-full max-w-sm">
      <h1 class="mb-6 text-center text-2xl font-bold text-(--ui-text-highlighted)">
        Sign In
      </h1>

      <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
        <UFormField label="Email">
          <UInput
            v-model="email"
            type="email"
            placeholder="you@example.com"
            required
            class="w-full"
          />
        </UFormField>

        <UFormField label="Password">
          <UInput
            v-model="password"
            type="password"
            placeholder="Your password"
            required
            class="w-full"
          />
        </UFormField>

        <p v-if="error" class="text-sm text-(--ui-error)">
          {{ error }}
        </p>

        <UButton type="submit" block :loading="pending">
          Sign In
        </UButton>
      </form>

      <p class="mt-4 text-center text-sm text-(--ui-text-muted)">
        Don't have an account?
        <NuxtLink to="/register" class="text-(--ui-primary) hover:underline">
          Register
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
