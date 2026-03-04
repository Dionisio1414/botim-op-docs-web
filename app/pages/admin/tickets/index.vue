<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

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
</script>

<template>
  <div>
    <h1 class="mb-6 text-2xl font-bold text-(--ui-text-highlighted)">
      All Tickets
    </h1>

    <div v-if="loading" class="py-8 text-center text-(--ui-text-muted)">
      Loading...
    </div>

    <div v-else-if="!tickets.length" class="py-8 text-center text-(--ui-text-muted)">
      No tickets yet.
    </div>

    <UTable
      v-else
      :data="tickets"
      :columns="[
        { accessorKey: 'title', header: 'Title' },
        { accessorKey: 'userName', header: 'Author' },
        { accessorKey: 'priority', header: 'Priority' },
        { accessorKey: 'status', header: 'Status' },
        { accessorKey: 'actions', header: '' },
      ]"
    >
      <template #priority-cell="{ row }">
        <UBadge variant="subtle" color="neutral" size="sm" class="capitalize">
          {{ row.original.priority }}
        </UBadge>
      </template>
      <template #status-cell="{ row }">
        <TicketStatusBadge :status="row.original.status" />
      </template>
      <template #actions-cell="{ row }">
        <UButton
          :to="`/admin/tickets/${row.original.id}`"
          icon="i-lucide-eye"
          size="xs"
          variant="ghost"
          color="neutral"
        />
      </template>
    </UTable>
  </div>
</template>
