import React from "react";
import { useState, useEffect } from "react";
import { Reservation as reservation } from "../services/apiFacade";
import { getReservations } from "../services/apiFacade";
import "./paymentRegistration.css";

export default function Checkout() {
  const [reservations, setReservations] = useState<reservation[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getReservations()
      .then((res) => setReservations(res))
      .catch(() => setError("Error fetching reservations, the server might be down."));
  }, []);

  const reservationList = reservations.map((reservation, index) => (
    <div key={index} className="reservation-item">
      <h2 className="movie-title">{reservation.movie.title}</h2>
      <p className="reservation-info">Hall: {reservation.hall.roomNumber}</p>
      <p className="reservation-info">Date: {reservation.date}</p>
      <p className="reservation-info">Time: {reservation.time}</p>
      {reservation.reservedSeats.map((seat, index) => (
        <p key={index} className="reservation-info">
          Seat: {seat.id}
        </p>
      ))}
    </div>
  ));

  if (error !== "") {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  return (
    <div className="reservation-list-container">
      <h1 className="title">Your Movie Reservations</h1>
      {reservationList}
    </div>
  );
}

//   <div className="ticket-list-container">
//     <h1 className="title">Your Movie Tickets</h1>
//     {tickets.map((ticket, index) => (
//       <div key={index} className="ticket-item">
//         {/* <h2 className="movie-title">{reservation.movieTitle}</h2> */}
//         {/* <p className="ticket-info">Theater: {reservation.theater}</p> */}
//         <p className="ticket-info">Date: {ticket.date}</p>
//         <p className="ticket-info">Time: {ticket.time}</p>
//         <p className="ticket-info">Seat: {ticket.seat}</p>
//       </div>
//     ))}
//   </div>
