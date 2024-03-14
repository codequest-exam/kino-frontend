import { useState, useEffect } from "react";
import HallLayout from "../components/HallLayout";

export type SeatStatus = "available" | "reserved" | "selected";

export type Seat = {
  id: number;
  status: SeatStatus;
};

function SeatReservation() {
  const numColumns = 10;

  const [seats, setSeats] = useState<Seat[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/seats")
      .then((response) => response.json())
      .then((data) => setSeats(data))
      .catch((error) => console.error("Error fetching seats: ", error));
  }, []);

  // const initialSeats: Seat[] = Array(50)
  //   .fill({ status: "available" })
  //   .map((seat, index) => ({ ...seat, id: index }));
  // const [seats, setSeats] = useState(initialSeats);

  const handleSeatClick = (id: number) => {
    setSeats(
      seats.map((seat) => {
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
    setSeats(seats.map((seat) => (seat.status === "selected" ? { ...seat, status: "reserved" } : seat)));
  };

  return HallLayout({ numColumns, seats, handleSeatClick, handleConfirmClick });
}

export default SeatReservation;
