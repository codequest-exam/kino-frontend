import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getShowingsByMovie } from "../../services/apiFacade";
import { Showing } from "../../services/Interfaces";
import { Link } from "react-router-dom";
import { formatStartDate, formatStartTime } from "../../Helpers";
import "./showingsForMovie.css";

export default function ShowingsForMovie() {
  const { id } = useParams();
  const [showings, setShowings] = useState<Array<Showing>>([]);
  useEffect(() => {
    async function setupShowings() {
      if (id === undefined) {
        console.error("ID UNDEFINED");
        return;
      }
      console.log("Fetching showings for movie with id: " + id);
      const showings = await getShowingsByMovie(id);
      setShowings(showings);
    }

    setupShowings();
  }, []);

  return (
    <div className="container">
      {showings && showings.length > 0 && (
        <div className="poster" key={showings[0].id}>
          <img src={showings[0].movie.poster}></img>
        </div>
      )}

      <div className="showings-grid">
        <div className="header">
          <div>Date</div>
          <div>Start Time</div>
          <div>Hall</div>
          <div>3D</div>
          <div>IMAX</div>
          <div>Reserve</div>
        </div>

        {showings.map((showing) => (
          <div className="row" key={showing.id}>
            <div>{formatStartDate(showing.startTime)}</div>
            <div>{formatStartTime(showing.startTime)}</div>
            <div>{showing.hall.hallNumber}</div>
            <div>{showing.is3d ? "Yes" : "No"}</div>
            <div>{showing.isImax ? "Yes" : "No"}</div>
            <div>
              
              <Link to={`/reservation/${Number(showing.id)}`}>
              <button className="reserve-button">
                Reserve
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
