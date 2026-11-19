import { Link } from 'react-router-dom';
import './MovieCard.css';

function MovieCard({ movie }) {
  const { Title, Year, Poster, Type, imdbID } = movie;

  return (
    <article className="movie-card">
      <Link to={`/movie/${imdbID}`} className="movie-card__link">
        {Poster !== 'N/A' ? (
          <img className="movie-card__poster" src={Poster} alt={Title} />
        ) : (
          <div className="movie-card__poster movie-card__poster--empty">
            Постер отсутствует
          </div>
        )}
      </Link>

      <div className="movie-card__info">
        <h3 className="movie-card__title">{Title}</h3>
        <p className="movie-card__meta">{Year} · {Type}</p>
      </div>
    </article>
  );
}

export default MovieCard;