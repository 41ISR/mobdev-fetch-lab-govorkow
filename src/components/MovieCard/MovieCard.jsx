import { Link } from 'react-router-dom'
import LikeButton from '../LikeButton/LikeButton'
import './MovieCard.css'

const TYPE_LABELS = {
    movie: 'Фильм',
    series: 'Сериал',
    episode: 'Эпизод',
}

const MovieCard = ({ movie }) => {
    const { Title, Year, Poster, Type, imdbID } = movie

    return (
        <article className="movie-card">
            <Link
                to={`/movie/${imdbID}`}
                className="movie-card__poster-button"
                aria-label={`Открыть страницу «${Title}»`}
            >
                {Poster && Poster !== 'N/A' ? (
                    <img
                        className="movie-card__poster"
                        src={Poster}
                        alt={Title}
                        loading="lazy"
                    />
                ) : (
                    <div className="movie-card__poster movie-card__poster--placeholder">
                        Постер отсутствует
                    </div>
                )}

                {Type && Type !== 'N/A' && (
                    <span className="movie-card__type">{TYPE_LABELS[Type] || Type}</span>
                )}
            </Link>

            <div className="movie-card__like">
                <LikeButton imdbID={imdbID} label="фильм" />
            </div>

            <div className="movie-card__info">
                <h3 className="movie-card__title" title={Title}>
                    {Title}
                </h3>
                <p className="movie-card__year">{Year}</p>
            </div>
        </article>
    )
}

export default MovieCard
