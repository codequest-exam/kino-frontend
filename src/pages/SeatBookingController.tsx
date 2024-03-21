import React, { useState } from "react";
import Checkout from "./Checkout";
import SeatReservation from "./SeatReservation";

export default function SeatBookingController() {
  // const [orderReady, setOrderReady] = useState(false);
  const [tempOrder, setTempOrder] = useState({});

  return tempOrder.reservedSeats ? (
    <>
      <Checkout tempOrder={tempOrder} />
    </>
  ) : (
    <SeatReservation setTempOrder={setTempOrder} />
  );
}
