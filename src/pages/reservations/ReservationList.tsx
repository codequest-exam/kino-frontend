import { useEffect, useState } from "react";
import { getReservations } from "../../services/apiFacade";
import { Reservation as APIReservation } from "../../services/Interfaces";
import "./reservations.css";

interface Props {
  searchTerm: string;
}

const ReservationList: React.FC<Props> = ({ searchTerm }) => {
  const [reservations, setReservations] = useState<Array<APIReservation>>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getReservations()
      .then((res) => {
        setReservations(res);
        setLoading(false);
      })
      .catch(() => setError("Error getting reservations. Please try again."));
  }, [searchTerm]);

  const filteredReservations = reservations.filter(
    (reservation) => reservation.email?.toLowerCase().includes(searchTerm.toLowerCase()) || (reservation.user?.email && reservation.user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (error) {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Movie</th>
          <th>Start Time</th>
          <th>Email</th>
          <th>User Name</th>
          <th>Price</th>
          <th>Showing ID</th>
          <th>Cinema</th>
          <th>Hall</th>
          <th>Seat</th>
          <th>Row</th>
          <th>3D</th>
          <th>IMAX</th>
        </tr>
      </thead>
      <tbody>
        {filteredReservations.map((reservation) => {
          const date = new Date(reservation.showing.startTime);
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
              <td>{reservation.user && reservation.user.email ? reservation.user.email : reservation.email}</td>
              <td>{reservation.user && reservation.user.userName ? reservation.user.userName : "Anonymous"}</td>
              <td>{reservation.price} DKK,-</td>
              <td>{reservation.showing.id}</td>
              <td>{reservation.showing.hall.cinema.name}</td>
              <td>{reservation.showing.hall.hallNumber}</td>
              <td className="center-text">{reservation.reservedSeats.map((seat) => seat.seatNumber).join(", ")}</td>
              <td className="center-text">{reservation.reservedSeats.map((seat) => seat.seatRowNumber).join(", ")}</td>
              <td className="center-text">{reservation.showing.is3d ? "Yes" : "No"}</td>
              <td className="center-text">{reservation.showing.isImax ? "Yes" : "No"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ReservationList;
