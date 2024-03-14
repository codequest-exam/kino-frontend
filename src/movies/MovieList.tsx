import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie as APIMovie, getMovies } from "../services/apiFacade";

export default function MovieList() {
// const [queryString] = useSearchParams();
// const initialCategory = queryString.get("category");
  const [movies, setMovies] = useState<Array<APIMovie>>([]);
// const [category, setCategory] = useState<string | null>(initialCategory);
  const [error, setError] = useState("");
//const auth = useAuth();

  useEffect(() => {
    getMovies()
      .then((res) => setMovies(res))
      .catch(() =>
        setError("Error fetching movies, the server might be down.")
      );
  }, []);

  const movieListItems = movies.map((movie) => {
    return (
      <li key={movie.imdbID}>
        <Link to={`${movie.imdbID}`}>{movie.title}</Link>
        <p>Year: {movie.year}</p>
        <p>Runtime: {movie.runtime}</p>
        <p>Director: {movie.director}</p>
        <p>Actors: {movie.actors}</p>
        <p>IMDb Rating: {movie.imdbRating}</p>
        <img src={movie.poster} alt={movie.title} />
      </li>
    );
  });

  if (error !== "") {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  return (
    <>
      <h3>Movies</h3>
      <div>
        {/* <button
          onClick={() => {
            getMovies().then((res) => setMovies(res));
          }}
        >
          Clear
        </button> */}
      </div>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>{movieListItems}</ul>
    </>
  );
}
