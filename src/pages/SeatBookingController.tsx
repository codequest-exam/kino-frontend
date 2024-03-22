import { useState } from "react";
import Checkout from "./Checkout";
import SeatReservation, { newReservation } from "./SeatReservation";

export default function SeatBookingController() {
  const [tempOrder, setTempOrder] = useState<newReservation>();
  

  return tempOrder ? (
      <Checkout tempOrder={tempOrder} />
  ) : (
    <SeatReservation setTempOrder={setTempOrder}  />
  );
}
