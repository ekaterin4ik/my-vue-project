<template>
  <div v-if="loading">Загрузка...</div>
  
  <div v-else-if="error">Ошибка: {{ error }}</div>
  
  <div v-else-if="movie">
    <!-- Кнопка "Назад" размещена перед карточкой -->
    <button @click="goBack">Назад к списку </button>
    
    <!-- Карточка для отображения фильма -->
    <div class="movie-card">
      <img :src="movie.poster" alt="Постер фильма" class="movie-poster" />
      <div class="movie-details">
        <h1>{{ movie.title }}</h1>
        <p><strong>Год:</strong> {{ movie.year }}</p>
        <p><strong>Описание:</strong> {{ movie.description || 'Нет описания' }}</p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMovieStore } from '@/store/films'

const route = useRoute()
const router = useRouter()
const store = useMovieStore()
const movie = store.movie
const loading = store.loading
const error = store.error

onMounted(() => {
  store.fetchMovie(route.params.id) 
})

function goBack() {
  router.push('/') 
}
</script>

<style scoped>

button {
  margin-bottom: 20px; 
  padding: 0; 
  color: rgb(244, 5, 5); 
  text-decoration: underline; 
  background: none; 
  border: none;
  cursor: pointer; 
  font-size: 25px;
}

button:hover {
  background-color: #0056b3;
}


.movie-card {
  display: flex;
  flex-direction: row;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #363232;
  width: 80%; 
  max-width: 70%; 
  margin: 20px auto; 
}


.movie-poster {
  max-width: 125px;
  height: auto;
  margin-right: 20px;
  border-radius: 5px;
}


.movie-details {
  display: flex;
  flex-direction: column;
}

h1 {
  font-size: 2rem;
  margin-bottom: 10px;
  color:#FFFFFF;
}

p {
  font-size: 1rem;
  margin-bottom: 5px;
  color: #C4C4C4;
}

p strong {
  font-weight: bold;
}
</style>
