
<script setup lang="ts">
import { ref } from 'vue';

const formData = ref({
  selectedColumn: 'Pending',
  title: '',
  description: '',
  estimatedTime: '',
  estimatedDate: null,
  attachments: null,

});

const columns = ref<string[]>(["Pending", "Processing", "Done"])
const formRef = ref<any>();
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

const loadFileThumbnails = () => {
  const files = formData.value.attachments as any;
  if (files) {
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

              <VFileInput v-model="formData.attachments" @change="onChangeFileLoad" multiple label="Attachments" required
                :rules="attachmentRules"></VFileInput>


              <VContainer>
                <VRow style="height: 250px; overflow-y: scroll;">
                  <VCol cols="12" md="6" v-for="(item, i) in fileThumbnails" class="pa-2 flex align-center">
                    <div class=" mr-1 rounded  border flex justify-center align-center" style="width: 64px; height: 64px;">
                      <img :src="item.src" width="32" height="32" v-if="item.type.includes('jpg')">
                      <object :data="item.src" width="32" height="32" v-else-if="item.type.includes('image')"></object>
                      <div v-else>
                        <VIcon icon="fa-file"></VIcon>
                      </div>
                    </div>
                    <div class="flex-1">
                      {{ item.name }}
                    </div>
                    <div>
                      <div class="border rounded" >
                        <VIcon icon="fa-x"></VIcon>
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
