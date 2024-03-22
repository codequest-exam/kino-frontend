// import { Seat } from "../pages/SeatReservation"
import { PriceInfo } from "../pages/SeatReservation";

export default function PriceDisplay({ priceInfo }: { priceInfo: PriceInfo | undefined }) {
  // handle if priceInfo is undefined
  // if (!priceInfo) {
  //   return <div></div>;
  // }
  return (
    <div>
      <h2>Price info</h2>
      {priceInfo && priceInfo.standard != 0 && <p>Standard: {priceInfo.standard}</p>}
      {priceInfo && priceInfo.cowboy != 0 && <p>Cowboy: {priceInfo.cowboy}</p>}
      {priceInfo && priceInfo.sofa != 0 && <p>Sofa: {priceInfo.sofa}</p>}
      {<p>Total seats: {priceInfo ? priceInfo.totalSeats : 0}</p>}
      {/* {priceInfo && priceInfo.totalSeats && <p>Total seats: {priceInfo.totalSeats}</p>} */}
      {<p>Order price: {priceInfo ? priceInfo.price + " dkk,-" : "0,-"}</p>}
      {/* {priceInfo && priceInfo.price && <p>Ticket price: {priceInfo.price}</p>} */}
      {priceInfo && priceInfo.priceWithGroupDiscount != priceInfo.price && <p>Price with group discount: {priceInfo.priceWithGroupDiscount} dkk,-</p>}
      {priceInfo && priceInfo.priceWithReservationFee != priceInfo.price && (
        <p>Price with reservation fee: {priceInfo.priceWithReservationFee} dkk,-</p>
      )}
      {/* <p>Cowboy: {priceInfo.cowboy}</p>
      <p>Sofa: {priceInfo.sofa}</p>
      <p>Total seats: {priceInfo.totalSeats}</p>
      <p>Ticket price: {priceInfo.price}</p>
      {priceInfo.priceWithGroupDiscount != priceInfo.price && <p>Price with group discount: {priceInfo.priceWithGroupDiscount}</p>}
      {priceInfo.priceWithReservationFee != priceInfo.price && <p>Price with reservation fee: {priceInfo.priceWithReservationFee}</p>} */}
    </div>
  );
}
