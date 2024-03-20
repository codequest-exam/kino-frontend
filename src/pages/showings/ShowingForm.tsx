import React, { useState } from "react";
import "./ShowingForm.css";

const ShowingForm = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [cinemaName, setCinemaName] = useState("");
  const [showingTime, setShowingTime] = useState("");
  const [showingSubmits, setShowingSubmits] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save the movie showing
    const newSubmit = `${movieTitle} - ${cinemaName} - ${showingTime}`;
    setShowingSubmits([...showingSubmits, newSubmit]);
    console.log("Movie showing submitted:", movieTitle, cinemaName, showingTime);
    // Reset form fields
    setMovieTitle("");
    setCinemaName("");
    setShowingTime("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Movie Title:
          <input type="text" value={movieTitle} onChange={(e) => setMovieTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Cinema Name:
          <input type="text" value={cinemaName} onChange={(e) => setCinemaName(e.target.value)} />
        </label>
        <br />
        <label>
          Showing Time:
          <input type="text" value={showingTime} onChange={(e) => setShowingTime(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add Showing</button>
      </form>
      <div className="showings-container">
        <h2>Showing Submits:</h2>
        <ul className="showings-list">
          {showingSubmits.map((submit, index) => (
            <li key={index}>{submit}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShowingForm;
