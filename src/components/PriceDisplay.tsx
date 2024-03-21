// import { Seat } from "../pages/SeatReservation"
import { PriceInfo } from "../pages/SeatReservation";

export default function PriceDisplay({ priceInfo }: { priceInfo: PriceInfo }) {
  return (
    <>
      <h2>Price info</h2>
      <p>Standard: {priceInfo.standard}</p>
      <p>Cowboy: {priceInfo.cowboy}</p>
      <p>Sofa: {priceInfo.sofa}</p>
      <p>Total seats: {priceInfo.totalSeats}</p>
      <p>Ticket price: {priceInfo.price}</p>
      {priceInfo.priceWithGroupDiscount != priceInfo.price && <p>Price with group discount: {priceInfo.priceWithGroupDiscount}</p>}
      {priceInfo.priceWithReservationFee != priceInfo.price && <p>Price with reservation fee: {priceInfo.priceWithReservationFee}</p>}
    </>
  );
}
