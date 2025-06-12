import { ref, onMounted } from 'vue';

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
}

export function useMovies() {
  const movies = ref<Movie[]>([]);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  onMounted(async () => {
    const searchTitles = [
        'Batman',
        'Avengers',
        'Inception',
        'Interstellar',
        'Joker',
        'The Godfather',
        'Forrest Gump',
        'Pulp Fiction',
        'Titanic',
        'Gladiator',
        'The Matrix',
        'The Dark Knight',
        'Shutter Island',
        'Fight Club',
        'The Shawshank Redemption',
        'Black Panther',
        'Doctor Strange',
        'Dune',
        'The Wolf of Wall Street',
        'Oppenheimer'
    ];
    const responses = await Promise.all(
      searchTitles.map(title => fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`))
    );
    const data = await Promise.all(responses.map(res => res.json()));

    setTimeout(() => {
      movies.value = data.flatMap(d => d.Search || []).slice(0, 10);
    }, 2000)
    
  });

  return { movies };
}