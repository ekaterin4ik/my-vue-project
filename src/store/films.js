import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMovieStore = defineStore('movie', () => {
  const movie = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Функция для загрузки фильма по ID
  async function fetchMovie(id) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`https://mashroom-movies-api.netlify.app/api/movie/${id}`)
      
      if (!response.ok) throw new Error('Ошибка при загрузке фильма')

      const data = await response.json()

      
      console.log('Ответ API:', data) 

      
      if (data && data.data) {
        movie.value = data.data
        console.log('Movie Data:', movie.value) 
      } else {
        throw new Error('Фильм не найден в ответе API')
      }
    } catch (err) {
      error.value = err.message
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    movie,
    loading,
    error,
    fetchMovie,
  }
})
