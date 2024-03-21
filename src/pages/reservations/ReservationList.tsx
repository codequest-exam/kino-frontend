import { useEffect, useState } from "react";
import { getReservations } from "../../services/apiFacade";
import { Reservation as APIReservation } from "../../services/Interfaces";
// import {  Reservation as APIReservation,  getReservations} from "../../services/apiFacade";
import "./reservations.css";

interface Props {
  searchTerm: string;
}

const ReservationList: React.FC<Props> = ({ searchTerm }) => {
  const [reservations, setReservations] = useState<Array<APIReservation>>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReservations()
      .then((res) => {
        setReservations(res);
        setLoading(false);
      })
      .catch(() => setError("Error fetching reservations, the server might be down."));
  }, [searchTerm]);

  const filterReservationsByEmail = reservations.filter((reservation) => 
  (reservation.user && reservation.user.email 
              ? reservation.user.email 
              : reservation.email).toLowerCase().includes(searchTerm.toLowerCase()));

  const formatTime = filterReservationsByEmail.map((reservation) => {
    const date = new Date(reservation.showing.startTime);
    console.log(reservation);
    const formattedTime = `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
    const formattedDate = date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
    });

    return (
      <tr key={reservation.id}>
        <td className="center-text">{reservation.id}</td>
        <td>{reservation.showing.movie.title}</td>
        <td>
          {formattedTime} {formattedDate}
        </td>
        <td>{reservation.user && reservation.user.email 
              ? reservation.user.email 
              : reservation.email}</td>
        <td>{reservation.user && reservation.user.userName ? reservation.user.userName : "Anonymous"}</td>
        <td>{reservation.price} dkk,-</td>
        <td>{reservation.showing.hall.cinema.name}</td>
        <td>{reservation.showing.hall.hallNumber}</td>
        <td className="center-text">
          {reservation.reservedSeats.map((seat) => (
            <span key={seat.id}>{seat.seatNumber}</span>
          ))}
        </td>
        <td className="center-text">
          {reservation.reservedSeats.map((seat) => (
            <span key={seat.id}>{seat.seatRowNumber}</span>
          ))}
        </td>
        <td className="center-text">{reservation.showing.is3d ? "Yes" : "No"}</td>
        <td className="center-text">{reservation.showing.isImax ? "Yes" : "No"}</td>
      </tr>
    );
  });

  if (error !== "") {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }
  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Movie</th>
            <th>Start Time</th>
            <th>Email</th>
            <th>User Name</th>
            <th>Price</th>
            <th>Cinema</th>
            <th>Hall</th>
            <th>Seat</th>
            <th>Row</th>
            <th>3D</th>
            <th>IMAX</th>
          </tr>
        </thead>
        <tbody>{formatTime}</tbody>
      </table>
    </>
  );
};

export default ReservationList;
