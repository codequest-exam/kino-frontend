// import { API_URL } from "../settings";
import { handleHttpErrors } from "../services/fetchUtils";

const CACHE_TIME = 1 * 60 * 1000; // 1 min cache
// const MOVIE_URL = API_URL + "/movies";
const LAST_FETCH = { movies: 0 };
const LOCAL_HOST_URL = "http://localhost:8095/";

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

let movies: Array<Movie> = [];


async function getMovie(id: number): Promise<Movie> {
    return fetch(LOCAL_HOST_URL + "movie" + "/" + id).then(handleHttpErrors);
}

async function getMovies(): Promise<Array<Movie>> {
  if (LAST_FETCH.movies > Date.now() - CACHE_TIME) return [...movies];
  const res = await fetch(LOCAL_HOST_URL + "movies").then(handleHttpErrors);
  movies = [...res];
  LAST_FETCH.movies = Date.now();
  console.log("movies", movies);

  return res;
}

export type { Movie };

export { getMovies, getMovie };
