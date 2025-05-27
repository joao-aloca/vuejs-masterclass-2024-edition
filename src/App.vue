<script setup lang="ts">
import { Component } from 'lucide-vue-next'
import { useErrorStore } from './stores/error'

const errorStore = useErrorStore()
const authStore = useAuthStore()

onErrorCaptured((error) => {
  errorStore.setError({ error })
})

onMounted(() => {
  authStore.trackAuthChanges()
})

const { user } = storeToRefs(useAuthStore())

const AuthLayout = defineAsyncComponent(() => import('./components/Layout/main/AuthLayout.vue'))
const GuestLayout = defineAsyncComponent(() => import('./components/Layout/main/GuestLayout.vue'))
</script>

<template>
  <Component :is="user ? AuthLayout : GuestLayout">
    <AppErrorPage v-if="errorStore.activeError" />
    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route.name"></Component>
        <template #fallback>
          <span>Carregando...</span>
        </template>
      </Suspense>
    </RouterView>
  </Component>
</template>
