
<script setup lang="ts">
import { ref } from 'vue';

const formData = ref({
  title: '',
  description: '',
  estimatedTime: '',
  estimatedDate: null,
  attachments: null,
});

const formRef = ref<any>();
const fileThumbnails = ref([]);


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
      reader.onload = (e: any) => {
        fileThumbnails.value.push(e.target.result as never);
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
        <VContainer>
          <VRow>
            <VCol>
              <v-text-field v-model="formData.title" label="Title" required :rules="titleRules"></v-text-field>

              <v-textarea v-model="formData.description" label="Description" required
                :rules="descriptionRules"></v-textarea>

              <VFileInput v-model="formData.attachments" @change="onChangeFileLoad" multiple label="Attachments" required
                :rules="attachmentRules"></VFileInput>

            </VCol>
            <VCol>
              <VTextField type="time" v-model="formData.estimatedTime" label="Estimated Time" required
                :rules="estimatedTimeRules"></VTextField>
              <VDatePicker v-model="formData.estimatedDate" label="Estimated Date" required :rules="estimatedDateRules">
              </VDatePicker>
            </VCol>
          </VRow>
        </VContainer>
        <VCardActions>
          <VBtn type="submit" variant="flat" color="blue" elevation="2">Create Task</VBtn>
        </VCardActions>
      </VCard>
    </v-form>
  </VContainer>
</template>
