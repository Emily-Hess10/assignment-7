import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { searchMovies } from "./services/movieService";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch(query) {
    if (!query) {
      setHasSearched(false);
      setMovies([]);
      return;
    }

    try {
      const results = await searchMovies(query);
      setMovies(results);
      setHasSearched(true);
    } catch (error) {
      console.error("Search failed", error);
    }
  }

  return (
    <Router>
      <div className="app">
        <Header onSearch={handleSearch} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                movies={movies}
                setMovies={setMovies}
                hasSearched={hasSearched}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
