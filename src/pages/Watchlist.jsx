import { useMovies } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Watchlist() {
  const { watchlist } = useMovies();

  return (
    <div>
      <h2>Your Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>No movies added yet.</p>
      ) : (
        watchlist.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      )}
    </div>
  );
}

export default Watchlist;
