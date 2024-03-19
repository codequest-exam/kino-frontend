import { useEffect, useState } from "react";
import {
  Reservation as APIReservation,
  getReservations,
} from "../../services/apiFacade";
import "./Reservations.css";

export default function AllReservations() {
  const [reservations, setReservations] = useState<Array<APIReservation>>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getReservations()
      .then((res) => setReservations(res))
      .catch(() =>
        setError("Error fetching reservations, the server might be down.")
      );
  }, []);

  const reservationListItems = reservations.map((reservation) => {
    const date = new Date(reservation.showing.startTime);
    const formattedTime = `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    const formattedDate = date.toLocaleString("default", {
      month: "short",
      day: "2-digit",
    });

    return (
      <tr key={reservation.id}>
        <td>{reservation.id}</td>
        <td>{reservation.showing.movie.title}</td>
        <td>
          Kl.{formattedTime} d.{formattedDate}
        </td>
      </tr>
    );
  });

  if (error !== "") {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Movie</th>
            <th>Start Time</th>
          </tr>
        </thead>
        <tbody>{reservationListItems}</tbody>
      </table>
    </>
  );
}
