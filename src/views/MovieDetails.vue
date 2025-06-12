<template>
    <section class="details">
      <nav class="breadcrumb">
        <RouterLink to="/">Movie Gallery</RouterLink> / <span>{{ movie?.Title || 'Movie Details' }}</span>
      </nav>

      <!-- 👇 Show Skeleton if data not loaded -->
      <article v-if="!movie" class="details-article loading">
        <div class="skeleton-poster"></div>
        <div class="skeleton-text">
          <div class="skeleton-line short"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
        </div>
      </article>
  
      <article v-if="movie" class="details-article">
        <img :src="movie.Poster" :alt="movie.Title" class="details-poster" />
        <div class="details-text">
          <h2>{{ movie.Title }}</h2>
          <p><strong>Rating:</strong> {{ movie.imdbRating }}</p>
          <p><strong>Description:</strong> {{ movie.Plot }}</p>
          <p><strong>Genre:</strong> Drama, Action, Sci-Fi (static placeholder)</p>
          <p><strong>Director:</strong> Christopher Nolan (static placeholder)</p>
        </div>
      </article>
    </section>
  </template>
  
  <script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useMovieStore } from '../stores/movieStore';
  
  const route = useRoute();
  const id = route.params.id?.toString() || new URLSearchParams(location.search).get('movieId') || '';
  const movieStore = useMovieStore();
  
  onMounted(() => {
    movieStore.fetchMovieDetail(id);
  });
  
  const movie = computed(() => movieStore.movieDetails[id]);
  </script>
  