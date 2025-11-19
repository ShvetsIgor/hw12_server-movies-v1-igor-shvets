import express from "express";
import {moviesController} from "../controller/moviesController.ts";

export const moviesRouter = express.Router();

moviesRouter.get('/russian', moviesController.getMoviesByLanguage);
moviesRouter.get('/byGenres', moviesController.getMoviesByGenreActionComedy);
moviesRouter.get('/imdb-tomatoes', moviesController.getMoviesByImdbLessThanTomatoesRating);
moviesRouter.get('/2010-imdb', moviesController.getMovies2010MoviesGroupedByImdbRating);
moviesRouter.get('/two-top-awards', moviesController.getTitlesOfTwoTopAwardedMovies);
