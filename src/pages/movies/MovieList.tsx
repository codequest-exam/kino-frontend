import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../../services/apiFacade";
import { Movie } from "../../services/Interfaces";
import "./movielist.css";

export default function MovieList() {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMovies()
      .then((res) => {
        setMovies(res);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching movies, the server might be down.");
        setLoading(false);
      });
  }, []);

  const movieListItems = movies.map((movie) => {
    return (
      <li key={movie.title} className="movie-card">
        <Link to={`/movies/${movie.id}`}>
          <img src={movie.poster} alt={movie.title} />
        </Link>
        <Link to={`/movies/${movie.id}`}>
          <h2>{movie.title}</h2>
        </Link>
        <p>
          Rating: <span style={{ color: "gold" }}>&#9733;</span> ({movie.imdbRating})
        </p>
      </li>
    );
  });
  if (loading) return <h2>Loading...</h2>;

  if (error !== "") {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  return (
    <>
      <div style={{ listStyle: "none", paddingLeft: 0 }} className="movie-card-container">
        {movieListItems}
      </div>
    </>
  );
}
