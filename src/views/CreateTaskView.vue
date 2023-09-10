
<script setup lang="ts">
import { ref } from 'vue';

const formData = ref({
  selectedColumn: 'Pending',
  title: '',
  description: '',
  estimatedTime: '',
  estimatedDate: '',
  attachments: [],
});

const columns = ref<string[]>(["Pending", "Processing", "Done"])
const formRef = ref<any>();
const fileInput = ref<any>();
const fileThumbnails = ref<{ name: string, src: string, type: string }[]>([]);


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
  console.log(formData.value)
  loadFileThumbnails();
};

const onChangeFileLoad = (file: any) => {
  loadFileThumbnails();
}


const onDeleteFile = (index: number) => {
  formData.value.attachments.splice(index, 1);
  fileThumbnails.value.splice(index, 1)
}

const loadFileThumbnails = () => {
  const files = formData.value.attachments;
  if (files.length) {
    fileThumbnails.value = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      const { type, name } = files[i];
      reader.onload = (e: any) => {
        fileThumbnails.value.push({
          src: e.target.result,
          type,
          name
        } as any);
      };
      reader.readAsDataURL(files[i]);
    }
  }

};
</script>


<template>
  <VContainer class="pa-4">
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

              <VBtn prepend-icon="fa fa-paperclip" @click="() => {
                fileInput.click()
              }"> Attachments </VBtn>

              <VContainer>
                <VRow style="height: 250px; overflow-y: scroll;">
                  <VCol cols="12" md="6" v-for="(item, i) in fileThumbnails" class="pa-2 flex align-center">
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
              </VContainer>

            </VCol>
            <VCol cols="12" sm="6">
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
