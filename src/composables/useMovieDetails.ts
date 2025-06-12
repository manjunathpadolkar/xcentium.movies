import { ref, onMounted } from 'vue';

interface MovieDetail {
  Title: string;
  Poster: string;
  Plot: string;
  imdbRating: string;
}

export function useMovieDetails(id: string) {
  const movie = ref<MovieDetail | null>(null);
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  onMounted(async () => {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
    movie.value = await res.json();
  });

  return { movie };
}