import { projectQuery, projectsQuery } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'
import type { Project, Projects } from '@/utils/supaQueries'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)
  const project = ref<Project | null>(null)

  // const route = useRoute()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadProjects = useMemoize(async (key: string) => await projectsQuery)
  const loadProject = useMemoize(async (slug: string) => await projectQuery(slug))

  interface ValidateCacheParams {
    ref: typeof project | typeof projects
    query: typeof projectQuery | typeof projectsQuery
    key: string
    loaderFn: typeof loadProject | typeof loadProjects
  }

  const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query

      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          return
        } else {
          loaderFn.delete(key)
          if (!error && data) ref.value = data
        }
      })
    }
  }

  const getProjects = async () => {
    projects.value = null

    const { data, error, status } = await loadProjects('projects')

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) projects.value = data

    validateCache({
      ref: projects,
      query: projectsQuery,
      key: 'projects',
      loaderFn: loadProjects,
    })
  }

  const getProject = async (slug: string) => {
    project.value = null

    const { data, error, status } = await loadProject(slug)

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) project.value = data

    validateCache({
      ref: project,
      query: projectQuery,
      key: slug,
      loaderFn: loadProject,
    })
  }

  return {
    projects,
    getProjects,
    getProject,
    project,
  }
})
