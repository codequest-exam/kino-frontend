import { useParams } from "react-router-dom";
import { getMovie, Movie as APIMovie } from "../../services/apiFacade";
import { useEffect, useState } from "react";
import "./movie.css";

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState<APIMovie | null>(null);
  useEffect(() => {
    getMovie(Number(id)).then((res) => setMovie(res));
  }, [id]);

  return (
    <>
      {movie ? (
        <div className="movie-container">
          <h3 className="movie-title">
            {movie.title} ({movie.year})
          </h3>
          <div className="movie-content">
            <div className="movie-poster">
              <img src={movie.poster} alt={movie.title} />
            </div>
            <div className="movie-details">
              <p className="movie-info">{movie.plot}</p>
              <p>Movie Director: {movie.director}</p>
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
