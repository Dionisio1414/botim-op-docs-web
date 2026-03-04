<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })

const { listTickets } = useTicketsService()

const tickets = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await listTickets()
    tickets.value = res.tickets
  }
  finally {
    loading.value = false
  }
})

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <div class="mx-auto max-w-3xl px-6 py-8">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-(--ui-text-highlighted)">
        My Tickets
      </h1>
      <UButton to="/tickets/create" icon="i-lucide-plus">
        New Ticket
      </UButton>
    </div>

    <div v-if="loading" class="py-8 text-center text-(--ui-text-muted)">
      Loading...
    </div>

    <div v-else-if="!tickets.length" class="py-8 text-center text-(--ui-text-muted)">
      No tickets yet. Create one to get started.
    </div>

    <div v-else class="flex flex-col gap-2">
      <NuxtLink
        v-for="ticket in tickets"
        :key="ticket.id"
        :to="`/tickets/${ticket.id}`"
        class="flex items-center justify-between rounded-lg border border-(--ui-border) p-4 transition-colors hover:bg-(--ui-bg-elevated)/50"
      >
        <div>
          <p class="font-medium text-(--ui-text-highlighted)">
            {{ ticket.title }}
          </p>
          <p class="mt-0.5 text-xs text-(--ui-text-muted)">
            {{ formatDate(ticket.createdAt) }}
          </p>
        </div>
        <TicketStatusBadge :status="ticket.status" />
      </NuxtLink>
    </div>
  </div>
</template>
