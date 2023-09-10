<script setup lang="ts">
import { ref } from 'vue';
import type { ITask } from './stores/store';
import type VTask from './components/VTask.vue';
import { v4 } from "uuid"
import { computed } from 'vue';
import type { VueElement } from 'vue';
import { findColumn, findTaskIndex } from './helper';

enum ColumnType {
  Pending = 'pending',
  Processing = 'processing',
  Done = 'done',
}

interface Board {
  pending: ITask[],
  processing: ITask[],
  done: ITask[]
}

const board = ref<Board>({
  pending: new Array(5).fill(1).map((item, i) => ({ id: v4(), title: 'Lorem ' + i, isPlaceholder: false })) as any,
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

const highlightDragItem = (id: string) => {
  return isDragging.value && id === dragItem.value?.id ? 'rotate' : ''
}


</script>

<template>
  <div class="flex container">
    <VContainer fluid>
      <VRow>
        <VCol v-for="(column, i) of board">
          <VSheet border rounded class="pa-3 bg-blue-lighten-5" elevation="4" :data-column="i" @dragover="onDragOver">
            <h3 style="text-transform: capitalize;">{{ i }}</h3>
            <!-- Task Template -->
            <VSheet border rounded class="pa-2 mb-2" v-for="(item, j) of column" :key="j" :title="item.title"
              draggable="true" @dragstart="onDragStart" @dragend="onDragEnd" :data-index="j"
              :class="highlightDragItem(item.id!)">
              <div v-if="item.isPlaceholder" style="height: 150px; background-color: rgb(29, 30, 43);">
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
            </VSheet>
            <div v-if="column.length === 0">
              No task found
            </div>
          </VSheet>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<style>
.container {
  background-image: url(https://images.pexels.com/photos/3331094/pexels-photo-3331094.jpeg?auto=compress&cs=tinysrgb&w=1600);
  background-size: cover;
  width: 100vw;
  height: 100vh;
}


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
</style>
