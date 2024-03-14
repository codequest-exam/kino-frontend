import { useState } from "react";

type SeatStatus = "available" | "reserved" | "selected";

type Seat = {
  id: number;
  status: SeatStatus;
};

function SeatReservation() {
  const initialSeats: Seat[] = Array(50)
    .fill({ status: "available" })
    .map((seat, index) => ({ ...seat, id: index }));
  const [seats, setSeats] = useState(initialSeats);

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

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%", // Adjust this value based on your needs
        }}
      >
        {seats.map((seat) => (
          <button
            key={seat.id}
            style={{
              backgroundColor: seat.status === "selected" ? "red" : seat.status === "reserved" ? "grey" : "green",
              margin: "5px",
              padding: "10px",
              borderRadius: "5px",
              color: "white",
              fontWeight: "bold",
              flex: "0 0 calc(10% - 10px)", // This will create a 3-column layout. Adjust the percentage for different number of columns.
            }}
            disabled={seat.status === "reserved"}
            onClick={() => handleSeatClick(seat.id)}
          >
            {seat.status}
          </button>
        ))}
      </div>
      <button onClick={handleConfirmClick}>Confirm Reservation</button>
    </div>
  );
}

export default SeatReservation;
