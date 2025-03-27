<template>
  <div>
    <div id="shap">
      <h1 class="ht">#MOVIENOW</h1>
    </div>

    <!-- Сортировки -->
    <div class="filters">
      <h1 class="hht">Фильмы</h1>
      <div class="checkbox-container">
        <label>
          <input type="radio" name="sort" v-model="sortType" value="title" />
          <span class="custom-radio"></span> Сортировать по названию
        </label>
        <label>
          <input type="radio" name="sort" v-model="sortType" value="year" />
          <span class="custom-radio"></span> Сортировать по году
        </label>
      </div>
    </div>

    <!-- Прелоадер -->
    <div v-if="store.loading">Загрузка...</div>
    <div v-else-if="store.error">Ошибка: {{ store.error }}</div>

    <!-- Список фильмов -->
    <div v-else class="movies-list">
      <MovieCard
        v-for="movie in sortedMovies"
        :key="movie.id"
        :movie="movie"
        :hoverable="true"
        @select-movie="goToMovie"
      />
    </div>
  </div>
</template>



<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMoviesStore } from '@/store/movies'
import MovieCard from '@/components/MovieCard.vue'
import { useRouter } from 'vue-router'

const store = useMoviesStore()
const router = useRouter()
const sortType = ref(null)

onMounted(() => {
  store.fetchMovies()
})

const sortedMovies = computed(() => {
  if (sortType.value === 'title') {
    return [...store.movies].sort((a, b) => a.title.localeCompare(b.title))
  }
  if (sortType.value === 'year') {
    return [...store.movies].sort((a, b) => a.year - b.year)
  }
  return store.movies
})

function goToMovie(id) {
  router.push(`/movie/${id}`)
}
</script>

<style scoped lang="scss">
#shap {
  background-color: #FA2828;
  width: 100%;
  height: 100px;
  margin-top: 90px;
}

.ht {
  display: flex;
  justify-content: center;
  padding: 28px;
  letter-spacing: 10px;
}

.hht {
  color: #E5E5E5;
  text-align: center;
  margin-bottom: 10px;
}

.filters {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
}

.checkbox-container {
  display: flex;
  gap: 20px;
  margin: 20px;
  color: #C4C4C4;
}

label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

label input[type="radio"] {
  display: none; 
}

label .custom-radio {
  width: 20px;
  height: 20px;
  border: 2px solid red; 
  display: inline-block;
  border-radius: 4px; 
  position: relative;
  background-color: white; 
  margin-right: 10px; 
}

label input[type="radio"]:checked + .custom-radio {
  background-color: white; 
  border: 2px solid red;
}

label input[type="radio"]:checked + .custom-radio::after {
  content: '\2713'; 
  position: absolute;
  top: 2px;
  left: 3px;
  color: red; 
  font-size: 14px;
}

.movies-list {
  display: flex;
  flex-direction: column;
  gap: 35px;
}

</style>
