'use strict'

/**
 * Detailed Search Implementation.
 * 
 * It goes to movie service first with the query strig search phrase
 * Iterates every movies and make calls to the video service to get videos for every movie coming by movie search
 * Caches everything
 * Servers trailers related with the every film that is  gathered for search phrase
 * 
 * ** Implementation is not done yet. **
 */

import BaseSearchStrategy from "./baseSearchStrategy";
import LocalServiceRegistery from '../utils/localServiceRegistry';
import dotenv from 'dotenv';

export default class DetailedSearchStrategy extends BaseSearchStrategy {
    constructor() {
        super();
        dotenv.config();
        this.movies = null;
        this.videos = null;
    }

    /**
     * Gets movies related with given search query
     * Iterates every movie and make calls to video service
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

        for (let i = 0; i < this.movies.length; i++) {
            var movie = this.movies[i];
            var relatedTrailerVideos = await this.getVideos(movie.title + " " + movie.year + " trailer");
            //console.log(relatedTrailerVideos.length + " videos for " + movie.title);
            videos = videos.concat(relatedTrailerVideos);
        }

        console.log(videos.length + " videos in total for " + q + " search term");
        return videos;
    }

    /**
     * Filters given list to have better results
     * @param {Object[]} records videos found on video service
     * @return {Object[]} filtered records
     */
    filterRecords(records) {
        if (records == null || records.length == 0) {
            return [];
        }

        var filteredRecords = records.filter(record => {
            var lowerCaseTitle = record.title.toLowerCase();

            // get only videos that has 'trailer' or 'teaser' in the video title
            return lowerCaseTitle.indexOf("trailer") > -1 || lowerCaseTitle.indexOf("teaser") > -1
        });

        return filteredRecords;
    }

    /**
     * Fetches movies from movie service configured
     * @param {string} q search phrase
     * @returns {Object[]}
     */
    async getMovies(q) {
        var localServiceRegistery = new LocalServiceRegistery();
        var movieSearchService = localServiceRegistery.get(process.env.MOVIE_SEARCH_SERVICE);

        // movie search request
        var movieSearchServiceResponse = await movieSearchService.sendRequest({
            q: q
        });

        return movieSearchServiceResponse;
    }

    /**
     * Fetches videos from video service configured
     * @param {string} q search phrase
     * @returns {Object[]}
     */
    async getVideos(q) {
        var localServiceRegistery = new LocalServiceRegistery();
        var videoSearchService = localServiceRegistery.get(process.env.VIDEO_SEARCH_SERVICE);

        //video serch service request
        var videoSearchServiceResponse = await videoSearchService.sendRequest({
            q: q,
            part: 'snippet,id',
            maxResults: 25,
            topicId: '/m/02vxn',
            type: 'video',
            videoDuration: 'short',
            videoEmbeddable: true,
            videoSyndicated: true
        });

        return videoSearchServiceResponse;
    }
}