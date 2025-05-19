<script setup lang="ts">

interface LinkProp {
  title: string,
  to?: string,
  icon: string
}

defineProps<{
  links: LinkProp[]
}>()
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink v-if="link.to" activeClass="text-primary bg-muted" :to="link.to"
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground">
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </RouterLink>

    <div v-else
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground">
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </div>

  </template>

</template>
