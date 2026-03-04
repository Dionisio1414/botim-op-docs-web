<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const { getUser, updateUser } = useUsersService()

const userId = route.params.id as string
const user = ref<any>(null)
const loading = ref(true)
const saving = ref(false)
const error = ref('')

const form = reactive({
  name: '',
  email: '',
  role: 'viewer',
  status: 'active',
})

onMounted(async () => {
  try {
    const res = await getUser(userId)
    user.value = res.user
    Object.assign(form, {
      name: res.user.name,
      email: res.user.email,
      role: res.user.role,
      status: res.user.status,
    })
  }
  catch {
    error.value = 'Failed to load user'
  }
  finally {
    loading.value = false
  }
})

async function onSubmit() {
  error.value = ''
  saving.value = true
  try {
    const res = await updateUser(userId, form)
    user.value = res.user
    navigateTo('/admin/users')
  }
  catch (e: any) {
    error.value = e?.data?.statusMessage || 'Failed to update user'
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div>
    <div class="mb-6">
      <NuxtLink to="/admin/users" class="text-sm text-(--ui-text-muted) hover:text-(--ui-text)">
        &larr; Back to users
      </NuxtLink>
      <h1 class="mt-2 text-2xl font-bold text-(--ui-text-highlighted)">
        Edit User
      </h1>
    </div>

    <div v-if="loading" class="py-8 text-center text-(--ui-text-muted)">
      Loading...
    </div>

    <form v-else class="flex max-w-lg flex-col gap-4" @submit.prevent="onSubmit">
      <UFormField label="Name">
        <UInput v-model="form.name" required class="w-full" />
      </UFormField>

      <UFormField label="Email">
        <UInput v-model="form.email" type="email" required class="w-full" />
      </UFormField>

      <UFormField label="Role">
        <USelect
          v-model="form.role"
          :items="[
            { label: 'Viewer', value: 'viewer' },
            { label: 'Editor', value: 'editor' },
            { label: 'Admin', value: 'admin' },
          ]"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Status">
        <USelect
          v-model="form.status"
          :items="[
            { label: 'Active', value: 'active' },
            { label: 'Disabled', value: 'disabled' },
          ]"
          class="w-full"
        />
      </UFormField>

      <p v-if="error" class="text-sm text-(--ui-error)">
        {{ error }}
      </p>

      <div class="flex gap-2">
        <UButton to="/admin/users" variant="ghost" color="neutral">
          Cancel
        </UButton>
        <UButton type="submit" :loading="saving">
          Save Changes
        </UButton>
      </div>
    </form>
  </div>
</template>
