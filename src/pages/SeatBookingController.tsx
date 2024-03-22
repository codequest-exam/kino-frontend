import { useState } from "react";
import Checkout from "./Checkout";
import SeatReservation, { newReservation } from "./SeatReservation";

export default function SeatBookingController() {
  const [tempOrder, setTempOrder] = useState<newReservation>();
  const [orderReady, setOrderReady] = useState(true);
  

  return tempOrder && orderReady ? (
      <Checkout tempOrder={tempOrder} setOrderReady={setOrderReady} />
  ) : (
    <SeatReservation tempOrder={tempOrder} setTempOrder={setTempOrder} setOrderReady={setOrderReady}  />
  );
}
