import { useEffect, useState } from "react";
import { getShowings, deleteShowing } from "../../services/apiFacade";
import { Showing } from "../../services/Interfaces";
import { useNavigate } from "react-router-dom";
import "./showings.css";
// import { formatStartDate, formatStartTime } from "../../Helpers";

export default function Showings() {
  const navigate = useNavigate();
  const [showings, setShowings] = useState<Array<Showing>>([]);
  const [filteredShowings, setFilteredShowings] = useState<Array<Showing>>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState("");

  useEffect(() => {
    getShowings()
      .then((res) => {
        setShowings(res);
        setLoading(false);
      })
      .catch(() => setError("Error fetching showings, the server might be down."));
  }, []);

  useEffect(() => {
    if (selectedMovie === "") {
      setFilteredShowings(showings);
    } else {
      const filteredShowings = showings.filter((showing) => showing.movie.title === selectedMovie);
      setFilteredShowings(filteredShowings);
    }
  }, [showings, selectedMovie]);

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
      setError("Error deleting showing, the server might be down.");
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMovie(event.target.value);
  };

  const showingTableRows = filteredShowings.map((showing) => (
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
      <div>
        <label htmlFor="movieFilter">Filter by Movie:</label>
        <select id="movieFilter" value={selectedMovie} onChange={handleFilterChange}>
          <option value="">All Movies</option>
          {/* Add options for each unique movie title */}
          {Array.from(new Set(showings.map((showing) => showing.movie.title))).map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
      </div>
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
      >
        Add Showing
      </button>
    </div>
  );
}