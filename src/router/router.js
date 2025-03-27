import { createRouter, createWebHistory } from 'vue-router'
import MoviesList from '@/views/MoviesList.vue'
import MovieDetails from '@/views/MovieDetails.vue'

const routes = [
  { path: '/', component: MoviesList },
  { path: '/movie/:id', component: MovieDetails, props: true }, 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
