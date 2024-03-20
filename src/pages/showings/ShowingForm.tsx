import { useState, useEffect } from "react";
import { addShowing, getMovies, getHalls, getCinemas, Movie, Cinema, Hall } from "../../services/apiFacade";

const ShowingForm = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<string>("");
  const [selectedHall, setSelectedHall] = useState<string>("");
  const [filteredHalls, setFilteredHalls] = useState<Hall[]>([]);
  const [selectedCinema, setSelectedCinema] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [is3d, setIs3d] = useState<boolean>(false);
  const [isImax, setIsImax] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData: Movie[] = await getMovies();
        const cinemasData: Cinema[] = await getCinemas();
        const hallsData: Hall[] = await getHalls();
        setFilteredHalls(hallsData.filter((hall) => hall.cinema.id === Number(selectedCinema)));
        setMovies(moviesData);
        setCinemas(cinemasData);
        setHalls(hallsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedCinema, halls]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const movie = movies.find((movie) => movie.id === Number(selectedMovie));
    const hall = halls.find((hall) => hall.roomNumber === Number(selectedHall));
    console.log(hall);

    if (!movie || !hall) {
      setMessage("Please select a movie and a hall");
      return;
    }

    const showing = {
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
    console.log(showing);
    try {
      await addShowing(showing);
      setMessage("Showing added successfully");
    } catch (error) {
      setMessage("Error adding showing");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Add showing</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Movie:
          <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
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
            {filteredHalls.map((hall) => (
              <option key={hall.roomNumber} value={hall.id}>
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
        <br />
        <button type="submit">Add Showing</button>
      </form>
    </div>
  );
};

export default ShowingForm;
