<template>
  
  <router-link :to="'/movie/' + props.movie.id" class="movie-card" :class="{ hoverable }">
    <img :src="props.movie.poster" alt="Movie Poster" class="poster" />
    <div class="info">
      <h3>{{ props.movie.title }}</h3>
      <p><strong>Год:</strong> {{ props.movie.year }}</p>
      <p><strong>Длительность:</strong> {{ props.movie.duration }}</p>
      <p><strong>Жанр:</strong> {{ formattedGenre }}</p>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'


const props = defineProps({
  movie: {
    type: Object,
    required: true
  },
  hoverable: {
    type: Boolean,
    default: true
  }
})


const formattedGenre = computed(() => {
  return Array.isArray(props.movie.genre) ? props.movie.genre.join(', ') : props.movie.genre || 'Не указан';
})
</script>

<style scoped lang="scss">
.movie-card {
  display: flex;
  gap: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: all 0.2s;
  cursor: pointer;
  background-color: #4d4747;
  color: #C4C4C4;
  margin-bottom: 10px;
  align-items: flex-start; 
  justify-content: flex-start; 
  text-decoration: none; 

  &.hoverable:hover {
    transform: translateY(-8px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .poster {
    width: 100px;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px; 
    width: 180px; 
    line-height: 1.2; 
    padding-left: 10px; 
  }

  h3 {
    margin: 0;
    color: #E5E5E5;
  }

  p {
    margin: 0; 
  }
}
</style>
