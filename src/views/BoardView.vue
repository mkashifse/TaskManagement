<script setup lang="ts">
import { ref } from 'vue';
import { v4 } from "uuid"
import type { VueElement } from 'vue';
import { findColumn, findTaskIndex } from '../helper';
import { ColumnType, type ITask } from '@/types';
import { useStore } from "./../stores/store"

const store = useStore()

interface Board {
  pending: ITask[],
  processing: ITask[],
  done: ITask[]
}

const board = ref<Board>({
  pending: store.pendingTasks,
  processing: [{ id: v4(), title: 'Lorem 6', isPlaceholder: false }] as any,
  done: [{ id: v4(), title: 'Lorem 7', isPlaceholder: false }] as any
})


const dragItem = ref<ITask>();
const columnFrom = ref<ColumnType>(ColumnType.Pending)
const columnTo = ref<ColumnType>(ColumnType.Pending)
const isDragging = ref<boolean>(false)
const taskElements = ref<VueElement[]>([])
const placeHolderIndex = ref<number>(0);



const onDragStart = (ev: DragEvent) => {
  console.log("drag started...!!")
  const el = (ev.target as HTMLElement);
  const taskIndex = +(el.getAttribute("data-index") as any)
  columnFrom.value = findColumn(el);
  isDragging.value = true;
  dragItem.value = board.value[columnFrom.value as ColumnType][taskIndex];
}
const onDragEnd = (ev: DragEvent) => {
  console.log("drag ends...!!")
  isDragging.value = false;

  // console.log(columnFrom.value, columnTo.value, dragItem.value?.title)
  console.log(placeHolderIndex.value)
  board.value[columnTo.value].splice(placeHolderIndex.value, 1, dragItem.value as any)

}


const onDrag = (ev: DragEvent) => {
  const el = (ev.target as HTMLElement);
  el.classList.add('v-speed-dial')
}


const onDragOver = (ev: DragEvent) => {
  ev.preventDefault()
  const el = (ev.target as HTMLElement);
  columnTo.value = findColumn(el);
  const nearTaskIndex = findTaskIndex(el)

  // remove placeholder from all column
  for (let column in board.value) {
    board.value[column as ColumnType] = board.value[column as ColumnType].filter((item) => !item.isPlaceholder)
  }


  board.value[columnFrom.value] = board.value[columnFrom.value].filter((item) => item.id !== dragItem.value?.id)

  const placeHolderItem = { isPlaceholder: true } as any
  if (board.value[columnTo.value].length) {
    board.value[columnTo.value].splice(nearTaskIndex, 0, placeHolderItem)
  } else {
    board.value[columnTo.value].push(placeHolderItem)
  }
  placeHolderIndex.value = nearTaskIndex;
}

const highlightDragItem = (item: ITask) => {
  return item.isPlaceholder ? 'bg-placeholder' : 'bg-task'
}


</script>

<template>
  <VContainer fluid>
    <VRow>
      <VCol v-for="(column, i) of board">
        <VSheet border rounded class="pa-3 bg-blue-lighten-5" elevation="4" :data-column="i" @dragover="onDragOver">
          <h3 style="text-transform: capitalize;">{{ i }}</h3>
          <!-- Task Template -->
          <div class="pa-2 mb-2 bg-placeholder rounded border" v-for="(item, j) of column" :key="j" :title="item.title"
            draggable="true" @dragstart="onDragStart" @dragend="onDragEnd" @drag="onDrag" :data-index="j"
            :class="highlightDragItem(item)">
            <VExpandTransition>
              <div v-if="item.isPlaceholder" style="height: 150px;">
              </div>
              <div v-else>
                <div>
                  <label class="text-caption">Task:</label>
                  <p>{{ item.title }}</p>
                </div>
                <div>
                  <label class="text-caption">Description:</label>
                  <p>{{ item.description }}</p>
                </div>
                <div>
                  <label class="text-caption">Estimated Time: {{ item.isPlaceholder }}</label>
                  <p>{{ item.estimatedTime }}</p>
                </div>
                <div>
                  <label class="text-caption">Attachments:</label>
                  <p>{{ item.attachments }}</p>
                </div>
              </div>
            </VExpandTransition>
          </div>
          <div v-if="column.length === 0">
            No task found
          </div>
        </VSheet>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style>
.border {
  border: 1px solid red;
}

.flex {
  display: flex;
  width: 100%;
}

.flex-1 {
  flex: 1
}

.rotate {
  transform: rotate(12deg) scale(1.1) skew(-11deg);
  -webkit-transform: rotate(12deg) scale(1.1) skew(-11deg);
  -moz-transform: rotate(12deg) scale(1.1) skew(-11deg);
}

.bg-placeholder {
  background: rgba(255, 255, 255, 0.737);
}

.bg-task {
  background: white;
}

.task {
  border-radius: 5px;
}
</style>
