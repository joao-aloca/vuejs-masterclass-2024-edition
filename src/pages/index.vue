<script setup lang='ts'>
import { usePageStore } from '@/stores/page';

const { pageData } = storeToRefs(usePageStore())

usePageStore().pageData.title = 'Homepage'
</script>

<template>
  <div>
    <h1>{{ pageData.title }}</h1>
  </div>
</template>
