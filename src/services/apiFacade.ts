import { API_URL } from "../settings";
import { handleHttpErrors, makeOptions } from "../services/fetchUtils";
import { newReservation } from "../pages/SeatReservation";

const CACHE_TIME = 1 * 60 * 1000; // 1 min cache
const MOVIE_URL = API_URL + "/movies";
const SHOWING_URL = API_URL + "/showings";
const USER_URL = API_URL + "/api/user-with-role";
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

let movies: Array<Movie> = [];
let showings: Array<Showing> = [];
let reservations: Array<Reservation> = [];

async function addUser(email: string, username: string, password: string): Promise<User> {
  const options = makeOptions("POST", { email, username, password });
  return fetch(USER_URL, options).then(handleHttpErrors);
}

async function getUsers(): Promise<Array<User>> {
  const options = makeOptions("GET", null, true);
  return fetch(USER_URL + "/users", options).then(handleHttpErrors);
}
async function removeUserRole(userName: string, role: string): Promise<User> {
  const options = makeOptions("PATCH", null, true);
  return fetch(USER_URL + "/remove-role/" + userName + "/" + role, options).then(handleHttpErrors);
}
async function editUserRole(userName: string, role: string): Promise<User> {
  const options = makeOptions("PATCH", null, true);
  return fetch(USER_URL + "/add-role/" + userName + "/" + role, options).then(handleHttpErrors);
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
async function getHalls(): Promise<Array<Hall>> {
  return fetch(API_URL + "/halls").then(handleHttpErrors);
}
async function getCinemas(): Promise<Array<Cinema>> {
  return fetch(API_URL + "/cinemas").then(handleHttpErrors);
}
async function getShowings(): Promise<Array<Showing>> {
  const res = await fetch(SHOWING_URL).then(handleHttpErrors);
  showings = res;
  return showings;
}
async function addShowing(showing: object): Promise<Array<Showing>> {
  const options = makeOptions("POST", showing, true);
  const res = await fetch(SHOWING_URL, options).then(handleHttpErrors);
  showings = res;
  return showings;
}
async function updateShowing(id: number, showing: object): Promise<Array<Showing>> {
  const options = makeOptions("PUT", showing, true);
  const res = await fetch(SHOWING_URL + "/" + id, options).then(handleHttpErrors);
  showings = res;
  return showings;
}
async function deleteShowing(id: number): Promise<number> {
  const options = makeOptions("DELETE", null, true);
  const response = await fetch(SHOWING_URL + "/" + id, options);
  return response.status;
}

async function addReservation(newReservation: newReservation, loggedIn: boolean) {
  const options = makeOptions("POST", newReservation, loggedIn);
  console.log("options", options);

  return await fetch(API_URL + "/reservations", options).then(handleHttpErrors);
}
async function getReservations(): Promise<Array<Reservation>> {
  const options = makeOptions("GET", null, true);
  if (LAST_FETCH.movies > Date.now() - CACHE_TIME) return [...reservations];
  const res = await fetch(API_URL + "/reservations", options).then(handleHttpErrors);
  reservations = [...res];
  return res;
}

export type { Movie, Showing, Hall, User, Reservation, Cinema };

export { getMovies, getMovie, addReservation, getShowings, getUsers, removeUserRole, editUserRole, getReservations, addUser, addShowing, getHalls, getCinemas, updateShowing, deleteShowing };
