import { useState } from "react";
// import { Reservation as reservation } from "../services/Interfaces";
import "./checkout.css";
import { newReservation } from "./SeatReservation";
import { addReservation } from "../services/apiFacade";
import { useAuth } from "../security/AuthProvider";

// export default function Checkout() {
export default function Checkout({ tempOrder }: { tempOrder: newReservation }) {
  // const [reservations, setReservations] = useState<reservation[]>([]);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);
  const auth = useAuth();

  async function handleReservation(reservation: newReservation) {
    const succesCheck = await addReservation(reservation, auth.isLoggedIn());
    console.log("succesCheck", succesCheck);

    if (succesCheck.ok) {
      console.log("Reservation successful");

      setSuccess(true);
    } else {
      console.log("Reservation failed");
      setError("Something went wrong");
    }
  }

  // useEffect(() => {
  //   getReservations()
  //     .then(res => setReservations(res))
  //     .catch(() => setError("Error fetching reservations, the server might be down."));
  // }, []);

  // console.log("reservations", reservations);

  // const reservation = tempOrder;
  // <h2 className="movie-title">
  //   {reservation.showing.movie.title} {reservation.showing.movie.year}
  // </h2>
  // <p className="reservation-info">Cinema: {reservation.showing.hall.cinema.name}</p>
  // <p className="reservation-info">Hall: {reservation.showing.hall.hallNumber}</p>
  // <p className="reservation-info">Start time: {reservation.showing.startTime}</p>
  // {reservation.reservedSeats.map((seat, index) => (
  //   <p key={index} className="reservation-info">
  //     Seat: {seat.seatNumber}, Row: {seat.seatRowNumber}
  //   </p>
  // ))}
  // <p className="reservation-info">Total price: {reservation.price}</p>

  // if (error) {
  //   return <h2 style={{ color: "red" }}>{error}</h2>;
  // }

  return success ? (
    <h1>Reservation successful</h1>
  ) : error ? (
    <h1>Something went wrong</h1>
  ) : (
    tempOrder && (
      <div className="reservation-list-container">
        {/* <h1 className="title">Your Movie Reservation</h1> */}
        <h2 className="movie-title">{tempOrder.showing.movie.title} </h2>
        <p className="reservation-info">Cinema: {tempOrder.showing.hall.cinema.name}</p>
        <p className="reservation-info">Hall: {tempOrder.showing.hall.hallNumber}</p>
        <p className="reservation-info">Start time: {tempOrder.showing.startTime}</p>
        <p className="reservation-info">Total price: {tempOrder.priceInfo.price}</p>
        <p className="reservation-info">Reserved seats:</p>
        {tempOrder.reservedSeats?.map((seat, index) => (
          <p key={index} className="reservation-info">
            Seat: {seat.seatNumber}, Row: {seat.seatRowNumber}
          </p>
        ))}
        {/* <l>{tempOrder.priceInfo.cowboy}</l> */}
        <button
          onClick={() => {
            handleReservation(tempOrder);
          }}
        >
          Bekræft
        </button>

        {/* {reservationList} */}
      </div>
    )
  );
}
