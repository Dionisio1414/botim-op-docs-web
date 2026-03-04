<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const { getTicket, updateTicket } = useTicketsService()

const ticketId = route.params.id as string
const ticket = ref<any>(null)
const comments = ref<any[]>([])
const loading = ref(true)
const error = ref('')

async function load() {
  try {
    const res = await getTicket(ticketId)
    ticket.value = res.ticket
    comments.value = res.comments
  }
  catch {
    error.value = 'Failed to load ticket'
  }
  finally {
    loading.value = false
  }
}

onMounted(load)

async function onStatusChange(status: string) {
  await updateTicket(ticketId, { status })
  await load()
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}
</script>

<template>
  <div>
    <NuxtLink to="/admin/tickets" class="text-sm text-(--ui-text-muted) hover:text-(--ui-text)">
      &larr; Back to tickets
    </NuxtLink>

    <div v-if="loading" class="mt-4 py-8 text-center text-(--ui-text-muted)">
      Loading...
    </div>

    <div v-else-if="ticket" class="mt-4">
      <div class="flex items-start justify-between gap-4">
        <h1 class="text-2xl font-bold text-(--ui-text-highlighted)">
          {{ ticket.title }}
        </h1>
        <TicketStatusBadge :status="ticket.status" />
      </div>

      <div class="mt-2 flex items-center gap-3 text-xs text-(--ui-text-muted)">
        <span>by {{ ticket.userName }}</span>
        <span>&middot;</span>
        <span>{{ formatDate(ticket.createdAt) }}</span>
        <span>&middot;</span>
        <UBadge variant="subtle" color="neutral" size="xs" class="capitalize">{{ ticket.priority }}</UBadge>
      </div>

      <!-- Admin controls -->
      <div class="mt-4 flex items-center gap-2">
        <span class="text-sm text-(--ui-text-muted)">Set status:</span>
        <UButton
          v-for="s in ['open', 'in_progress', 'resolved', 'closed']"
          :key="s"
          size="xs"
          :variant="ticket.status === s ? 'solid' : 'outline'"
          color="neutral"
          class="capitalize"
          @click="onStatusChange(s)"
        >
          {{ s.replace('_', ' ') }}
        </UButton>
      </div>

      <div class="mt-6 rounded-md border border-(--ui-border) p-4 text-sm text-(--ui-text)">
        {{ ticket.description }}
      </div>

      <div class="mt-8">
        <TicketCommentThread
          :comments="comments"
          :ticket-id="ticketId"
          @commented="load"
        />
      </div>
    </div>
  </div>
</template>
