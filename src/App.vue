<script setup lang="ts">
import { ref } from 'vue';
import type { ITask } from './stores/store';
import type VTask from './components/VTask.vue';
import { v4 } from "uuid"

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
  pending: new Array(5).fill(1).map((item, i) => ({ id: v4(), title: 'Lorem ' + i })) as any,
  processing: [],
  done: []
})


console.log(board)
const dragItem = ref<ITask>();
const dragFrom = ref<string>("")

function allowDrop(ev: any) { ev.preventDefault() }

function drag(ev: any) {
  const dragItemId = ev.target.getAttribute("data-id")
  dragFrom.value = ev.target.getAttribute("data-column");
  const column = board.value[dragFrom.value as ColumnType];
  dragItem.value = column.find((item) => item.id === dragItemId);
}

function drop(ev: any) {
  ev.preventDefault();
  const dragTo = ev.target.getAttribute("data-column");
  console.log(dragFrom.value, "===>>>>>>", dragTo);
  console.log(dragItem)

  if (dragTo) {
    board.value[dragFrom.value as ColumnType] = board.value[dragFrom.value as ColumnType]
      .filter((item) => item.id !== dragItem.value!.id)

    board.value[dragTo as ColumnType].push(dragItem.value!)
  }

}
</script>

<template>
  <div class="flex container">
    <VContainer fluid>
      <VRow>
        <VCol v-for="(column, i) of board">
          <VSheet rounded class="pa-3" elevation="4" @drop="drop" @dragover="allowDrop" :data-column="i">
            <h3 style="text-transform: capitalize;" :data-column="i">{{ i }}</h3>
            <!-- Task Template -->
            <VSheet border rounded class="pa-2 mb-2" v-for="(item, j) of column" :key="j" :title="item.title"
              draggable="true" @drag="drag" :data-id="item.id" :data-column="i">
              <div>
                <label class="text-caption">Task:</label>
                <p>{{ item.title }}</p>
              </div>
              <div>
                <label class="text-caption">Description:</label>
                <p>{{ item.description }}</p>
              </div>
              <div>
                <label class="text-caption">Estimated Time:</label>
                <p>{{ item.estimatedTime }}</p>
              </div>
              <div>
                <label class="text-caption">Attachments:</label>
                <p>{{ item.attachments }}</p>
              </div>
            </VSheet>
            <div v-if="column.length === 0" :data-column="i">
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
