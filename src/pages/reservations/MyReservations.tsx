import { useEffect, useState } from "react";
import { useAuth } from "../../security/AuthProvider";
import { getReservationsByUsername } from "../../services/apiFacade";
import { Reservation as APIReservation } from "../../services/Interfaces";
import "./myReservations.css";

const MyReservations = () => {
  const { currentUser } = useAuth();
  const auth = useAuth();
  const {username} = useAuth();
  const [reservations, setReservations] = useState<Array<APIReservation>>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function test() {
      console.log(currentUser, "current user");
      console.log(auth);
      

      if (username !== null) {
        setLoading(true)
        getReservationsByUsername(username)
          .then(res => setReservations(res))
          .catch(() => setError("Error fetching reservations, the server might be down."));
          setLoading(false)
      }
    }

    test();
  }, [username]);

  if (!username) {
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
        const formattedDate = date.toLocaleString("en-UK", {
          month: "short",
          day: "2-digit",
        });

        return (
          <div key={reservation.id} className="reservation-card">
            <img src={reservation.showing.movie.poster} className="reservation-image" alt={reservation.showing.movie.title} />
            <div className="reservation-details">
              <h2 className="reservation-title">{reservation.showing.movie.title}</h2>
              <p className="reesrvation-text">
                <b>Time:</b> {formattedTime} {formattedDate}
              </p>
              <p className="reservation-text">
                <b>Price:</b> {reservation.price} dkk
              </p>
              <p><b>Showing ID</b> {reservation.showing.id}</p>
              <p className="reservation-text">
                <b>Hall:</b> {reservation.showing.hall.hallNumber}
              </p>
              <p className="reservation-text">
                <b>Seats:</b>
                <table className="reservation-seats">
                  <thead>
                    <tr>
                      <th className="center-text">Seat</th>
                      <th className="center-text">Row</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservation.reservedSeats.map((seat) => (
                      <tr key={seat.id}>
                        <td>{seat.seatNumber}</td>
                        <td>{seat.seatRowNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyReservations;
