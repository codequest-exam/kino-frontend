import { useState } from "react";
import HallLayout from "../components/HallLayout";

export type SeatStatus = "available" | "reserved" | "selected";

export type Seat = {
  id: number;
  status: SeatStatus;
};

function SeatReservation() {
  const numColumns = 10;

  const initialSeats: Seat[] = Array(50)
    .fill({ status: "available" })
    .map((seat, index) => ({ ...seat, id: index }));
  const [seats, setSeats] = useState(initialSeats);

  const handleSeatClick = (id: number) => {
    setSeats(
      seats.map(seat => {
        if (seat.id === id) {
          // If seat is available, change status to "selected"
          if (seat.status === "available") {
            return { ...seat, status: "selected" };
            // If seat is selected, change status to "available"
          } else if (seat.status === "selected") {
            return { ...seat, status: "available" };
          }
        }
        return seat;
      })
    );
  };

  const handleConfirmClick = () => {
    setSeats(seats.map(seat => (seat.status === "selected" ? { ...seat, status: "reserved" } : seat)));
  };

  return (
    HallLayout({ numColumns, seats, handleSeatClick, handleConfirmClick }));
}

export default SeatReservation;
