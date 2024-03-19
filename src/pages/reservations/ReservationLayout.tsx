import React, { useState } from "react";
// import AllReservations from "./ReservationList";

const ReservationLayout: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>Reservations</h1>
      <input type="text" placeholder="Search by User" value={searchTerm} onChange={handleSearch} />
      {/* <AllReservations searchTerm={searchTerm} /> */}
    </div>
  );
};

export default ReservationLayout;
