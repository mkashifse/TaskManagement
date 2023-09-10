import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { v4 } from "uuid"
import { ColumnType, type ITask } from '@/types'

export const useStore = defineStore('board', () => {
  const pendingTasks = ref<ITask[]>(new Array(5).fill(1).map((item, i) => ({ id: v4(), title: 'Lorem ' + i, isPlaceholder: false })) as any,)
  const processingTasks = ref<ITask[]>([])
  const doneTasks = ref<ITask[]>([])

  const addTask = (colType: ColumnType, task: ITask) => {
    if (colType === ColumnType.Pending) {
      pendingTasks.value.push(task)
    }
    if (colType === ColumnType.Processing) {
      processingTasks.value.push(task)
    }
    if (colType === ColumnType.Done) {
      doneTasks.value.push(task)
    }
  }

  return {
    pendingTasks,
    processingTasks,
    doneTasks,

    addTask
  }
})
