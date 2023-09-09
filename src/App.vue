<script setup lang="ts">
import { ref } from 'vue';

interface ITask {
  id: number,
  title: string
}

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
  pending: new Array(5).fill(1).map((item, i) => ({ id: i, title: 'Lorem ' + i })),
  processing: [],
  done: []
})

const dragItem = ref<ITask>();
const dragFrom = ref<string>("")

function allowDrop(ev: any) { ev.preventDefault() }

function drag(ev: any) {
  const dragItemId = +ev.target.getAttribute("data-id")
  dragFrom.value = ev.target.getAttribute("data-column");
  const column = board.value[dragFrom.value as ColumnType];
  dragItem.value = column.find((item) => item.id === dragItemId);
}

function drop(ev: any) {
  ev.preventDefault();
  const dragTo = ev.target.getAttribute("data-column");
  console.log(dragFrom.value, "===>>>>>>", dragTo);
  console.log(dragItem)

  board.value[dragFrom.value as ColumnType] = board.value[dragFrom.value as ColumnType]
    .filter((item) => item.id !== dragItem.value!.id)

  board.value[dragTo as ColumnType].push(dragItem.value!)

}
</script>

<template>
  <div class="flex">
    <!-- column pending -->
    <div v-for="(column, i) of board" class="flex-1" @drop="drop" @dragover="allowDrop" :data-column="i">
      <h1 style="text-transform: capitalize;">{{ i }}</h1>
      <div v-for="(item, j) of column" :key="j" draggable="true" @drag="drag" :data-id="item.id" :data-column="i">
        {{ item.id }} - {{ item.title }}
      </div>
      <div v-if="column.length === 0">
        No task found
      </div>
    </div>
  </div>
</template>

<style>
.border {
  border: 1px solid gray;
  min-height: 100px;
}

.flex {
  display: flex;
  width: 100%;
}

.flex-1 {
  flex: 1
}
</style>
