import {Movie} from "../model/movie.ts";


export interface MovieService {
    getImdbLessThanTomatoesRating(): Promise<Movie[]>;
    getMoviesByLanguage(): Promise<Movie[]>;
    getMoviesByGenreActionComedy(): Promise<Movie[]>;
    getTitlesOfTwoTopAwardedMovies(): Promise<string[]>;
    get2010MoviesGroupedByImdbRating(): Promise<{ rating: number; titles: string}[]>;
}
