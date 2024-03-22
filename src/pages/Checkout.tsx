import { useState } from "react";
import "./checkout.css";
import { newReservation } from "./SeatReservation";
import { addReservation } from "../services/apiFacade";
import { useAuth } from "../security/AuthProvider";

export default function Checkout({ tempOrder }: { tempOrder: newReservation }) {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleReservation() {
    try {
      setLoading(true);
      await addReservation(tempOrder, auth.isLoggedIn());
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setError((error as Error).message);
    }
  }

  return success ? (
    <h1>Reservation successful</h1>
  ) : error ? (
    <h1>{error}</h1>
  ) : loading ? (
    <h1>Making reservation...</h1>
  ) : (
    tempOrder && (
      <div className="reservation-list-container">
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
        <button
          onClick={() => {
            handleReservation();
          }}
        >
          Confirm
        </button>
      </div>
    )
  );
}
