
interface Movie {
    id: number;
    title: string;
    year: string;
    rated: string;
    runtime: string;
    genre: string;
    director: string;
    writer: string;
    actors: string;
    metascore: string;
    imdbRating: string;
    imdbVotes: string;
    website: string;
    response: string;
    plot: string;
    poster: string;
    imdbID: string;
  }
  
  interface Showing {
    id: number;
    movie: Movie;
    hall: Hall;
    startTime: string;
    moviePrice: number;
    isImax: boolean;
    is3d: boolean;
  }
  
  interface Hall {
    id: number;
    cinema: Cinema;
    roomNumber: number;
  }
  interface User {
    userName: string;
    email: string;
    roleNames: string[];
    password: string;
  }
  
  interface Cinema {
    id: number;
    name: string;
    address: string;
  }
  
  interface Seat {
    id: number;
    seatNumber: number;
    seatRowNumber: number;
  }
  
  interface Reservation {
    id: number;
    showing: Showing;
    hall: Hall;
    movie: Movie;
    date: string;
    time: string;
    reservedSeats: Seat[];
    price: number;
    email: string;
  }

  export type { Movie, Showing, Hall, User, Reservation };