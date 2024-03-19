import { Outlet, useOutlet } from "react-router-dom";
import MovieList from "./MovieList";

export default function MovieLayout() {
  const outlet = useOutlet();

  return (
    <>
      <h1>Movies</h1>
      <div className="outlet-container">
        {outlet || <h3>Select a movie to see details</h3>}
        <Outlet />
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, flexDirection: "column" }}>
          <MovieList />
        </div>
      </div>
    </>
  );
}
