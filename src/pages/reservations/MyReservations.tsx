import { useEffect, useState } from "react";
import { useAuth } from "../../security/AuthProvider";
import { getReservationsByUsername } from "../../services/apiFacade";
import { Reservation as APIReservation } from "../../services/Interfaces";

const MyReservations = () => {
  const { currentUser } = useAuth();
  const [reservations, setReservations] = useState<Array<APIReservation>>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      getReservationsByUsername(currentUser.username)
        .then((res) => {
          setReservations(res);
          setLoading(false);
        })
        .catch(() => setError("Error fetching reservations, the server might be down."));
    }
  }, [currentUser]);

  if (!currentUser) {
    return <h2>No user found</h2>;
  }

  if (error !== "") {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }
  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Reservations</h1>
      {reservations.map((reservation) => {
        const date = new Date(reservation.showing.startTime);
        const formattedTime = `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
        const formattedDate = date.toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
        });

        return (
          <div key={reservation.id}>
            <img src={reservation.showing.movie.poster} alt={reservation.showing.movie.title} />
            <p>
              <b>{reservation.showing.movie.title}</b>
            </p>
            <div>
              {" "}
              <b>
                {formattedTime} {formattedDate}
              </b>
            </div>
            <p>
              <b>Hall:</b> {reservation.showing.hall.hallNumber}
            </p>
            <div className="center-text">
              <b>Seat:</b>
              {reservation.reservedSeats.map((seat) => (
                <span key={seat.id}>{seat.seatNumber}, </span>
              ))}
            </div>
            <div className="center-text">
              <b>Row:</b>
              {reservation.reservedSeats.map((seat) => (
                <span key={seat.id}>{seat.seatRowNumber}, </span>
              ))}
            </div>
            <p>
              <b>Total payment:</b> {reservation.price} dkk,-
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default MyReservations;
