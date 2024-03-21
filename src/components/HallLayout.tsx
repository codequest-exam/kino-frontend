import { /*SeatStatus,*/ Seat, HallStats, SeatStatus } from "../pages/SeatReservation";
// import { useState } from "react";
type HallLayoutProps = {
  HallStats: HallStats;
  seats: Seat[];
  handleSeatClick: (id: number) => void;
  handleConfirmClick: () => void;
  activeSubmit: boolean;
};

export default function HallLayout({ HallStats, seats, handleSeatClick, handleConfirmClick, activeSubmit }: HallLayoutProps) {
  // export default function HallLayout({ HallStats, seats, handleSeatClick, handleConfirmClick, setEmail }: HallLayoutProps) {

  return (
    <div>
      <div
        style={{
          display: "grid",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%", // Adjust this value based on your needs
          gridTemplateColumns: `repeat(${HallStats.seatsPerRow}, 1fr)`,
        }}
      >
        {seats.map(seat => (
          <button
            key={seat.id}
            style={{
              backgroundColor: seat.status === SeatStatus.AVAILABLE ? "green" : seat.status === SeatStatus.RESERVED ? "grey" : "red",
              // change opacity based on priceclass
              opacity: seat.priceClass === "cowboy" ? "0.7" : seat.priceClass === "standard" ? "0.8" : "1",

              margin: "5px",
              padding: "10px",
              borderRadius: "5px",
              color: "white",
              fontWeight: "bold",

              // flex: "0 0 calc(10% -10px)", // This will create a 3-column layout. Adjust the percentage for different number of columns.
            }}
            disabled={seat.status === "reserved"}
            onClick={() => handleSeatClick(seat.id)}
          >
            {/* {seat.id} */}
          </button>
        ))}
      </div>

      <button onClick={handleConfirmClick} disabled={!activeSubmit} style={{ color: "black" }}>
        {activeSubmit ? "Submit reservation" : "You must enter an email or login to continue"}
      </button>
    </div>
  );
}
