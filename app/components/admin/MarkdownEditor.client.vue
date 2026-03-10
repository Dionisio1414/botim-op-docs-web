<script setup lang="ts">
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const app = useNuxtApp()

if (!(app.vueApp as any)._monacoInstalled) {
  app.vueApp.use(VueMonacoEditorPlugin, {
    paths: {
      vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs',
    },
  })
  ;(app.vueApp as any)._monacoInstalled = true
}

const colorMode = useColorMode()

const editorOptions = {
  minimap: { enabled: false },
  wordWrap: 'on' as const,
  lineNumbers: 'on' as const,
  fontSize: 14,
  scrollBeyondLastLine: false,
  padding: { top: 16 },
  automaticLayout: true,
}

function handleChange(value: string | undefined) {
  emit('update:modelValue', value ?? '')
}
</script>

<template>
  <VueMonacoEditor
    :value="props.modelValue"
    language="markdown"
    :theme="colorMode.value === 'dark' ? 'vs-dark' : 'vs'"
    :options="editorOptions"
    class="h-full w-full"
    @change="handleChange"
  />
</template>
