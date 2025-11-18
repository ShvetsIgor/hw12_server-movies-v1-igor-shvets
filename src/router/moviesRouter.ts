import express from "express";
import {moviesController} from "../controller/moviesController.ts";

export const moviesRouter = express.Router();

// moviesRouter.get('/imdb-less-than-tomatos', moviesController.getImdbLessThanTomatos);
moviesRouter.get('/russian', moviesController.getMoviesByLanguage);
moviesRouter.get('/byGenres', moviesController.getMoviesByGenreActionComedy);