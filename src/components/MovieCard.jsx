import { useEffect, useState } from "react";
import { useMovies } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const { watchlist, addToWatchlist, removeFromWatchlist } = useMovies();

  const isInWatchlist = watchlist.some((m) => m.id === movie.id);

  // FAVORITES (localStorage)
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.id === movie.id));
  }, [movie.id]);

  function toggleFavorite() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      const updated = favorites.filter((fav) => fav.id !== movie.id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  }

  function toggleWatchlist() {
    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  }

  return (
    <div className="movie-card">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/placeholder-poster.jpg"
        }
        alt={movie.title}
      />

      <h3>{movie.title}</h3>
      <p>{movie.vote_average?.toFixed(1)}</p>
      <p>{movie.release_date?.split("-")[0]}</p>

      <button onClick={toggleFavorite}>
        {isFavorite ? "Remove Favorite" : "♡ Add to Favorites"}
      </button>

      <button onClick={toggleWatchlist}>
        {isInWatchlist
          ? "Remove from Watchlist"
          : "Add to Watchlist"}
      </button>
    </div>
  );
}

export default MovieCard;
 