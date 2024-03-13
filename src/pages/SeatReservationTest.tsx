import React, { useState } from "react";

const SeatReservation: React.FC = () => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [isConfirmed, setIsConfirmed] = useState(false); // New state variable

  const handleSeatClick = (seatNumber: number) => {
    if (!isConfirmed) {
      // Only allow seat selection if not confirmed
      if (selectedSeats.includes(seatNumber)) {
        setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
      } else {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    }
  };

  const handleConfirmClick = () => {
    // Perform actions to confirm the seat reservation
    // For example, you can update the status of selected seats to "reserved"
    setSelectedSeats(selectedSeats.map((seat) => (selectedSeats.includes(seat) ? seat : seat)));
    setIsConfirmed(true); // Set isConfirmed to true after confirming
  };

  return (
    <div>
      <h1>Seat Reservation</h1>
      <p>Select your seats:</p>
      <div>
        {Array.from({ length: 10 }, (_, index) => (
          <button
            key={index}
            onClick={() => handleSeatClick(index + 1)}
            style={{
              backgroundColor: selectedSeats.includes(index + 1) ? "red" : "green",
              margin: "5px",
              padding: "10px",
              borderRadius: "5px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <p>Selected seats: {selectedSeats.join(", ")}</p>
      <button onClick={handleConfirmClick}>Confirm Reservation</button>
    </div>
  );
};

export default SeatReservation;
