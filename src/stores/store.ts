import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { v4 } from "uuid"
import { ColumnType, type ITask } from '@/types'

interface Board {
  pending: ITask[],
  processing: ITask[],
  done: ITask[]
}

export const useStore = defineStore('board', () => {

  const board = ref<Board>({
    pending: new Array(2).fill(1).map((item, i) => ({ id: v4(), title: 'Lorem ' + i, isPlaceholder: false, tags:["Bug"] })) as any,
    processing: [],
    done: []
  })

  const addTask = (colType: ColumnType, task: ITask) => {
    task.isPlaceholder = false;
    board.value[colType].push(task);
  }

  const totalTasks = computed(() => {
    let count = 0;
    for (let column in board.value) {
      for (let task of board.value[column as ColumnType]) {
        count++;
      }
    }
    return count;
  })

  const tagsColorMap = ref<Record<string, string>>({
    "Task": "blue",
    "Bug": "red",
    "Improvement": "green",
    "Modification": "indigo",
    "High Priority": "red",
    "Low Priority": "purple",
  })

  return {
    board,
    addTask,
    totalTasks,
    tagsColorMap
  }
})
