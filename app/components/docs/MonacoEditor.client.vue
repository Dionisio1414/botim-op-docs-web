<script setup lang="ts">
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'

const model = defineModel<string>({ default: '' })

const colorMode = useColorMode()
const theme = computed(() => colorMode.value === 'dark' ? 'vs-dark' : 'vs')

const options = {
  minimap: { enabled: false },
  wordWrap: 'on' as const,
  lineNumbers: 'on' as const,
  fontSize: 13,
  scrollBeyondLastLine: false,
  automaticLayout: true,
  padding: { top: 12, bottom: 12 },
  tabSize: 2,
}
</script>

<template>
  <VueMonacoEditor
    v-model:value="model"
    language="markdown"
    :theme="theme"
    :options="options"
    class="h-full w-full"
  />
</template>
