<script setup lang="ts">
const status = defineModel<'in-progress' | 'completed'>()
const isCompleted = status.value === 'completed'
</script>

<template>
  <div class="text-2xl cursor-pointer">
    <iconify-icon v-if="isCompleted" icon="lucide:circle-check" class="text-green-500" />
    <iconify-icon v-else icon="lucide:circle-dot" class="text-gray-500" />
  </div>
</template>
