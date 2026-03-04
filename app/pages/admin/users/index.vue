<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { listUsers, createUser, deleteUser } = useUsersService()

const users = ref<any[]>([])
const loading = ref(true)
const showCreate = ref(false)

const newUser = reactive({
  name: '',
  email: '',
  password: '',
  role: 'viewer',
})
const createError = ref('')

async function load() {
  loading.value = true
  try {
    const res = await listUsers()
    users.value = res.users
  }
  finally {
    loading.value = false
  }
}

async function onCreateUser() {
  createError.value = ''
  try {
    await createUser(newUser)
    showCreate.value = false
    Object.assign(newUser, { name: '', email: '', password: '', role: 'viewer' })
    await load()
  }
  catch (e: any) {
    createError.value = e?.data?.statusMessage || 'Failed to create user'
  }
}

async function onDelete(id: string) {
  if (!confirm('Delete this user?')) return
  await deleteUser(id)
  await load()
}

onMounted(load)
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-(--ui-text-highlighted)">
        Users
      </h1>
      <UButton icon="i-lucide-plus" @click="showCreate = true">
        Add User
      </UButton>
    </div>

    <!-- Create user modal -->
    <UModal v-model:open="showCreate">
      <template #content>
        <div class="p-6">
          <h2 class="mb-4 text-lg font-semibold text-(--ui-text-highlighted)">
            Create User
          </h2>
          <form class="flex flex-col gap-3" @submit.prevent="onCreateUser">
            <UFormField label="Name">
              <UInput v-model="newUser.name" required class="w-full" />
            </UFormField>
            <UFormField label="Email">
              <UInput v-model="newUser.email" type="email" required class="w-full" />
            </UFormField>
            <UFormField label="Password">
              <UInput v-model="newUser.password" type="password" required class="w-full" />
            </UFormField>
            <UFormField label="Role">
              <USelect
                v-model="newUser.role"
                :items="[
                  { label: 'Viewer', value: 'viewer' },
                  { label: 'Editor', value: 'editor' },
                  { label: 'Admin', value: 'admin' },
                ]"
                class="w-full"
              />
            </UFormField>
            <p v-if="createError" class="text-sm text-(--ui-error)">
              {{ createError }}
            </p>
            <div class="flex justify-end gap-2">
              <UButton variant="ghost" color="neutral" @click="showCreate = false">
                Cancel
              </UButton>
              <UButton type="submit">
                Create
              </UButton>
            </div>
          </form>
        </div>
      </template>
    </UModal>

    <div v-if="loading" class="py-8 text-center text-(--ui-text-muted)">
      Loading...
    </div>

    <UTable
      v-else
      :data="users"
      :columns="[
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'email', header: 'Email' },
        { accessorKey: 'role', header: 'Role' },
        { accessorKey: 'status', header: 'Status' },
        { accessorKey: 'actions', header: '' },
      ]"
    >
      <template #role-cell="{ row }">
        <UBadge variant="subtle" size="sm">{{ row.original.role }}</UBadge>
      </template>
      <template #status-cell="{ row }">
        <UBadge
          :color="row.original.status === 'active' ? 'success' : 'error'"
          variant="subtle"
          size="sm"
        >
          {{ row.original.status }}
        </UBadge>
      </template>
      <template #actions-cell="{ row }">
        <div class="flex items-center justify-end gap-1">
          <UButton
            :to="`/admin/users/${row.original.id}`"
            icon="i-lucide-pencil"
            size="xs"
            variant="ghost"
            color="neutral"
          />
          <UButton
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
