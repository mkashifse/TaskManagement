<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
  <VToolbar>
    <VToolbarItems>
      <VBtn prepend-icon="fa fa-list-check">Kanban</VBtn>
      <VBtn @click="() => router.push('/')">Board</VBtn>
      <VBtn @click="() => router.push('/create-task')">Create New Task</VBtn>
    </VToolbarItems>
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
}
</style>
