<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { useVModel } from '@vueuse/core'
import { X } from 'lucide-vue-next'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  clearable?: boolean
  placeholder?: string
  type?: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const clearInput = () => {
  modelValue.value = ''
}
</script>

<template>
  <div class="relative">
    <input 
      v-model="modelValue" 
      :type="props.type"
      :placeholder="props.placeholder"
      :class="cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        props.clearable ? 'pr-8' : '',
        props.class
      )"
    >
    <button
      v-if="props.clearable && modelValue"
      type="button"
      @click="clearInput"
      class="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:opacity-70"
    >
      <X class="size-4 text-muted-foreground" />
    </button>
  </div>
</template>
