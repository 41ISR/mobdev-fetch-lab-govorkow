// App.jsx
import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    const searchTerm = 'Inception'; // или любое другое название
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.Response === 'True') {
          setMovies(data.Search);
        } else {
          setError(data.Error);
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <HomePage movies={movies} loading={loading} error={error} />
      <Footer />
    </>
  );
}

export default App;