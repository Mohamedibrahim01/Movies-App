import type { Movie } from "../Pages/MovieDetails";

let movies: Movie[] = [];

export function setMovies(data: Movie[]) {
  movies = data;
}

export function getMovies(): Movie[] {
  return movies;
}
