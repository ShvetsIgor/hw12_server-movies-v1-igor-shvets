import mongoose from "mongoose";
import {Awards, Imdb, Movie, TomatoesInfo} from "../model/movie.ts";

const movieSchema = new mongoose.Schema<Movie>({

    title: {type: String, required: true},
    languages: {type: [String], required: true},
    genres: {type: [String], required: true},
    imdb: {
        rating: {type: Number, required: true}
    },
    tomatoes: {
        viewer: {
            rating: {type: Number, required: true}
        }
    },
    awards: {
        wins: {type: Number, required: true},
        nominations: {type: Number, required: true}
    },
    year: {type: Number, required: true},
    released: {type: Date}
}, {
    collection: 'movies'
});

export const movieMongoModel = mongoose.model<Movie>('Movie', movieSchema);