<script setup lang="ts">
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import { loader } from '@guolao/vue-monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

self.MonacoEnvironment = {
  getWorker: () => new editorWorker(),
}

loader.config({
  'vs/nls': { availableLanguages: { '*': '' } },
})

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const colorMode = useColorMode()

function handleChange(value: string | undefined) {
  emit('update:modelValue', value ?? '')
}
</script>

<template>
  <VueMonacoEditor
    :value="modelValue"
    language="markdown"
    :theme="colorMode.value === 'dark' ? 'vs-dark' : 'vs'"
    :options="{
      minimap: { enabled: false },
      wordWrap: 'on',
      fontSize: 14,
      lineHeight: 22,
      scrollBeyondLastLine: false,
      padding: { top: 16, bottom: 16 },
      automaticLayout: true,
      renderWhitespace: 'none',
      lineNumbers: 'on',
      folding: true,
      suggestOnTriggerCharacters: false,
      quickSuggestions: false,
      tabSize: 2,
      insertSpaces: true,
      smoothScrolling: true,
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
    }"
    class="h-full min-h-[400px] w-full"
    @change="handleChange"
  />
</template>
