import { useParams } from "react-router-dom";
import { getMovie } from "../../services/apiFacade";
import { Movie } from "../../services/Interfaces";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./movie.css";

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  // const [movie, setMovie] = useState<APIMovie | null>(null);
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
            {movie.title} ({movie.year})
            <Link to={`/showings/${movie.id}`}>
              {" "}
              <button style={{ color: "red" }}>Bestil billeter</button>
            </Link>
          </h3>
          <div className="movie-content">
            <div className="movie-poster">
              <img src={movie.poster} alt={movie.title} />
            </div>
            <div className="movie-details">
              <p className="movie-info">{movie.plot}</p>
              <p className="movie-info">Movie Director: {movie.director}</p>
              <div className="movie-info-line">
                <p className="movie-info">Actors: {movie.actors}</p>
                <p className="movie-info">Runtime: {movie.runtime}</p>
              </div>
              <div className="movie-info-line">
                <p className="movie-info">{movie.genre}</p>
                <p className="movie-info">Rated: {movie.rated}</p>
              </div>
              <div className="movie-info-line">
                <p className="movie-info">IMDB votes: {movie.imdbVotes}</p>
                <p className="movie-info">Metascore: {movie.metascore}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="not-found">Sorry. Movie not found</h2>
      )}
    </>
  );
}
