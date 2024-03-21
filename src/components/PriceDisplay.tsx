import { Seat } from "../pages/SeatReservation"

export default function PriceDisplay({ seats }: { seats: Seat[] }) {
 
    function calcPrice() {
        const totalPrice = seats.reduce((acc, seat) => acc + seat.price, 0);  
        return totalPrice;  
    }
    return (
        <><h1>{calcPrice()}</h1>
        </>
    )
}