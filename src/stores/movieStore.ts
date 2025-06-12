import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
}

interface MovieDetail {
  Title: string;
  Poster: string;
  Plot: string;
  imdbRating: string;
}

export const useMovieStore = defineStore('movieStore', () => {
  const movies = ref<Movie[]>([]);
  const movieDetails = ref<Record<string, MovieDetail>>({});

  async function fetchMovies() {
    if (movies.value.length) return; // Prevent re-fetching
    const searchTitles = [
      'Batman', 'Avengers', 'Inception', 'Interstellar', 'Joker',
      'The Godfather', 'Forrest Gump', 'Pulp Fiction', 'Titanic',
      'Gladiator', 'The Matrix', 'The Dark Knight', 'Shutter Island'
    ];
    const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
    const responses = await Promise.all(
      searchTitles.map(title => fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`))
    );
    const data = await Promise.all(responses.map(res => res.json()));
    const allMovies = data.flatMap(d => d.Search || []);

    setTimeout(() => {
        movies.value = allMovies.slice(0, 10);
    }, 2000)    
    
  }

  async function fetchMovieDetail(id: string) {
    if (movieDetails.value[id]) return;
    const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
    const detail = await res.json();

    setTimeout(() => {
        movieDetails.value[id] = detail;
    }, 2000) 

  }

  return { movies, movieDetails, fetchMovies, fetchMovieDetail };
});
