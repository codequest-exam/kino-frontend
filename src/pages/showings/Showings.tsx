import { useEffect, useState } from "react";
import { getShowings, deleteShowing } from "../../services/apiFacade";
import { Showing } from "../../services/Interfaces";
import { useNavigate } from "react-router-dom";
import "./showings.css";
import { formatStartDate, formatStartTime } from "../../Helpers";

export default function Showings() {
  const navigate = useNavigate();
  const [showings, setShowings] = useState<Array<Showing>>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getShowings()
      .then((res) => {
        setShowings(res);
        setLoading(false);
      })
      .catch(() => setError("Error fetching showings, the server might be down."));
  }, []);

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
      <td>{showing.hall.hallNumber}</td>
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

  if (loading) return <h2>Loading...</h2>;

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
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{showingTableRows}</tbody>
      </table>
      <button
        onClick={() => {
          navigate("/add-showing");
        }}
        style={{ marginTop: "20px" }}
      >
        Add Showing
      </button>
    </div>
  );
}
