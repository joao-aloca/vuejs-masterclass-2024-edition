<script setup lang='ts'>
import { usePageStore } from '@/stores/page';
import { tasksWithProjectsQuery } from '@/utils/supaQueries';
import { columns } from '@/utils/tableColumns/tasksColumns';
import type { TasksWithProjects } from '@/utils/supaQueries';

usePageStore().pageData.title = 'My Tasks'

const tasks = ref<TasksWithProjects | null>();
const getTasks = async () => {
  const { data, error } = await tasksWithProjectsQuery;

  if (error) console.log(error)

  tasks.value = data;
}

await getTasks()


</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
