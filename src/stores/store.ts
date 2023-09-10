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

  const longText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
  const board = ref<Board>({
    pending: new Array(2).fill(1).map((item, i) => ({
      id: v4(),
      title: longText,
      description: longText,
      isPlaceholder: false, tags: ["Bug"]
    })) as any,
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
