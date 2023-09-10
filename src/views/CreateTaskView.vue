<script setup lang="ts">
import { ref } from 'vue';


const title = ref<string>('')
const description = ref<string>('')
const estimatedTime = ref<string>('')

</script>

<template>
  <VContainer class="pa-4">
    <VCard rounded title="Create New task">
      <VCardItem border rounded class="pa-2">
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" md="8" sm="8">
                <VTextField v-model="title" :counter="10" label="Title" required hide-details> </VTextField>
                <VTextarea class="mt-2" v-model="description" :counter="10" label="Description" hide-details required>
                </VTextarea>
                <v-file-input class="mt-2" accept="image/*" label="File input"></v-file-input>
              </v-col>
              <v-col cols="12" md="4" lg="4" class="flex justify-end">
                <v-date-picker></v-date-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </VCardItem>

      <VCardActions>
        <VBtn variant="flat" color="blue" elevation="2">Create Task</VBtn>
      </VCardActions>
    </VCard>
  </VContainer>
</template>
