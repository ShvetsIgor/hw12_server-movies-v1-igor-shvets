import {MovieService} from "./movieService.ts";
import {Movie} from "../model/movie.ts";
import {movieMongoModel} from "../database/mongooseSchema.ts";

export class MoviesServiceImplMongo implements MovieService{


    get2010MoviesGroupedByImdbRating(): Promise<{ rating: number; titles: string }[]> {

        return Promise.resolve([]);
    }

    getImdbLessThanTomatoesRating(): Promise<Movie[]> {

        return Promise.resolve([]);
    }

    async getMoviesByGenreActionComedy(): Promise<Movie[]> {

        const movies = await movieMongoModel.find({
            genres: {
                $size: 2,
                $all: ["Action", "Comedy"]
            }
        }).lean<Movie[]>().exec();

        return movies;
    }

    async getMoviesByLanguage(): Promise<Movie[]> {

        const movies = await movieMongoModel.find({
            languages: {
                $size: 1,                   //только массив содержит 1 элемент
                $all: ["Russian"]           //среди всех где есть русский
            }
        }).lean<Movie[]>().exec();          //lean - типизирует сразу, без типа Document
        // const movies = await movieMongoModel.find({languages: "English"}).lean<Movie[]>().exec();

        return movies;
    }

    getTitlesOfTwoTopAwardedMovies(): Promise<string[]> {

        return Promise.resolve([]);
    }

}

export const moviesServiceMongo = new MoviesServiceImplMongo()