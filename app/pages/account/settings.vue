<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })

const { changePassword, logout } = useAuth()

const form = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const saving = ref(false)
const success = ref(false)
const error = ref('')

async function onChangePassword() {
  error.value = ''
  success.value = false

  if (form.newPassword !== form.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  saving.value = true
  try {
    await changePassword(form.currentPassword, form.newPassword)
    success.value = true
    Object.assign(form, { currentPassword: '', newPassword: '', confirmPassword: '' })
  }
  catch (e: any) {
    error.value = e?.data?.statusMessage || 'Failed to change password'
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-lg px-6 py-8">
    <NuxtLink to="/account" class="text-sm text-(--ui-text-muted) hover:text-(--ui-text)">
      &larr; Back to account
    </NuxtLink>
    <h1 class="mt-2 mb-6 text-2xl font-bold text-(--ui-text-highlighted)">
      Account Settings
    </h1>

    <!-- Change password -->
    <section>
      <h2 class="mb-4 text-lg font-semibold text-(--ui-text-highlighted)">
        Change Password
      </h2>
      <form class="flex flex-col gap-4" @submit.prevent="onChangePassword">
        <UFormField label="Current Password">
          <UInput v-model="form.currentPassword" type="password" required class="w-full" />
        </UFormField>
        <UFormField label="New Password">
          <UInput v-model="form.newPassword" type="password" required class="w-full" />
        </UFormField>
        <UFormField label="Confirm New Password">
          <UInput v-model="form.confirmPassword" type="password" required class="w-full" />
        </UFormField>

        <p v-if="error" class="text-sm text-(--ui-error)">
          {{ error }}
        </p>
        <p v-if="success" class="text-sm text-(--ui-success)">
          Password changed successfully.
        </p>

        <UButton type="submit" :loading="saving">
          Change Password
        </UButton>
      </form>
    </section>

    <!-- Danger zone -->
    <section class="mt-10 rounded-lg border border-(--ui-error)/20 p-4">
      <h2 class="mb-2 text-lg font-semibold text-(--ui-error)">
        Danger Zone
      </h2>
      <p class="mb-4 text-sm text-(--ui-text-muted)">
        Sign out from all devices.
      </p>
      <UButton color="error" variant="outline" @click="logout">
        Sign Out
      </UButton>
    </section>
  </div>
</template>
