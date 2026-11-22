import LikeButton from '../LikeButton/LikeButton'
import RatingBadge from '../RatingBadge/RatingBadge'
import './MovieDetails.css'

const MovieDetails = ({ movie }) => {
    const {
        Title,
        Year,
        imdbID,
        Rated,
        Released,
        Runtime,
        Genre,
        Director,
        Writer,
        Actors,
        Plot,
        Poster,
        Ratings,
        Language,
        Country,
        Awards,
        BoxOffice,
    } = movie

    const meta = [Year, Rated, Runtime].filter(
        (value) => value && value !== 'N/A',
    )

    const facts = [
        ['Режиссёр', Director],
        ['В ролях', Actors],
        ['Сценарий', Writer],
        ['Дата выхода', Released],
        ['Язык', Language],
        ['Страна', Country],
        ['Награды', Awards],
        ['Сборы', BoxOffice],
    ].filter(([, value]) => value && value !== 'N/A')

    return (
        <article className="movie-details">
            <div className="movie-details__layout">
                <div className="movie-details__poster-col">
                    {Poster && Poster !== 'N/A' ? (
                        <img className="movie-details__poster" src={Poster} alt={Title} />
                    ) : (
                        <div className="movie-details__poster movie-details__poster--placeholder">
                            Постер отсутствует
                        </div>
                    )}
                </div>

                <div className="movie-details__main">
                    <div className="movie-details__heading">
                        <div>
                            <h1 className="movie-details__title">{Title}</h1>
                            <p className="movie-details__meta">{meta.join(' · ')}</p>
                        </div>
                        <LikeButton imdbID={imdbID} label="фильм" />
                    </div>

                    {Genre && Genre !== 'N/A' && (
                        <p className="movie-details__genre">{Genre}</p>
                    )}

                    {Plot && Plot !== 'N/A' && (
                        <p className="movie-details__plot">{Plot}</p>
                    )}

                    <div className="movie-details__ratings">
                        {(Ratings || []).map((rating) => (
                            <RatingBadge
                                key={rating.Source}
                                source={rating.Source}
                                value={rating.Value}
                            />
                        ))}
                    </div>

                    <dl className="movie-details__facts">
                        {facts.map(([label, value]) => (
                            <div className="movie-details__fact" key={label}>
                                <dt>{label}</dt>
                                <dd>{value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </article>
    )
}

export default MovieDetails
