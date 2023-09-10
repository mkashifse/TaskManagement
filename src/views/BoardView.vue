<script setup lang="ts">
import { useDragDrop } from "@/composables/useDragDrop";
import { useStore } from "@/stores/store"
import moment from "moment"
import { computed, ref } from "vue";

const { board, totalTasks } = useStore()
const { onDragStart, onDragEnd, onDrag, onDragOver, highlightDragItem } = useDragDrop()

const skill = ref<number>(20)

const progress = computed(() => {
  return ((board.done.length / totalTasks) * 100).toFixed(0);
})

</script>

<template>
  <VSheet class="mb-4 pa-1 bg-blue-lighten-4">
    <v-progress-linear v-model="progress" color="blue" height="25">
      <template v-slot:default="{ value }">
        <strong> {{ value }}%</strong>
      </template>
    </v-progress-linear>
  </VSheet>
  <VContainer fluid>
    <VRow>
      <VCol v-for="(column, i) of board">
        <VSheet border rounded class="pa-3 bg-blue-lighten-5" elevation="4" :data-column="i" @dragover="onDragOver">
          <h3 style="text-transform: capitalize;" class="no-select">{{ i }}</h3>
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
                  <label class="text-caption">Estimated Date: {{ item.isPlaceholder }}</label>
                  <p>{{ moment(item.estimatedDate).format("YYYY/MM/DD") }} {{ item.estimatedTime }}</p>
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

.no-select {
  user-select: none;
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  -webkit-user-select: none;
  /* Safari/Chrome */
}
</style>