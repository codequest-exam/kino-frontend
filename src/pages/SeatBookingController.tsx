import { useState } from "react";
import Checkout from "./Checkout";
import SeatReservation, { newReservation } from "./SeatReservation";

export default function SeatBookingController() {
  // const [orderReady, setOrderReady] = useState(false);
  const [tempOrder, setTempOrder] = useState<newReservation>();
  

  return tempOrder ? (
      <Checkout tempOrder={tempOrder} />
  ) : (
    <SeatReservation setTempOrder={setTempOrder}  />
  );
}
