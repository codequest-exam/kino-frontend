import { useParams } from "react-router-dom";
import { getMovie, Movie as APIMovie } from "../../services/apiFacade";
import { useEffect, useState } from "react";

export default function Movie() {
  const { id } = useParams();
  console.log("id", id);

  const [movie, setMovie] = useState<APIMovie | null>(null);
  useEffect(() => {
    getMovie(Number(id)).then((res) => setMovie(res));
  }, [id]);

  return (
    <>
      {movie ? (
        <>
          <h3>
            {" "}
            {movie.title} ({movie.id})
          </h3>
          <div style={{ display: "flex" }}>
            <img
              style={{ width: 200, margin: 10, flexDirection: "column" }}
              src={movie.poster}
              alt={movie.poster}
            />
            <p style={{ display: "inline", flexDirection: "column" }}>
              {movie.director}
            </p>
          </div>
          <hr />
          <p style={{ whiteSpace: "pre-wrap" }}>{movie.imdbRating}</p>
          <p style={{ whiteSpace: "pre-wrap" }}>{movie.actors}</p>
          <p style={{ whiteSpace: "pre-wrap" }}>{movie.plot}</p>
          <p style={{ whiteSpace: "pre-wrap" }}>{movie.runtime}</p>
          <p style={{ whiteSpace: "pre-wrap" }}>{movie.genre}</p>
          <p style={{ whiteSpace: "pre-wrap" }}>{movie.rated}</p>
          <p style={{ whiteSpace: "pre-wrap" }}>{movie.year}</p>
          <p style={{ whiteSpace: "pre-wrap" }}>{movie.website}</p>
          <p style={{ whiteSpace: "pre-wrap" }}>{movie.metascore}</p>
          <p style={{ whiteSpace: "pre-wrap" }}>{movie.imdbVotes}</p>
          <p style={{ whiteSpace: "pre-wrap" }}>{movie.response}</p>
        </>
      ) : (
        <h2>Sorry. Movie not found</h2>
      )}
    </>
  );
}
