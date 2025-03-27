import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Получение фильмов с API
  async function fetchMovies() {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('https://mashroom-movies-api.netlify.app/api/movies')
      if (!response.ok) throw new Error('Ошибка при загрузке фильмов')
      const data = await response.json()
      console.log(data)  
      if (data.data) { 
        movies.value = data.data  
      } else {
        throw new Error('Фильмы не найдены в ответе')
      }
    } catch (err) {
      error.value = err.message
      console.error(err)  
    } finally {
      loading.value = false
    }
  }


  const sortedByTitle = computed(() => {
    return [...movies.value].sort((a, b) => a.title.localeCompare(b.title))
  })

  const sortedByYear = computed(() => {
    return [...movies.value].sort((a, b) => a.year - b.year)
  })

  return {
    movies,
    loading,
    error,
    fetchMovies,
    sortedByTitle,
    sortedByYear,
  }
})
