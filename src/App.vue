<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const isMenuOpen = ref(false);
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
const closeMenu = () => (isMenuOpen.value = false);
</script>

<template>
  <header class="app-header">
    <div class="container">
      <div class="logo">
        <RouterLink to="/">
          🎬 Movies
        </RouterLink>
      </div>

      <nav :class="['navbar', { open: isMenuOpen }]">
        <RouterLink to="/" class="nav-link" @click="closeMenu">Home</RouterLink>
        <RouterLink to="/about" class="nav-link" @click="closeMenu">About</RouterLink>
      </nav>

      <button class="hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>

  <RouterView />
</template>
