<script setup lang="ts">
export interface TaskProps {
  id: string,
  title: string,
  description?: string,
  estimatedTime?: string,
  attachments?: string
}

const props = withDefaults(defineProps<TaskProps>(), {
  title: "Untitled"
});

const emit = defineEmits(["delete", "move", "edit"])
</script>

<template>
  <!-- <VSheet class="d-flex pa-2 justify-space-between bg-red-lighten-4  ">
      <div>Task</div>
      <div>
        <VIcon
          icon="fa fa-arrow-right-from-bracket"
          size="x-small"
          class="mr-4"
        ></VIcon>
        <VIcon icon="fa fa-pencil" size="x-small" class="mr-4"></VIcon>
        <VIcon
          icon="fa fa-trash"
          size="x-small"
          @click="emit('delete', props.id)"
        ></VIcon>
      </div>
    </VSheet> -->
  <VSheet class="pa-4">
    <div>
      <label class="text-caption">Task:</label>
      <p>{{ props.title }}</p>
    </div>
    <div>
      <label class="text-caption">Description:</label>
      <p>{{ props.description }}</p>
    </div>
    <div>
      <label class="text-caption">Estimated Time:</label>
      <p>{{ props.estimatedTime }}</p>
    </div>
    <div>
      <label class="text-caption">Attachments:</label>
      <p>{{ props.attachments }}</p>
    </div>
  </VSheet>
  <div class="pb-2">
    <VBtn variant="text" class="text-primary">View Attachments</VBtn>
  </div>
</template>

<style></style>
