import { useEffect, useState } from "react";
import { Showing, getShowings } from "../services/apiFacade";

export default function Showings() {
  const [showings, setShowings] = useState<Array<Showing>>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getShowings()
      .then((res) => setShowings(res))
      .catch(() => setError("Error fetching showings, the server might be down."));
  }, []);

  const formatStartTime = (startTime: string) => {
    const date = new Date(startTime);
    const formattedStartTime = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    return formattedStartTime;
  };
  const formatStartDate = (startTime: string) => {
    const date = new Date(startTime);
    const formattedStartDate = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}`;
    return formattedStartDate;
  };

  const showingTableRows = showings.map((showing) => (
    <tr key={showing.id}>
      <td>{showing.movie.title}</td>
      <td>{showing.hall.roomNumber}</td>
      <td>{formatStartTime(showing.startTime)}</td>
      <td>{formatStartDate(showing.startTime)}</td>
      <td>{showing.is3d ? "Yes" : "No"}</td>
      <td>{showing.isImax ? "Yes" : "No"}</td>
      <td>{showing.moviePrice}</td>
    </tr>
  ));

  if (error !== "") {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  return (
    <>
      <h3>Showings</h3>
      <table>
        <thead>
          <tr>
            <th>Movie</th>
            <th>Hall number</th>
            <th>Start Time</th>
            <th>Date</th>
            <th>3D</th>
            <th>IMAX</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{showingTableRows}</tbody>
      </table>
    </>
  );
}
