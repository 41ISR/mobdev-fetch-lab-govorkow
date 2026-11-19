import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './HomePage.css';

function HomePage() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [query, setQuery] = useState(queryParam);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();

    const trimmed = query.trim();
    if (trimmed.length === 0) return;

    navigate(`/?q=${encodeURIComponent(trimmed)}`);
  }

  useEffect(() => {
    if (!queryParam) {
      setMovies([]);
      setError(null);
      return;
    }

    async function loadMovies() {
      setError(null);
      setIsLoading(true);

      try {
        const apiKey = import.meta.env.VITE_OMDB_API_KEY;
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(queryParam)}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'False') {
          setError(data.Error);
          setMovies([]);
        } else {
          setMovies(data.Search);
        }
      } catch (err) {
        setError('Не удалось связаться с сервером');
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadMovies();
  }, [queryParam]);

  return (
    <main className="home-page">
      <div className="container home-page__inner">
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSubmit={handleSearch}
        />

        <section className="home-page__section">
          <h2 className="home-page__section-title">Результат поиска</h2>

          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList movies={movies} />
          )}
        </section>
      </div>
    </main>
  );
}

export default HomePage;