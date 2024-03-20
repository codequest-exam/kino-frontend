import { API_URL } from "../settings";
import { handleHttpErrors, makeOptions } from "../services/fetchUtils";
import { newReservation } from "../pages/SeatReservation";
import { Movie, Showing, Hall, User, Reservation } from "./Interfaces";

const CACHE_TIME = 1 * 60 * 1000; // 1 min cache
const MOVIE_URL = API_URL + "/movies";
const SHOWING_URL = API_URL + "/showings";
const USER_URL = API_URL + "/api/user-with-role";
const LAST_FETCH = { movies: 0 };

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
async function getShowings(): Promise<Array<Showing>> {
  const res = await fetch(SHOWING_URL).then(handleHttpErrors);
  showings = res;
  return showings;
}

async function getShowingsByMovie(id:number) {
  return fetch(SHOWING_URL + "/movie/" + id).then(handleHttpErrors);
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

export type { Movie, Showing, Hall, User, Reservation };

export { getMovies, getMovie, addReservation, getShowings, getUsers, removeUserRole, editUserRole, getReservations, addUser, getShowingsByMovie };
