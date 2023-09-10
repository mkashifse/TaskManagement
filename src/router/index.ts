import { createRouter, createWebHistory } from 'vue-router'
import BoardView from '../views/BoardView.vue'
import CreateTaskView from '../views/CreateTaskView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'board',
      component: BoardView
    },
    {
      path: '/create-task',
      name: 'CreateTaskView',
      component: CreateTaskView
    },
  ]
})

export default router
