'use strict'
/**
 * IMDB Mobie Mapper
 * Responsible for mapping imdb movie model to our domain model.
 */
import MovieModel from "../models/movieModel";

export const ImdbMovieMapper = {
    map(imdbMovie) {
        var movieModel = new MovieModel();
        movieModel.id = imdbMovie.id;
        movieModel.title = imdbMovie.title;
        movieModel.year = imdbMovie.year;
        movieModel.imageUrl = imdbMovie.image ? imdbMovie.image.url : "";
        return movieModel;
    }
};