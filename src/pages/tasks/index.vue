<script setup lang='ts'>
import { usePageStore } from '@/stores/page';
import { tasksWithProjectsQuery } from '@/utils/supaQueries';
import { columns } from '@/utils/tableColumns/tasksColumns';
import { useErrorStore } from '@/stores/error';
import type { TasksWithProjects } from '@/utils/supaQueries';

usePageStore().pageData.title = 'My Tasks'

const tasks = ref<TasksWithProjects | null>(null);
const getTasks = async () => {
  const { data, error, status } = await tasksWithProjectsQuery;

  if (error) useErrorStore().setError({ error, customCode: status })

  tasks.value = data;
}

await getTasks()


</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
