<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
  <VToolbar color="blue-darken-2" dense fixed >
    <VBtn prepend-icon="fa fa-list-check">Kanban</VBtn>
    <VBtn @click="() => router.push('/')">Board</VBtn>
    <VSpacer></VSpacer>
    <VBtn elevation-1 variant="flat" prepend-icon="fa fa-plus" @click="() => router.push('/create-task')">Add New Task</VBtn>
  </VToolbar>
  <main class="container">
    <router-view></router-view>
  </main>
</template>

<style>
.container {
  background-image: url(https://images.pexels.com/photos/3331094/pexels-photo-3331094.jpeg?auto=compress&cs=tinysrgb&w=1600);
  background-size: cover;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
}
</style>
