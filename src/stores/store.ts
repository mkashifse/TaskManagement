import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { v4 } from "uuid"

export interface ITask {
  id?: string,
  title: string,
  description: string,
  estimatedTime?: string,
  attachments?: string,
  isPlaceholder: boolean,
}

export const useStore = defineStore('tasks', () => {
  const pending = ref<ITask[]>([])
  const processing = ref<ITask[]>([])
  const done = ref<ITask[]>([])

  const addNewTask = (task: ITask) => {
    task.id = v4();
    pending.value.push(task);
  }

  const onDeleteTask = (id: string) => {
    console.log(id);
    pending.value = pending.value.filter((item) => item.id !== id)
  }

  const pendingTasks = computed(() => pending)
  const processingTasks = computed(() => processing)
  const doneTasks = computed(() => done)

  return {
    addNewTask,
    onDeleteTask,
    pending,
    processing,
    done,
    pendingTasks,
    processingTasks,
    doneTasks
  }
})
