import { useEffect, useState } from "react";
import { Reservation as APIReservation, getReservations } from "../services/apiFacade";

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
    return (
      <li key={reservation.id}>
        <h2>{reservation.id}</h2>
        <p>{reservation.showing.movie.title}</p>
        <p>{reservation.showing.cinema.name}</p>
        <p>{reservation.showing.date}</p>
        <p>{reservation.seat}</p>
      </li>
    );
  });


if (error !== "") {
  return <h2 style={{ color: "red" }}>{error}</h2>;
}

  return <h2>
    Placeholder for all 
  </h2>;
}
