import { supabase } from '@/lib/supabaseClient'
import type { CreateNewTask } from '@/types/CreateNewForm'
import type { QueryData } from '@supabase/supabase-js'

//  S E L E C T
export const tasksWithProjectsQuery = supabase.from('tasks').select(`*, projects (id, name, slug)`)

export const taskQuery = (id: string) =>
  supabase.from('tasks').select(`*, projects(id, name)`).eq('id', id).single()

export const projectsQuery = supabase.from('projects').select()

export const projectQuery = (slug: string) =>
  supabase.from('projects').select(`*, tasks(id, name, status, due_date)`).eq('slug', slug).single()

export const groupedProfilesQuery = (userIds: string[]) => {
  return supabase.from('profiles').select('username, avatar_url, id, full_name').in('id', userIds)
}

export const profilesQuery = supabase.from('profiles').select('id, full_name')

export const profileQuery = ({ column, value }: { column: string; value: string }) => {
  return supabase.from('profiles').select().eq(column, value).single()
}

//  U P D A T E
export const updateProjectQuery = (updatedProject = {}, id: number) => {
  return supabase.from('projects').update(updatedProject).eq('id', id)
}

export const updateTaskQuery = (updatedTask = {}, id: number) =>
  supabase.from('tasks').update(updatedTask).eq('id', id)

// I N S E R T
export const createNewTaskQuery = (newTask: CreateNewTask) => {
  return supabase.from('tasks').insert(newTask)
}

//  D E L E T E
export const deleteTaskQuery = (id: number) => {
  return supabase.from('tasks').delete().eq('id', id)
}

// T Y P E S
export type Projects = QueryData<typeof projectsQuery>
export type Project = QueryData<ReturnType<typeof projectQuery>>
export type Task = QueryData<ReturnType<typeof taskQuery>>
export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>
export type Profiles = QueryData<typeof profilesQuery>
export type Profile = QueryData<ReturnType<typeof profileQuery>>
export type Collabs = QueryData<ReturnType<typeof groupedProfilesQuery>>
