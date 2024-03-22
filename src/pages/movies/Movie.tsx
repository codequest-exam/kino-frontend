import { useParams } from "react-router-dom";
import { getMovie } from "../../services/apiFacade";
import { Movie as APIMovie } from "../../services/Interfaces";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./movie.css";

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState<APIMovie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    getMovie(Number(id))
      .then((res) => {
        setMovie(res);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching movie, the server might be down.");
        setLoading(false);
      });
  }, [id]);


  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      {error && <div>{error}</div>}
      {movie ? (
        <div className="movie-container">
          <h3 className="movie-title">{movie.title}</h3>
          <Link to={`/showings/${movie.id}`}>
            {" "}
            <button>Purchase tickets</button>
          </Link>
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
