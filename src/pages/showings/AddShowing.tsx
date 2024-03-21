import { useState, useEffect } from "react";
import { addShowing, getMovies, getHalls, getCinemas, updateShowing } from "../../services/apiFacade";
import { Movie, Cinema, Hall } from "../../services/Interfaces";
// import { addShowing, getMovies, getHalls, getCinemas, Movie, Cinema, Hall, updateShowing } from "../../services/apiFacade";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ShowingForm = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<string | undefined>(undefined);
  const [selectedCinema, setSelectedCinema] = useState<string | undefined>(undefined);
  const [selectedHall, setSelectedHall] = useState<string | undefined>(undefined);
  const [filteredHalls, setFilteredHalls] = useState<Hall[]>([]);
  const [startTime, setStartTime] = useState<string>("");
  const [is3d, setIs3d] = useState<boolean>(false);
  const [isImax, setIsImax] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const location = useLocation();
  const showing = location.state?.showing;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData: Movie[] = await getMovies();
        const cinemasData: Cinema[] = await getCinemas();
        const hallsData: Hall[] = await getHalls();
        setMovies(moviesData);
        setCinemas(cinemasData);
        setHalls(hallsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (showing) {
      setSelectedMovie(showing.movie.id.toString());
      setSelectedHall(showing.hall.roomNumber.toString());
      setSelectedCinema(showing.hall.cinema.id.toString());
      setStartTime(showing.startTime);
      setIs3d(showing.is3d);
      setIsImax(showing.isImax);
    }
    if (selectedCinema) {
      const filtered = halls.filter((hall) => hall.cinema.id.toString() === selectedCinema);
      setFilteredHalls(filtered);
    }
  }, [selectedCinema, halls, showing]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const movie = movies.find((movie) => movie.id === Number(selectedMovie));
    const hall = halls.find((hall) => hall.roomNumber === Number(selectedHall));

    if (!movie || !hall) {
      setMessage("Please select a movie and a hall");
      return;
    }

    const showingData = {
      movie,
      hall: {
        ...hall,
        id: hall.id,
        cinema: {
          id: hall.cinema.id,
        },
      },
      startTime,
      is3d,
      isImax,
    };

    try {
      if (showing) {
        await updateShowing(showing.id, showingData);
        setMessage("Showing updated successfully");
        navigate("/showings");
      } else {
        await addShowing(showingData);
        setMessage("Showing added successfully");
      }
      setSelectedMovie("");
      setSelectedHall("");
      setSelectedCinema("");
      setStartTime("");
      setIs3d(false);
      setIsImax(false);
    } catch (error) {
      setMessage("Error adding/updating showing");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>{showing ? "Edit Showing" : "Add Showing"}</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Movie:
          <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
            <option value="">Select movie</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Cinema:
          <select value={selectedCinema} onChange={(e) => setSelectedCinema(e.target.value)}>
            <option value="">Select cinema</option>
            {cinemas.map((cinema) => (
              <option key={cinema.id} value={cinema.id}>
                {cinema.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Hall:
          <select value={selectedHall} onChange={(e) => setSelectedHall(e.target.value)}>
            <option value="">Select hall</option>
            {filteredHalls.map((hall) => (
              <option key={hall.roomNumber} value={hall.roomNumber}>
                {hall.roomNumber}
              </option>
            ))}
          </select>
        </label>
        <label>
          Showing time: <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        </label>
        <label>
          3D: <input type="checkbox" checked={is3d} onChange={() => setIs3d(!is3d)} />
        </label>
        <label>
          IMAX: <input type="checkbox" checked={isImax} onChange={() => setIsImax(!isImax)} />
        </label>
        <button type="submit">{showing ? "Update Showing" : "Add Showing"}</button>
      </form>
    </div>
  );
};

export default ShowingForm;
