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
    pending: new Array(5).fill(1).map((item, i) => ({ id: v4(), title: 'Lorem ' + i, isPlaceholder: false })) as any,
    processing: [],
    done: []
  })

  const addTask = (colType: ColumnType, task: ITask) => {
    board.value[colType].push(task);
  }

  return {
    board,
    addTask
  }
})
