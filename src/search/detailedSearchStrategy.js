'use strict'

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

    filterRecords(records){
        if(records == null || records.length == 0){
            return [];
        }        

         var filteredRecords = records.filter(record => {
            var lowerCaseTitle = record.title.toLowerCase();

            if(lowerCaseTitle.indexOf("trailer") > -1 ){
                return true;
            }

            if(lowerCaseTitle.indexOf("teaser") > -1 ){
                return true;
            }

        });


        return filteredRecords;
    }

    async getMovies(q) {
        var localServiceRegistery = new LocalServiceRegistery();
        var movieSearchService = localServiceRegistery.get(process.env.MOVIE_SEARCH_SERVICE);

        // movie search request
        var movieSearchServiceResponse = await movieSearchService.sendRequest({
            q: q
        });

        return movieSearchServiceResponse;
    }

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