'use strict'

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