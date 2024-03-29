import { useState } from "react";
import "./checkout.css";
import { newReservation } from "./SeatReservation";
import { addReservation } from "../services/apiFacade";
import { useAuth } from "../security/AuthProvider";
import { formatStartDate, formatStartTime } from "../Helpers";

export type Reservation = {
  tempOrder: newReservation;
  setOrderReady: (orderReady: boolean) => void;
};

export default function Checkout({ tempOrder, setOrderReady }: Reservation) {
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
      console.log("Reservation failed");
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
        <h2 className="movie-title">{tempOrder.showing.movie.title}</h2>
        <img height={"200px"} alt="movie poster" src={tempOrder.showing.movie.poster}></img> <p className="reservation-info">Cinema: {tempOrder.showing.hall.cinema.name}</p>
        <p className="reservation-info">Hall: {tempOrder.showing.hall.hallNumber}</p>
        <p className="reservation-info">Start date: {formatStartDate(tempOrder.showing.startTime)}</p>
        <p className="reservation-info">Start time: {formatStartTime(tempOrder.showing.startTime)}</p>
        <p className="reservation-info">Reserved seats:</p>
        <div style={{ display: "flex" }}>
          {tempOrder.reservedSeats?.map((seat, index) => (
            <p key={index} className="seat-reservation-info">
              Seat: {seat.seatNumber}, Row: {seat.seatRowNumber} - {seat.price} dkk
            </p>
          ))}
        </div>
        <p className="reservation-info">
          {/* check the highest price and show that one*/}
          <b>Total price: {tempOrder.priceInfo.price < tempOrder.priceInfo.priceWithReservationFee ? tempOrder.priceInfo.priceWithReservationFee : tempOrder.priceInfo.priceWithGroupDiscount} dkk,-</b>
        </p>
        <button
          onClick={() => {
            handleReservation();
          }}
        >
          Confirm
        </button>
        <button
          style={{ backgroundColor: "red" }}
          onClick={() => {
            setOrderReady(false);
          }}
        >
          Go back to seat selection
        </button>
      </div>
    )
  );
}
