import React, { useState } from "react";
import ReservationList from "./ReservationList";

// interface Props {
//    searchTerm: string;
//  }

const ReservationLayout: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>Reservations</h1> 
      <input type="text" placeholder="Search by email" value={searchTerm} onChange={handleSearch} />
      <ReservationList searchTerm={searchTerm}/>
    </div>
  );
};

export default ReservationLayout;
