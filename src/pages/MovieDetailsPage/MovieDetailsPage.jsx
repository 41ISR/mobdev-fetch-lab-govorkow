import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import Loader from '../../components/Loader/Loader'
import MovieDetails from '../../components/MovieDetails/MovieDetails'
import './MovieDetailsPage.css'

const MovieDetailsPage = () => {
    const { imdbID } = useParams()

    const [movie, setMovie] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false

        const loadMovie = async () => {
            setError(null)
            setMovie(null)
            setIsLoading(true)

            try {
                const apiKey = import.meta.env.VITE_OMDB_API_KEY
                const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${encodeURIComponent(imdbID)}&plot=full`

                const response = await fetch(url)
                const data = await response.json()

                if (cancelled) return

                if (data.Response === 'False') {
                    setError(data.Error)
                } else {
                    setMovie(data)
                }
            } catch {
                if (cancelled) return
                setError('Не удалось связаться с сервером')
            } finally {
                if (!cancelled) setIsLoading(false)
            }
        }

        loadMovie()

        return () => {
            cancelled = true
        }
    }, [imdbID])

    return (
        <main className="movie-details-page">
            <div className="container">
                <Link to="/" className="movie-details__back">
                    ← Ко всем фильмам
                </Link>

                {isLoading ? (
                    <Loader label="Загружаем фильм..." />
                ) : error ? (
                    <ErrorMessage message={error} />
                ) : movie ? (
                    <MovieDetails movie={movie} />
                ) : null}
            </div>
        </main>
    )
}

export default MovieDetailsPage
