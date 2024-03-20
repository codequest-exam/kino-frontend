import { useEffect, useState } from "react";
import { Reservation as APIReservation, getReservations } from "../../services/apiFacade";
import "./reservations.css";

interface Props {
  searchTerm: string;
}

const ReservationList: React.FC<Props> = ({ searchTerm }) => {
  const [reservations, setReservations] = useState<Array<APIReservation>>([]);
  console.log("reservations", reservations);

  const [error, setError] = useState("");

  useEffect(() => {
    getReservations()
      .then((res) => setReservations(res))
      .catch(() => setError("Error fetching reservations, the server might be down."));
  }, [searchTerm]);

  const filterReservationsByEmail = reservations.filter((reservation) =>
    // reservation.email &&
    reservation.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const reservationListItems = filterReservationsByEmail.map((reservation) => {
    const date = new Date(reservation.showing.startTime);
    const formattedTime = `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
    const formattedDate = date.toLocaleString("default", {
      month: "short",
      day: "2-digit",
    });

    return (
      <tr key={reservation.id}>
        <td className="center-text">{reservation.id}</td>
        <td>{reservation.showing.movie.title}</td>
        <td>
          Kl.{formattedTime} d.{formattedDate}
        </td>
        <td>{reservation.email}</td>
        <td>UserInfo TBD</td>
        <td>{reservation.price} dkk,-</td>
        <td className="center-text">
          {reservation.reservedSeats.map((seat) => (
            <span key={seat.id}>{seat.seatNumber},</span>
          ))}
        </td>
        <td className="center-text">
          {reservation.reservedSeats.map((seat) => (
            <span key={seat.id}>{seat.seatRowNumber}</span>
          ))}
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
            <th>Email</th>
            <th>User Info</th>
            <th>Price</th>
            <th>Seat</th>
            <th>Row</th>
          </tr>
        </thead>
        <tbody>{reservationListItems}</tbody>
      </table>
    </>
  );
};

export default ReservationList;
