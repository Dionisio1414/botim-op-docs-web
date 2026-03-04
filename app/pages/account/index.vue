<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })

const { user, updateProfile } = useAuth()

const form = reactive({
  name: user.value?.name || '',
  email: user.value?.email || '',
})
const saving = ref(false)
const success = ref(false)
const error = ref('')

async function onSubmit() {
  error.value = ''
  success.value = false
  saving.value = true
  try {
    await updateProfile(form)
    success.value = true
  }
  catch (e: any) {
    error.value = e?.data?.statusMessage || 'Failed to update profile'
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-lg px-6 py-8">
    <h1 class="mb-6 text-2xl font-bold text-(--ui-text-highlighted)">
      My Account
    </h1>

    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <UFormField label="Name">
        <UInput v-model="form.name" required class="w-full" />
      </UFormField>

      <UFormField label="Email">
        <UInput v-model="form.email" type="email" required class="w-full" />
      </UFormField>

      <UFormField label="Role">
        <UInput :model-value="user?.role" disabled class="w-full" />
      </UFormField>

      <p v-if="error" class="text-sm text-(--ui-error)">
        {{ error }}
      </p>
      <p v-if="success" class="text-sm text-(--ui-success)">
        Profile updated.
      </p>

      <UButton type="submit" :loading="saving">
        Save Changes
      </UButton>
    </form>

    <div class="mt-8 border-t border-(--ui-border) pt-6">
      <NuxtLink to="/account/settings" class="text-sm text-(--ui-primary) hover:underline">
        Account Settings & Password
      </NuxtLink>
    </div>
  </div>
</template>
