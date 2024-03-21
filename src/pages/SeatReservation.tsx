import { useEffect, useState, useRef } from "react";
import HallLayout from "../components/HallLayout";
import { addReservation, getReservedSeats, getShowing, getSeatsInHall } from "../services/apiFacade";
import { useAuth } from "../security/AuthProvider";
import { useParams } from "react-router";
import PriceDisplay from "../components/PriceDisplay";

export enum SeatStatus {
  AVAILABLE = "available",
  RESERVED = "reserved",
  SELECTED = "selected",
}

export type Seat = {
  id: number;
  seatNumber: number;
  seatRowNumber: number;
  price: number;
  status: SeatStatus;
};

export type HallStats = {
  rows: number;
  seatsPerRow: number;
};

export type newReservation = { showing: { id: number }; reservedSeats: Array<{ id: number }> | undefined };

function SeatReservation({ setTempOrder }: { setTempOrder: (order: any) => void }) {
  // convert id to number immediately

  const { id } = useParams<{ id: string }>();

  const [hallLayout, setHallLayout] = useState<HallStats>();
  const auth = useAuth();
  const takenSeatsRef = useRef<number[]>([]);

  const [seats, setSeats] = useState<Seat[]>();

  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  // .map((seat, index) =>
  //   ({ id: index + 1, status: takenSeatsRef.current.includes(index + 1) ? "reserved" : "available" })
  // )

  useEffect(() => {
    const fetchSeats = async () => {
      if (id === undefined) return;
      const reservedSeats = await getReservedSeats(id);
      takenSeatsRef.current = reservedSeats;
      getHallLayout();
    };

    const getHallLayout = async () => {
      if (id === undefined) return;
      const showingInfo = await getShowing(id);

      setHallLayout({ rows: showingInfo.hall.seatRows, seatsPerRow: showingInfo.hall.seatsPerRow });

      if (!showingInfo) return;
      const seatsInHall = await getSeatsInHall(showingInfo.hall.id);
      for (const seat of seatsInHall) {
        seat.status = takenSeatsRef.current.includes(seat.seatNumber) ? SeatStatus.RESERVED : SeatStatus.AVAILABLE;
      }
      setSeats([...seatsInHall]);
    };

    fetchSeats();
    // getHallLayout();
  }, []);

  // const [selectedSeatPrice, setSelectedSeatPrice] = useState<number | null>(null);

  const handleSeatClick = (id: number) => {
    if (seats === undefined) return;
    const selectedSeats = seats.map(seat => {
      if (seat.id === id) {
        if (seat.status === SeatStatus.AVAILABLE) {
          // setSelectedSeatPrice(seat.price);
          return { ...seat, status: SeatStatus.SELECTED };
          // If seat is selected, change status to "available"
        } else if (seat.status === SeatStatus.SELECTED) {
          return { ...seat, status: SeatStatus.AVAILABLE };
        }
      }
      return seat;
    });
    const selectedSeatsIds = selectedSeats.filter(seat => seat.status === SeatStatus.SELECTED);
    setSelectedSeats(selectedSeatsIds);
    setSeats([...selectedSeats]);
  };

  async function handleConfirmClick() {
    // array as number
    const reservedSeats: { id: number }[] = [];
    if (id === undefined) {
      console.error("MISSING ID IN HANDLE CONFIRM CLICKED");
      return;
    }
    selectedSeats.map(seat => reservedSeats.push({ id: Number(seat.id) }));

    const newReservation: newReservation = {
      showing: { id: Number(id) },
      reservedSeats,
    };
    console.log(newReservation);

    console.log("temporder + ",setTempOrder);
    
    setTempOrder(newReservation);
    // const result = await addReservation(newReservation, auth.isLoggedIn());
    // console.log("result", result);
  }

  return hallLayout && seats ? (
    <>
      <HallLayout HallStats={hallLayout} seats={seats} handleSeatClick={handleSeatClick} handleConfirmClick={handleConfirmClick} />
      <PriceDisplay seats={selectedSeats} />
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default SeatReservation;
