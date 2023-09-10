<script setup lang="ts">
import { ref } from 'vue';
import type { ITask } from './stores/store';
import type VTask from './components/VTask.vue';
import { v4 } from "uuid"
import { computed } from 'vue';
import type { VueElement } from 'vue';

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
const dragFrom = ref<string>("")
const dragTo = ref<string>("")
const dragItemId = ref<string>("")
const isDragging = ref<boolean>(false)
const taskElements = ref<VueElement[]>([])
const closestTaskIndex = ref<number>(0);

function dragStart(ev: any) {
  dragItemId.value = ev.target.getAttribute("data-id")
  dragFrom.value = ev.target.getAttribute("data-column");
  let dragFromColumn = board.value[dragFrom.value as ColumnType];
  dragItem.value = dragFromColumn.find((item) => item.id === dragItemId.value);
  isDragging.value = true;
  dragFromColumn = dragFromColumn.filter((item) => item.id !== dragItem.value?.id)
}


function findColumn(childElement: any) {
  let currentElement = childElement;

  while (currentElement) {
    const dataColumnAttribute = currentElement.getAttribute('data-column');
    if (dataColumnAttribute) {
      return dataColumnAttribute;
    }

    currentElement = currentElement.parentNode;
  }

  return null; // Return null if no grandparent with data-column attribute is found
}


function drag(ev: any) {
  insertAboveTask(ev.clientY)
}

function insertAboveTask(mouseY: number) {
  let closestOffset = Number.NEGATIVE_INFINITY;

  taskElements.value.forEach((taskEl: any) => {
    const { top } = taskEl.$el.getBoundingClientRect();
    dragTo.value = findColumn(taskEl.$el);
    const offset = mouseY - top;
    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      const closestIndex = +taskEl.$el.getAttribute("data-index")
      console.log(dragTo.value, closestIndex)
      closestTaskIndex.value = closestIndex ? closestIndex : board.value[dragTo.value as ColumnType].length - 1
      if (dragItem.value) {
        for (let column in board.value) {
          board.value[column as ColumnType] = board.value[column as ColumnType].filter((item: ITask) => !item.isPlaceholder)
        }
        const item = { ...dragItem.value, isPlaceholder: true }
        board.value[dragTo.value as ColumnType].splice(closestTaskIndex.value, 0, item)
      }
    }
  })
}

const resetAllTaskPlaceholders = () => {
  for (let column in board.value) {
    board.value[column as ColumnType] = board.value[column as ColumnType].filter((item: ITask) => dragItemId.value !== item.id || item.isPlaceholder)
    board.value[column as ColumnType].forEach((item) => {
      item.isPlaceholder = false;
    })
  }
}

function dragEnd() {
  isDragging.value = false;
  resetAllTaskPlaceholders()
}

const highlightDragItem = (id: string) => {
  return isDragging.value && id === dragItemId.value ? 'bg-blue-darken-4' : ''
}

</script>

<template>
  <div class="flex container">
    <VContainer fluid>
      <VRow>
        <VCol v-for="(column, i) of board">
          <VSheet border rounded class="pa-3 bg-blue-lighten-5" elevation="4" :data-column="i"  @drag="drag">
            <h3 style="text-transform: capitalize;" class="border">{{ i }}</h3>
            <!-- Task Template -->
            <VSheet border rounded class="pa-2 mb-2" ref="taskElements" v-for="(item, j) of column" :key="j"
              :title="item.title" draggable="true" @dragstart="dragStart"
              @dragend="dragEnd" :data-id="item.id" :data-index="j" :data-column="i" :class="highlightDragItem(item.id!)">
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
</style>
