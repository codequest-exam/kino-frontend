import { useParams } from "react-router-dom";
import { getMovie, Movie as APIMovie } from "../../services/apiFacade";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./movie.css";

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState<APIMovie | null>(null);
  useEffect(() => {
    getMovie(Number(id)).then(res => setMovie(res));
  }, [id]);

  // function redirectToShowings(id: number) {
  //   console.log("redirecting to showings for movie with id: " + id);
  // }

  return (
    <>
      {movie ? (
        <div className="movie-container">
          <h3 className="movie-title">
            {movie.title}{" "}
            <Link to={`/showings/${movie.id}`}>
              {" "}
              <button style={{ color: "red" }}>Bestil billeter</button>
            </Link>
          </h3>
          <div className="movie-details">
            <img src={movie.poster} alt={movie.title} />
            <p>{movie.director}</p>
          </div>
          <hr />
          <p className="movie-info">{movie.imdbRating}</p>
          <p className="movie-info">{movie.actors}</p>
          <p className="movie-info">{movie.plot}</p>
          <p className="movie-info">{movie.runtime}</p>
          <p className="movie-info">{movie.genre}</p>
          <p className="movie-info">{movie.rated}</p>
          <p className="movie-info">{movie.year}</p>
          <p className="movie-info">{movie.website}</p>
          <p className="movie-info">{movie.metascore}</p>
          <p className="movie-info">{movie.imdbVotes}</p>
          <p className="movie-info">{movie.response}</p>
        </div>
      ) : (
        <h2 className="not-found">Sorry. Movie not found</h2>
      )}
    </>
  );
}
