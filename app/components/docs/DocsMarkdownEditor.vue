<script setup lang="ts">
const model = defineModel<string>({ default: '' })
const mode = ref<'split' | 'edit' | 'preview'>('split')
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <UButton
        size="xs"
        :variant="mode === 'edit' ? 'solid' : 'ghost'"
        color="neutral"
        @click="mode = 'edit'"
      >
        Edit
      </UButton>
      <UButton
        size="xs"
        :variant="mode === 'split' ? 'solid' : 'ghost'"
        color="neutral"
        @click="mode = 'split'"
      >
        Split
      </UButton>
      <UButton
        size="xs"
        :variant="mode === 'preview' ? 'solid' : 'ghost'"
        color="neutral"
        @click="mode = 'preview'"
      >
        Preview
      </UButton>
    </div>

    <div
      class="flex gap-4"
      :class="{ 'flex-col': mode !== 'split' }"
    >
      <!-- Monaco Editor -->
      <div
        v-show="mode !== 'preview'"
        class="h-[32rem] overflow-hidden rounded-md border border-(--ui-border)"
        :class="mode === 'split' ? 'w-1/2' : 'w-full'"
      >
        <DocsMonacoEditor v-model="model" />
      </div>

      <!-- MDC Preview -->
      <div
        v-show="mode !== 'edit'"
        class="h-[32rem] max-w-none overflow-y-auto rounded-md border border-(--ui-border) p-4 prose prose-sm dark:prose-invert"
        :class="mode === 'split' ? 'w-1/2' : 'w-full'"
      >
        <MDC :value="model" />
      </div>
    </div>
  </div>
</template>
