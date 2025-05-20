import { tasksWithProjectsQuery } from '@/utils/supaQueries'
import type { TasksWithProjects } from '@/utils/supaQueries'

export const useTasksStore = defineStore('tasks-store', () => {
  const tasks = ref<TasksWithProjects | null>(null)
  const getTasks = async () => {
    if (tasks.value?.length) return

    const { data, error, status } = await tasksWithProjectsQuery

    if (error) useErrorStore().setError({ error, customCode: status })

    tasks.value = data
  }

  return {
    tasks,
    getTasks,
  }
})
