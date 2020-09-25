'use strict'

import DetailedSearchStrategy from "./detailedSearchStrategy";
import LocalServiceRegistery from '../utils/localServiceRegistry';
import dotenv from 'dotenv';
/**
 * Tried for parallely sending related VİDEO search request for each movie to video search api
 * It ended up with quata limit per second for basic plan.
 * This should not be used unless you have extended your quota limits for your video search api
 */
export default class DetailedSearchStrategyParallel extends DetailedSearchStrategy {
    constructor() {
        super();
        dotenv.config();
        this.movies = null;
        this.videos = null;
    }

    async process(q) {
        // get related movies with the search term
        this.movies = await this.getMovies(q);

        // if there is no movie from movie service, no need to search for anything        
        if (this.movies == null && this.movies.length == 0) {
            return [];
        }

        // search for videos from video service for each movie and hold them in a list
        var videos = [];

        const getAndPushPromises = [];

        const getAndPushRelatedVideos = async movie => {
            var relatedTrailerVideos = await this.getVideos(movie.title + " " + movie.year + " trailer");
            videos = videos.concat(relatedTrailerVideos);
            console.log(relatedTrailerVideos.length + " videos for " + movie.title);
        };

        this.movies.forEach(movie => {
            getAndPushPromises.push(getAndPushRelatedVideos(movie));
        });

        await Promise.all(getAndPushPromises);
    }
}