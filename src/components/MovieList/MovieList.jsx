import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

function MovieList({ movies }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="movie-list__empty">
        <h3 className="movie-list__empty-title">Ничего не найдено</h3>
        <p className="movie-list__empty-text">
          Введите название фильма или сериала и нажмите «Искать».
        </p>
      </div>
    );
  }

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.imdbID} className="movie-list__item">
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
