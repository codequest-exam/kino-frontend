import { Outlet, useOutlet } from "react-router-dom";
import MovieList from "./MovieList";

export default function MovieLayout() {
  const outlet = useOutlet();

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, flexDirection: "column" }}>
        <MovieList />
      </div>
      <div className="outlet-container">
        {outlet || <h3>Select a movie to see details</h3>}
        <Outlet />
      </div>
    </div>
  );
}
