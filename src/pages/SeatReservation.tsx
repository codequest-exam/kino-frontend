import { useEffect, useState, useRef } from "react";
import HallLayout from "../components/HallLayout";
import { API_URL } from "../settings";
import { addReservation } from "../services/apiFacade";

export enum SeatStatus {
  AVAILABLE = "available",
  RESERVED = "reserved",
  SELECTED = "selected",
}

export type Seat = {
  id: number;
  status: SeatStatus;
};

export type HallStats = {
  rows: number;
  seatsPerRow: number;
  totalSeats: number;
};

function SeatReservation() {
  const [hallLayout, setHallLayout] = useState<HallStats>();
  // const [hallLayout, setHallLayout] = useState({ rows: 10, seatsPerRow: 10, totalSeats: 100 });
  const takenSeatsRef = useRef<number[]>([]);

  // const initialSeats: Seat[] = Array([50]).map((_, index) => ({ id: index + 1, status: SeatStatus.AVAILABLE }));
  const [seats, setSeats] = useState<Seat[]>();

  // .map((seat, index) =>
  //   ({ id: index + 1, status: takenSeatsRef.current.includes(index + 1) ? "reserved" : "available" })
  // )

  useEffect(() => {
    const fetchSeats = async () => {
      const res = await fetch(`${API_URL}/showings/2/seats`);
      console.log("API URL", API_URL);

      // const res = await fetch(`${API_URL}/showings/2/seats`);
      const result = await res.json();
      console.log("fetch result", result);
      takenSeatsRef.current = result;
      getHallLayout();
    };

    const getHallLayout = async () => {
      const res2 = await fetch(`${API_URL}/showings/2`);
      const result2 = await res2.json();

      const totalSeats = result2.hall.seatRows * result2.hall.seatsPerRow;
      setHallLayout({ rows: result2.hall.seatRows, seatsPerRow: result2.hall.seatsPerRow, totalSeats: totalSeats });

      if (!result2) return;
      const tempArray = [];

      for (let i = 1; i < totalSeats + 1; i++) {
        tempArray.push({ id: i, status: takenSeatsRef.current.includes(i) ? SeatStatus.RESERVED : SeatStatus.AVAILABLE });
      }

      setSeats([...tempArray]);
    };

    fetchSeats();
    // getHallLayout();
  }, []);

  const handleSeatClick = (id: number) => {
    seats &&
      setSeats(
        seats.map(seat => {
          if (seat.id === id) {
            // If seat is available, change status to "selected"
            if (seat.status === SeatStatus.AVAILABLE) {
              return { ...seat, status: SeatStatus.SELECTED };
              // If seat is selected, change status to "available"
            } else if (seat.status === SeatStatus.SELECTED) {
              return { ...seat, status: SeatStatus.AVAILABLE };
            }
          }
          return seat;
        })
      );
  };

  const handleConfirmClick = () => {
    const newReservation = {
      showing: { id: 1 },
      seats: seats?.map(seat => (seat.status === SeatStatus.SELECTED ? seat.id : null)).filter(seat => seat !== null),
    };
    // apiFacade.addReservation(newReservation);
    addReservation(newReservation);
    // seats && setSeats(seats.map(seat => (seat.status === "selected" ? { ...seat, status: SeatStatus.RESERVED } : seat)));
  };

  return hallLayout && seats ? (
    <HallLayout HallStats={hallLayout} seats={seats} handleSeatClick={handleSeatClick} handleConfirmClick={handleConfirmClick} />
  ) : (
    <div>Loading...</div>
  );
  // return HallLayout( hallLayout.rows, hallLayout.seats, handleSeatClick, handleConfirmClick );
  // return HallLayout({ numColumns: hallLayout.seatsPerRow, seats: hallLayout.seatsPerRow, handleSeatClick, handleConfirmClick });
}

export default SeatReservation;
