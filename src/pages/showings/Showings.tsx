import { useEffect, useState } from "react";
import { Showing, getShowings, deleteShowing } from "../../services/apiFacade";
import "./showings.css";
import { useNavigate } from "react-router-dom";

export default function Showings() {
  const navigate = useNavigate();
  const [showings, setShowings] = useState<Array<Showing>>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getShowings()
      .then((res) => setShowings(res))
      .catch(() => setError("Error fetching showings, the server might be down."));
  }, []);

  const formatStartTime = (startTime: string) => {
    const date = new Date(startTime);
    const formattedStartTime = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    return formattedStartTime;
  };
  const formatStartDate = (startTime: string) => {
    const date = new Date(startTime);
    const formattedStartDate = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}`;
    return formattedStartDate;
  };
  const handleDelete = async (id: number) => {
    try {
      await deleteShowing(id);
      setShowings(await getShowings());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const showingTableRows = showings.map((showing) => (
    <tr key={showing.id}>
      <td>{showing.movie.title}</td>
      <td>{showing.hall.cinema.name}</td>
      <td>{showing.hall.roomNumber}</td>
      <td>{formatStartTime(showing.startTime)}</td>
      <td>{formatStartDate(showing.startTime)}</td>
      <td>{showing.is3d ? "Yes" : "No"}</td>
      <td>{showing.isImax ? "Yes" : "No"}</td>
      <td>
        <button
          onClick={() => {
            navigate("/add-showing", { state: { showing } });
          }}
        >
          Edit
        </button>
      </td>
      <td>
        <button
          onClick={() => {
            handleDelete(showing.id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  if (error !== "") {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  return (
    <div className="showings">
      <h3>Showings</h3>
      <table>
        <thead>
          <tr>
            <th>Movie</th>
            <th>Cinema</th>
            <th>Hall number</th>
            <th>Start Time</th>
            <th>Date</th>
            <th>3D</th>
            <th>IMAX</th>
          </tr>
        </thead>
        <tbody>{showingTableRows}</tbody>
      </table>
      <button
        onClick={() => {
          navigate("/add-showing");
        }}
      >
        Add Showing
      </button>
    </div>
  );
}
