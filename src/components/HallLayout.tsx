import { /*SeatStatus,*/ Seat, HallStats, SeatStatus } from "../pages/SeatReservation";

type HallLayoutProps = {
  HallStats: HallStats;
  seats: Seat[];
  handleSeatClick: (id: number) => void;
  handleConfirmClick: () => void;
};

export default function HallLayout({ HallStats, seats, handleSeatClick, handleConfirmClick }: HallLayoutProps) {
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
              // backgroundColor: seat.status ===  ? "red" : seat.status === "reserved" ? "grey" : "green",
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
            {/* {seat.status} */}
          </button>
        ))}
      </div>
      <button onClick={handleConfirmClick}>Confirm Reservation</button>
    </div>
  );
}
