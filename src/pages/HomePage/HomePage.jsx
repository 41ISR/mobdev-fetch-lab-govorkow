import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import Loader from '../../components/Loader/Loader'
import MovieList from '../../components/MovieList/MovieList'
import SearchBar from '../../components/SearchBar/SearchBar'
import './HomePage.css'

const HomePage = () => {
    const [searchParams] = useSearchParams()
    const queryParam = searchParams.get('q') || ''

    const [query, setQuery] = useState(queryParam)
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleSearch = (event) => {
        event.preventDefault()

        const trimmed = query.trim()
        if (trimmed.length === 0) return

        navigate(`/?q=${encodeURIComponent(trimmed)}`)
    }

    useEffect(() => {
        if (!queryParam) return

        let cancelled = false

        const loadMovies = async () => {
            setError(null)
            setIsLoading(true)

            try {
                const apiKey = import.meta.env.VITE_OMDB_API_KEY
                const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(queryParam)}`

                const response = await fetch(url)
                const data = await response.json()

                if (cancelled) return

                if (data.Response === 'False') {
                    setError(data.Error)
                    setMovies([])
                } else {
                    setMovies(data.Search)
                }
            } catch {
                if (cancelled) return
                setError('Не удалось связаться с сервером')
                setMovies([])
            } finally {
                if (!cancelled) setIsLoading(false)
            }
        }

        loadMovies()

        return () => {
            cancelled = true
        }
    }, [queryParam])

    const visibleMovies = queryParam ? movies : []
    const visibleError = queryParam ? error : null
    const visibleLoading = queryParam && isLoading

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

                    {visibleLoading ? (
                        <Loader label="Ищем фильмы..." />
                    ) : visibleError ? (
                        <ErrorMessage message={visibleError} />
                    ) : (
                        <MovieList movies={visibleMovies} />
                    )}
                </section>
            </div>
        </main>
    )
}

export default HomePage
