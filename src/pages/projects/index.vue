<script setup lang='ts'>

import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue';
import type { Tables } from '../../../database/types';

const projects = ref<Tables<'projects'>[] | null>();

(async () => {
  const { data, error } = await supabase.from('projects').select();

  if (error) console.log(error)

  projects.value = data;

  console.log('projetos: ', projects.value)
})()

</script>

<template>
  <div>
    <h1>Projects Page</h1>
    <RouterLink to="/">Go to home</RouterLink><br>
    <RouterLink :to="{ name: '/projects/[id]', params: { id: 1 } }">Projeto 1</RouterLink><br>
    <ul>
      <li v-for="project in projects" :key="project.id">
        {{ project.name }}
      </li>
    </ul>

  </div>
</template>
