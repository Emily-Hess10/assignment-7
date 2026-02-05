import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import { getPopularMovies } from "../services/movieService";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function Home({ movies, setMovies, hasSearched }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        // Only load popular movies if the user has NOT searched
        if (!hasSearched && movies.length === 0) {
          const data = await getPopularMovies();
          setMovies(data);
        }
      } catch (err) {
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [movies, setMovies, hasSearched]);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{hasSearched ? "Search Results" : "Popular Movies"}</h2>
        <p>Discover and save your favorite films</p>
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} />
      )}

      {!loading && !error && movies.length === 0 && (
        <p>No movies found.</p>
      )}
    </main>
  );
}

export default Home;
