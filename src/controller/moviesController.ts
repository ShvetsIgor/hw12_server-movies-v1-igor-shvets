import {MovieService} from "../service/movieService.ts";
import {moviesServiceMongo} from "../service/moviesServiceImplMongo.ts";
import {Movie} from "../model/movie.ts";
import {Request, Response} from "express";


export class MoviesController {

    private service: MovieService = moviesServiceMongo;

    getMoviesByLanguage = async (req: Request, res: Response) => {

        const movies: Movie[] = await this.service.getMoviesByLanguage();
        res.status(200).json(movies);
    }

    getMoviesByGenreActionComedy = async (req: Request, res: Response) => {

        const movies: Movie[] = await this.service.getMoviesByGenreActionComedy();
        res.status(200).json(movies);

    }

    getMoviesByImdbLessThanTomatoesRating = async (req: Request, res: Response) => {

    const movies: Movie[] = await this.service.getImdbLessThanTomatoesRating();
    res.status(200).json(movies);
    }

    getMovies2010MoviesGroupedByImdbRating = async (req: Request, res: Response) => {
        const movies = await this.service.get2010MoviesGroupedByImdbRating();
        res.status(200).json(movies);
    }

    getTitlesOfTwoTopAwardedMovies = async (req: Request, res: Response) => {
        const titles = await this.service.getTitlesOfTwoTopAwardedMovies();
        res.status(200).json(titles);
    }

}

export const moviesController = new MoviesController();