<script setup lang="ts">
import { useErrorStore } from '@/stores/error';

useErrorStore().setError({ error: 'Página não encontrada', customCode: 404 })
</script>

<template>
  <div></div>
</template>
