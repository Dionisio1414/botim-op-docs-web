<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })

const { createTicket } = useTicketsService()

const form = reactive({
  title: '',
  description: '',
  priority: 'medium',
})
const error = ref('')
const saving = ref(false)

async function onSubmit() {
  error.value = ''
  saving.value = true
  try {
    await createTicket(form)
    navigateTo('/tickets')
  }
  catch (e: any) {
    error.value = e?.data?.statusMessage || 'Failed to create ticket'
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-lg px-6 py-8">
    <NuxtLink to="/tickets" class="text-sm text-(--ui-text-muted) hover:text-(--ui-text)">
      &larr; Back to tickets
    </NuxtLink>
    <h1 class="mt-2 mb-6 text-2xl font-bold text-(--ui-text-highlighted)">
      New Ticket
    </h1>

    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <UFormField label="Title">
        <UInput v-model="form.title" required class="w-full" />
      </UFormField>

      <UFormField label="Description">
        <UTextarea v-model="form.description" :rows="5" required class="w-full" />
      </UFormField>

      <UFormField label="Priority">
        <USelect
          v-model="form.priority"
          :items="[
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
          ]"
          class="w-full"
        />
      </UFormField>

      <p v-if="error" class="text-sm text-(--ui-error)">
        {{ error }}
      </p>

      <div class="flex gap-2">
        <UButton to="/tickets" variant="ghost" color="neutral">
          Cancel
        </UButton>
        <UButton type="submit" :loading="saving">
          Submit Ticket
        </UButton>
      </div>
    </form>
  </div>
</template>
