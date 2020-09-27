'use strict'
/**
 * This class does the same thing but it sends video search request to video service.
 * It is blocked by maximum calls per second quota limit on Youtube for now.
 * 
 * ** Don't use it yet! (Especially if you are using free plan.)
 * It should be improved further or replaced with another solution.
 * 
 */
import DetailedSearchStrategy from "./detailedSearchStrategy";
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

    /**
     * Gets movies related with given search query
     * Iterates every movie and make calls to video service in parallell
     * caches every video related with movie
     * returns videos found from video service
     * 
     * @param {string} q search query
     */
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