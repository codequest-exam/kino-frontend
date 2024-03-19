import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie as APIMovie, getMovies } from "../../services/apiFacade";
import "./movielist.css";

export default function MovieList() {
  const [movies, setMovies] = useState<Array<APIMovie>>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getMovies()
      .then((res) => setMovies(res))
      .catch(() =>
        setError("Error fetching movies, the server might be down.")
      );
  }, []);

  const movieListItems = movies.map((movie) => {
    console.log("id:" + movie.id + " type:" + typeof movie.id);
    return (
      <li key={movie.title} className="movie-card">
        <Link to={`/movies/${movie.id}`}>
          <img src={movie.poster} alt={movie.title} />
        </Link>
        <Link to={`/movies/${movie.id}`}>
          <h2>{movie.title}</h2>
        </Link>
        <p>Rating: &#9733;({movie.imdbRating})</p>
      </li>
    );
  });

  if (error !== "") {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  return (
    <>
      <div
        style={{ listStyle: "none", paddingLeft: 0 }}
        className="movie-card-container"
      >
        {movieListItems}
      </div>
    </>
  );
}
