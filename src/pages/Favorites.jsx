import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  return (
    <main className="main-content">
      <h2>Your Favorites</h2>

      {favorites.length === 0 ? (
        <p>No favorite movies saved yet.</p>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </main>
  );
}

export default Favorites;
