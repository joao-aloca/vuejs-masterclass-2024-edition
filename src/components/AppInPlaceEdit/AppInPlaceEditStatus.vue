<script setup lang="ts">
const status = defineModel<'in-progress' | 'completed'>()
const isCompleted = ref<boolean>(status.value === 'completed')
const emit = defineEmits(['commit'])

const { readonly = false } = defineProps<{
  readonly?: boolean
}>()

const toggleValue = () => {
  if (readonly) return

  status.value = isCompleted.value ? 'in-progress' : 'completed'
  isCompleted.value = !isCompleted.value
  emit('commit')
}
</script>

<template>
  <div class="text-2xl cursor-pointer" @click="toggleValue()">
    <Transition name="scale" mode="out-in">
      <iconify-icon v-if="isCompleted" icon="lucide:circle-check" class="text-green-500" />
      <iconify-icon v-else icon="lucide:clock" class="text-gray-500" />
    </Transition>
  </div>
</template>
