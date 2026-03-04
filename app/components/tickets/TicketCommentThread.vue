<script setup lang="ts">
const props = defineProps<{
  comments: Array<{
    id: string
    userName: string
    body: string
    createdAt: string
  }>
  ticketId: string
}>()

const emit = defineEmits<{
  commented: []
}>()

const { addComment } = useTicketsService()
const newComment = ref('')
const sending = ref(false)

async function onSubmit() {
  if (!newComment.value.trim()) return
  sending.value = true
  try {
    await addComment(props.ticketId, newComment.value)
    newComment.value = ''
    emit('commented')
  }
  finally {
    sending.value = false
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <h3 class="text-sm font-semibold text-(--ui-text-highlighted)">
      Comments ({{ comments.length }})
    </h3>

    <div v-if="!comments.length" class="text-sm text-(--ui-text-muted)">
      No comments yet.
    </div>

    <div
      v-for="comment in comments"
      :key="comment.id"
      class="rounded-md border border-(--ui-border) p-3"
    >
      <div class="mb-1 flex items-center gap-2 text-xs text-(--ui-text-muted)">
        <span class="font-medium text-(--ui-text)">{{ comment.userName }}</span>
        <span>&middot;</span>
        <span>{{ formatDate(comment.createdAt) }}</span>
      </div>
      <p class="text-sm text-(--ui-text)">
        {{ comment.body }}
      </p>
    </div>

    <!-- Reply form -->
    <form class="flex gap-2" @submit.prevent="onSubmit">
      <UTextarea
        v-model="newComment"
        placeholder="Write a comment..."
        :rows="2"
        class="flex-1"
      />
      <UButton type="submit" :loading="sending" size="sm" class="self-end">
        Reply
      </UButton>
    </form>
  </div>
</template>
