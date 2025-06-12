<template>
  <section class="home">
    <h1 class="title">🎬 Movie Gallery</h1>

    <section class="intro">
      <p>
        Welcome to our <strong>curated movie gallery</strong>, featuring a blend of cinematic classics and modern blockbusters. 
        Click on any movie card to explore more, including ratings, synopsis, and cast.
      </p>
    </section>

    <ul class="movie-list">
      <li v-for="movie in movies" :key="movie.imdbID" class="movie-card">
        <RouterLink :to="`/movie/details/${movie.imdbID}`" class="link">
          <img :src="movie.Poster" :alt="movie.Title" class="poster" />
          <h3 class="movie-title">{{ movie.Title }}</h3>
        </RouterLink>
      </li>
    </ul>

    <section class="info-section">
      <h2>About This Gallery</h2>
      <p>This application uses the OMDb API to fetch information about trending and iconic movies. The gallery is dynamically loaded using Vue 3’s Composition API and is styled for an engaging user experience.</p>
    </section>
  </section>
</template>

<script setup lang="ts">
import { useMovies } from '../composables/useMovies';

const { movies } = useMovies();
</script>
