<script setup lang="ts">
import { useDragDrop } from "@/composables/useDragDrop";
import { useStore } from "@/stores/store"
import moment from "moment"
import { computed, ref } from "vue";

const { board, totalTasks, tagsColorMap } = useStore()
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
  <VContainer>
    <VRow>
      <VCol v-for="(column, i) of board" cols="12" sm="4">
        <VSheet border rounded class="pa-3 bg-blue-lighten-5" elevation="4" :data-column="i" @dragover="onDragOver">
          <h3 style="text-transform: capitalize;" class="no-select">{{ i }}</h3>
          <!-- Task Template -->
          <div class="mb-2 bg-placeholder rounded border" v-for="(item, j) of column" :key="j" :title="item.title"
            draggable="true" @dragstart="onDragStart" @dragend="onDragEnd" @drag="onDrag" :data-index="j"
            :class="highlightDragItem(item)">
            <VExpandTransition>
              <div v-if="item.isPlaceholder" style="height: 150px;">
              </div>
              <div v-else>
                <VCardTitle >{{ item.title }} </VCardTitle>
                <VDivider></VDivider>
                <VCardText class="truncate-text">
                  {{ item.description }}
                  <div v-if="item.attachments?.length" class="mt-4">
                    <label class="text-caption">
                      <VIcon icon="fa fa-paperclip" size="12"></VIcon> {{ item.attachments.length }} Attachments
                    </label>
                    <div class="flex align-center">
                      <template v-for="(img, i) in item.fileThumbnails">
                        <img height="32" v-if="img.type.includes('image')" class="mr-2" cover :src="img.src" />
                        <VIcon v-else icon="fa fa-file"></VIcon>
                      </template>
                    </div>
                  </div>
                </VCardText>
                <VCardActions>
                  <div>
                    <VChip class="mr-2" v-for="(tag, i) in item.tags" :key="i" :color="tagsColorMap[tag]">
                      <VIcon icon="fa fa-tag" class="mr-2" size="16"></VIcon>
                      {{ tag }}
                    </VChip>
                  </div>
                </VCardActions>
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


.truncate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>