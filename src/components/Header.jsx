import { useState } from "react";
import { Link } from "react-router-dom";

function Header({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  }

  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/watchlist">Watchlist</Link>
      </nav>

      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleChange}
      />
    </header>
  );
}

export default Header;
 