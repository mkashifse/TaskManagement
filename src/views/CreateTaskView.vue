
<script setup lang="ts">
import { ColumnType, type ITask, type IThumb } from '@/types';
import { ref } from 'vue';
import { useStore } from "./../stores/store"
import moment from "moment";
import { v4 } from 'uuid';

const { addTask, tagsColorMap } = useStore();

const formData = ref<{
  selectedColumn: ColumnType,
  title: string;
  description: string;
  estimatedTime: string;
  estimatedDate: any;
  attachments: File[],
  fileThumbnails: IThumb[],
  tags: string[],
}>({
  selectedColumn: ColumnType.Pending,
  title: 'New task',
  description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  estimatedTime: "11:38 AM",
  estimatedDate: new Date(),
  attachments: [],
  fileThumbnails: [],
  tags: []
});

interface ITag {
  text: string;
  color: string;
}
const columns = ref<string[]>(["pending", "processing", "done"])
const tags = ref<string[]>(["Task", "Bug", "Improvement", "Modification", "High Priority", "Low Priority", 'Normal'])
const formRef = ref<any>();
const fileInput = ref<any>();
const isShowSnackBar = ref<boolean>(false);

const titleRules = [
  (v: string) => !!v || 'Title is required',
  (v: string) => (v && v.length <= 255) || 'Title must be less than 255 characters',
];

const descriptionRules = [
  (v: string) => !!v || 'Description is required',
];

const estimatedTimeRules = [
  (v: string) => !!v || 'Estimated Time is required',
];

const estimatedDateRules = [
  (v: Date | null) => !!v || 'Estimated Date is required',
];

const attachmentRules = [
  (v: File | null) => !!v || 'Attachments are required',
];

const submitForm = () => {
  loadFileThumbnails();
  const newTask: any = { id: v4(), isPlaceholder: false, ...formData.value }
  console.log(newTask);
  addTask(formData.value.selectedColumn, newTask)
  isShowSnackBar.value = true
};

const onChangeFileLoad = (file: any) => {
  loadFileThumbnails();
}
const onDeleteFile = (index: number) => {
  formData.value.attachments.splice(index, 1);
  formData.value.fileThumbnails.splice(index, 1)
}

const loadFileThumbnails = () => {
  const files = formData.value.attachments;
  if (files.length) {
    formData.value.fileThumbnails = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      const { type, name } = files[i];
      reader.onload = (e: any) => {
        formData.value.fileThumbnails.push({
          src: e.target.result,
          type,
          name
        } as never);
      };
      reader.readAsDataURL(files[i]);
    }
  }

};
</script>


<template>
  <VContainer class="pa-4">
    <VSnackbar color="success" v-model="isShowSnackBar" timeout="2000">Task has been successfully added</VSnackbar>
    <v-form ref="form" @submit.prevent="submitForm">
      <VCard rounded>
        <VCardTitle>Create New Task</VCardTitle>
        <VDivider></VDivider>
        <VContainer>
          <VRow>
            <VCol cols="12" sm="6">
              <VSelect :items="columns" label="Board Column" v-model="formData.selectedColumn"></VSelect>
              <v-text-field v-model="formData.title" label="Title" required :rules="titleRules"></v-text-field>

              <v-textarea v-model="formData.description" label="Description" required
                :rules="descriptionRules"></v-textarea>

              <VFileInput v-show="false" ref="fileInput" v-model="formData.attachments" @change="onChangeFileLoad"
                multiple label="Attachments" required :rules="attachmentRules"></VFileInput>

              <VContainer class="bg-grey-lighten-4 rounded mb-2">
                <VRow style="height: 250px; overflow-y: scroll;" v-if="formData.fileThumbnails.length">
                  <VCol cols="12" md="6" v-for="(item, i) in formData.fileThumbnails" class="pa-2 flex align-center">
                    <div class="mr-1 rounded  border flex justify-center align-center"
                      style="min-width: 64px; width: 64px; height: 64px;">
                      <img :src="item.src" width="32" height="32" v-if="item.type.includes('jpg')">
                      <object :data="item.src" width="32" height="32" v-else-if="item.type.includes('image')"></object>
                      <div v-else>
                        <VIcon icon="fa fa-file"></VIcon>
                      </div>
                    </div>
                    <div class="flex-1" style="max-width: 150px; text-overflow: ellipsis;">
                      {{ item.name }}
                    </div>
                    <div>
                      <div @click="onDeleteFile(i)" style="height: 34px;"
                        class="border rounded-pill py-1 px-2 flex justify-center align-center">
                        <VIcon icon="fa fa-x" size="16" color="red"></VIcon>
                      </div>
                    </div>
                  </VCol>
                </VRow>
                <VRow v-else style="height: 250px; overflow-y: scroll;" class="flex align-center justify-center">
                  <VBtn prepend-icon="fa fa-paperclip" @click="() => {
                    fileInput.click()
                  }"> Attachments </VBtn>
                </VRow>
              </VContainer>

            </VCol>
            <VCol cols="12" sm="6">
              <VCombobox multiple clearable label="Tags" :items="tags" v-model="formData.tags">
                <template v-slot:selection="data">
                  <v-chip :key="JSON.stringify(data.item)" size="small" :color="tagsColorMap[data.item.title]">
                    <VIcon icon="fa fa-tag" class="mr-2"></VIcon>
                    {{ data.item.title }}
                  </v-chip>
                </template>
              </VCombobox>
              <VTextField type="time" v-model="formData.estimatedTime" label="Estimated Time" required
                :rules="estimatedTimeRules"></VTextField>
              <VDatePicker v-model="formData.estimatedDate" label="Estimated Date" required :rules="estimatedDateRules">
              </VDatePicker>
            </VCol>
          </VRow>
        </VContainer>
        <VDivider></VDivider>
        <VCardActions>
          <VBtn type="submit" variant="flat" color="blue" elevation="2">Create Task</VBtn>
        </VCardActions>
      </VCard>
    </v-form>
  </VContainer>
</template>
