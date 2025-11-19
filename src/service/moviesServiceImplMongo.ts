import {MovieService} from "./movieService.ts";
import {Movie} from "../model/movie.ts";
import {movieMongoModel} from "../database/mongooseSchema.ts";

export class MoviesServiceImplMongo implements MovieService{


    async get2010MoviesGroupedByImdbRating(): Promise<{ rating: number; titles: string }[]> {

        const movies = await movieMongoModel.aggregate([
            {
                $match: { year: 2010 }
            },
            {
                $match: { "imdb.rating": { $nin: ["", null ] } }
            },
            {
                $group:
                    {
                        _id: "$imdb.rating",
                        titles: { $push: "$title" }
                    }
            },
            {
                $sort: {_id: -1}
            },
            {
                $project: {
                    _id: 0,
                    rating: "$_id",
                    titles: "$titles"
                }
            }
        ])

        return movies;
    }

    async getImdbLessThanTomatoesRating(): Promise<Movie[]> {

        // const movies = await movieMongoModel.find({
        //     $expr: {
        //         $lt: ["$imdb.rating", "$tomatoes.viewer.rating"]
        //     }
        // }).select({
        //     "title": 1,
        //     "imdb.rating": 1,
        //     "tomatoes.viewer.rating": 1,
        //     "year": 1,
        //     "_id": 0}).exec();

        const movies = await movieMongoModel.aggregate([
            { $match: {
                "imdb.rating": { $ne: null},
                "tomatoes.viewer.rating": { $ne: null },
                $expr: {
                    $lt: ["$imdb.rating", "$tomatoes.viewer.rating"]
                }}},
            { $project: {
                _id: 0,
                title: 1,
                imdb: "$imdb.rating",
                tomatoes: "$tomatoes.viewer.rating",
                year: 1
                }}]).exec();

        return movies;
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
        }).lean<Movie[]>().exec();          //lean - типизирует сразу

        return movies;
    }

    async getTitlesOfTwoTopAwardedMovies(): Promise<string[]> {

        const movies = await movieMongoModel.find({
            "awards.wins": { $ne: null }
        }).sort({ "awards.wins": -1}).limit(2).select("title").lean<Movie[]>().exec();

        return movies.map(m => m.title);
    }

}

export const moviesServiceMongo = new MoviesServiceImplMongo()