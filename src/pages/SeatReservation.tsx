import { useEffect, useState, useRef } from "react";
import HallLayout from "../components/HallLayout";
import { getReservedSeats, getShowing, getSeatsInHall } from "../services/apiFacade";
import { useAuth } from "../security/AuthProvider";
import { useParams } from "react-router";
import PriceDisplay from "../components/PriceDisplay";
import { Showing } from "../services/Interfaces";

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
  priceClass: string;
};

export type HallStats = {
  rows: number;
  seatsPerRow: number;
};

export type PriceInfo = {
  price: number;
  standard: number;
  cowboy: number;
  sofa: number;
  totalSeats: number;
  priceWithGroupDiscount: number;
  priceWithReservationFee: number;
};

export type newReservation = { showing: Showing; reservedSeats: Array<Seat> | undefined; priceInfo: PriceInfo; email: string };

function SeatReservation({ setTempOrder }: { setTempOrder: (newReservation: newReservation) => void }) {
  const auth = useAuth();

  const { id } = useParams<{ id: string }>();

  const [hallLayout, setHallLayout] = useState<HallStats>();

  const takenSeatsRef = useRef<number[]>([]);
  const showingRef = useRef<Showing>();
  const [priceInfo, setPriceInfo] = useState<PriceInfo>();
  const [email, setEmail] = useState<string>("");
  const [activeSubmit, setActiveSubmit] = useState<boolean>(auth.isLoggedIn());

  const [seats, setSeats] = useState<Seat[]>();
  const [errorMsg, setErrorMsg] = useState<string>();

  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

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
      showingRef.current = showingInfo;

      setHallLayout({ rows: showingInfo.hall.seatRows, seatsPerRow: showingInfo.hall.seatsPerRow });

      if (!showingInfo) return;
      const seatsInHall = await getSeatsInHall(showingInfo.hall.id);
      for (const seat of seatsInHall) {
        seat.status = takenSeatsRef.current.includes(seat.seatNumber) ? SeatStatus.RESERVED : SeatStatus.AVAILABLE;
      }

      setSeats([...seatsInHall]);
    };

    fetchSeats();
  }, []);

  function calcPrice(seats: Seat[]) {
    if (seats === undefined) return;
    console.log("seats", seats);

    const priceObject: PriceInfo = {
      price: 0,
      standard: 0,
      cowboy: 0,
      sofa: 0,
      totalSeats: 0,
      priceWithGroupDiscount: 0,
      priceWithReservationFee: 0,
    };

    seats.forEach(seat => {
      priceObject.price += seat.price;
      priceObject.totalSeats += 1;
      priceObject[seat.priceClass as keyof PriceInfo] += 1;
    });
    priceObject.priceWithGroupDiscount = priceObject.totalSeats >= 10 ? (priceObject.price * 0.93 * 100) / 100 : priceObject.price;

    priceObject.priceWithReservationFee = priceObject.totalSeats <= 5 && priceObject.totalSeats >= 1 ? priceObject.price * 1.03 : priceObject.price;
    console.log("priceObject", priceObject);

    return priceObject;
  }

  function emailChanged(event: string) {
    console.log("event", event);

    setEmail(event);
    if (event.length > 5) setActiveSubmit(true);
    else setActiveSubmit(false);
  }

  const handleSeatClick = (id: number) => {
    if (seats === undefined) return;
    const allSeats = seats.map(seat => {
      if (seat.id === id) {
        if (seat.status === SeatStatus.AVAILABLE) {
          return { ...seat, status: SeatStatus.SELECTED };
        } else if (seat.status === SeatStatus.SELECTED) {
          return { ...seat, status: SeatStatus.AVAILABLE };
        }
      }
      return seat;
    });
    const selectedSeats = allSeats.filter(seat => seat.status === SeatStatus.SELECTED);
    console.log("selectedSeatsIds", selectedSeats);
    setSelectedSeats(selectedSeats);
    setSeats([...allSeats]);
    setPriceInfo(calcPrice(selectedSeats));
  };

  async function handleConfirmClick() {
    if (id === undefined) {
      setErrorMsg("MISSING SHOW ID IN HANDLE CONFIRM CLICKED");
      return;
    }

    if (priceInfo === undefined) {
      setErrorMsg("MISSING PRICE INFO IN HANDLE CONFIRM CLICKED");
      return;
    }
    if (showingRef.current === undefined) {
      setErrorMsg("MISSING SHOWING INFO IN HANDLE CONFIRM CLICKED");
      return;
    }
    const newReservation: newReservation = {
      showing: showingRef.current,
      reservedSeats: selectedSeats,
      priceInfo: priceInfo,
      email: email,
    };
    setTempOrder(newReservation);
  }

  return hallLayout && seats ? (
    <>
      {!auth.isLoggedIn() && (
        <>
          <h3>When not logged in you must supply an email</h3>
          <label>
            Email:
            <input type="email" value={email} onChange={e => emailChanged(e.target.value)} />
          </label>
        </>
      )}
      <>
        <HallLayout
          HallStats={hallLayout}
          seats={seats}
          handleSeatClick={handleSeatClick}
          handleConfirmClick={handleConfirmClick}
          activeSubmit={activeSubmit}
        />
      </>
      {priceInfo && <PriceDisplay priceInfo={priceInfo} />}
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default SeatReservation;
