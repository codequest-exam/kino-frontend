import { useEffect, useState } from "react";
import { useAuth } from "../../security/AuthProvider";
import { getReservationsByUsername } from "../../services/apiFacade";
import { Reservation as APIReservation } from "../../services/Interfaces";

const MyReservations = () => {
    const { currentUser } = useAuth();
    const [reservations, setReservations] = useState<Array<APIReservation>>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (currentUser) {
         getReservationsByUsername(currentUser.username)
           .then((res) => setReservations(res))
           .catch(() =>
             setError("Error fetching reservations, the server might be down.")
           );
        }
    }, [currentUser]);

    if (!currentUser) {
      return <h2>No user found</h2>;
    }

    if (error !== "") {
      return <h2 style={{ color: "red" }}>{error}</h2>;
    }

    return (
  <div>
    <h1>My Reservations</h1>
    {reservations.map((reservation) => {
      const date = new Date(reservation.showing.startTime);
      const formattedTime = `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
      const formattedDate = date.toLocaleString("default", {
        month: "short",
        day: "2-digit",
      });

      return (
        <div key={reservation.id}>
          <p>{reservation.movie.title}</p>
            <p>{reservation.user.userName}</p>
            <p>{reservation.date}</p>
            <td>
              Kl.{formattedTime} d.{formattedDate}
            </td>
        </div>
      );
    })}
  </div>
);
}


export default MyReservations;
