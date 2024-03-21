import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getShowingsByMovie } from "../../services/apiFacade";
import { Showing } from "../../services/Interfaces";
import { Link } from "react-router-dom";

export default function ShowingsForMovie() {
  const { id } = useParams();
  const [showings, setShowings] = useState<Array<Showing>>([]);
  useEffect(() => {
    async function setupShowings() {
        if (id === undefined) {console.error("ID UNDEFINED"); return}
      console.log("Fetching showings for movie with id: " + id);
      const showings = await getShowingsByMovie(id);
      console.log("Showings", showings);

      setShowings(showings);
    }

    setupShowings();
  }, []);

  // not a table, but a list of showings
  return (
    <div>
      <h2>Showings for movie</h2>
      {showings && showings.length > 0 && (
        <div key={showings[0].id}>
          <img src={showings[0].movie.poster}></img>
          {/* <p>{showings[0].hall.hallNumber}</p> */}
        </div>
      )}

      <div className="showing-list">
        {showings.map(showing => (
          <div key={showing.id} className="showing" style={{display:"flex"}}>
            <Link to={`/reservation/${Number(showing.id)}`}>
              <h3>{showing.startTime}</h3>
              <p>Hall: {showing.hall.hallNumber}</p>
              <p>Start time{showings[0].startTime}</p>
              <p>3D: {showing.is3d ? "Yes" : "No"}</p>
              <p>IMAX: {showing.isImax ? "Yes" : "No"}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>

    // <div>
    //   {id}
    //   <h2>Showings for movie</h2>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Start time</th>
    //         <th>Hall</th>
    //         <th>3D</th>
    //         <th>IMAX</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {showings.map(showing => (
    //         <>
    //           <tr key={showing.id}>
    //             <Link to={`/reservation/${showing.id}`}>
    //               <td>{showing.startTime}</td>
    //               <td>{showing.hall.hallNumber}</td>
    //               <td>{showing.is3d ? "Yes" : "No"}</td>
    //               <td>{showing.isImax ? "Yes" : "No"}</td>
    //             </Link>
    //           </tr>
    //         </>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
}
