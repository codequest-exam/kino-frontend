import { useParams } from "react-router-dom";
import { getMovie, Movie as APIMovie } from "../services/apiFacade";
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
            <img style={{ width: 200, margin: 10, flexDirection: "column" }} src={movie.title} alt={movie.title} />
            <p style={{ display: "inline", flexDirection: "column" }}>{movie.title}</p>
          </div>
          <hr />
          <p style={{ whiteSpace: "pre-wrap" }}>{movie.title}</p>
        </>
      ) : (
        <h2>Sorry. Movie not found</h2>
      )}
    </>
  );
}
