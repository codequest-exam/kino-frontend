import { API_URL } from "../settings";
import { handleHttpErrors, makeOptions } from "../services/fetchUtils";
import { newReservation } from "../pages/SeatReservation";

const CACHE_TIME = 1 * 60 * 1000; // 1 min cache
const MOVIE_URL = API_URL + "/movies";
const SHOWING_URL = API_URL + "/showings";
const USER_URL = API_URL + "/api/user-with-role/users";
const LAST_FETCH = { movies: 0 };

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
  roomNumber: number;
}
interface User {
  username: string;
  email: string;
  roles: string[];
}

let movies: Array<Movie> = [];
let showings: Showing[] = [];
let users: User[] = [];

async function getUsers(): Promise<Array<User>> {
  const options = makeOptions("GET", null, true);
  const res = await fetch(USER_URL, options).then(handleHttpErrors);
  users = res;
  return users;
}
async function editUserRole(username: string, role: string) {
  const options = makeOptions("PATCH", {}, true);
  const res = await fetch(USER_URL + "/add-role/" + username + "/" + role, options).then(handleHttpErrors);
  return res;
}

async function getMovie(id: number): Promise<Movie> {
  return fetch(MOVIE_URL + "/" + id).then(handleHttpErrors);
}

async function getMovies(): Promise<Array<Movie>> {
  if (LAST_FETCH.movies > Date.now() - CACHE_TIME) return [...movies];
  const res = await fetch(MOVIE_URL).then(handleHttpErrors);
  movies = [...res];
  LAST_FETCH.movies = Date.now();

  return res;
}
async function getShowings(): Promise<Array<Showing>> {
  const res = await fetch(SHOWING_URL).then(handleHttpErrors);
  showings = res;
  return showings;
}

async function addReservation(newReservation: newReservation, loggedIn: boolean) {
  const options = makeOptions("POST", newReservation, loggedIn);
  console.log("options", options);

  return await fetch(API_URL + "/reservations", options).then(handleHttpErrors);
}

export type { Movie, Showing, Hall, User };

export { getMovies, getMovie, addReservation, getShowings, getUsers, editUserRole };
