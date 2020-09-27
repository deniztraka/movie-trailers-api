"use strict";

/**
 * Imdb Movie Service
 */

import HttpService from '../services/httpservice';
import dotenv from 'dotenv';
import {
    ImdbMovieMapper
} from '../mappers/imdbMovieMapper';

export default class IMDbService extends HttpService {
    constructor() {
        dotenv.config();
        super({
            uri: encodeURI('https://' + process.env.IMDB_API_HOST + '/title/find'),
            json: true,
            method: 'GET',
            headers: {
                "x-rapidapi-host": process.env.IMDB_API_HOST,
                "x-rapidapi-key": process.env.IMDB_API_KEY,
                "useQueryString": true
            }
        }, true, 'imdb_movies_', 3600);
    }

     /**
     * Makes async service call to the imdb
     * Overrides base method
     * @param {string} qs query string oject
     * @returns {Object} service response
     */
    async sendRequest(qs) {
        // prepares cache key
        var cacheKey = qs.q.replace(/ /g, '').toLowerCase();

        //checks if we have cached data
        var cachedData = await this.getCache(cacheKey);
        if (cachedData == null) {

            // going to imdb service since there is no cached data if we are here
            var response = await super.sendRequest(qs);
            console.log(response.results.length + ' movies found for search term ' + qs.q + ' from imdb service');

            //getting rid of unwanted results
            var clearResults = this.clearResults(response);
            var records = [];
            clearResults.forEach(movie => {
                // map results to our domain model
                records.push(ImdbMovieMapper.map(movie));
            });

            // set data to cache
            this.setCache(cacheKey, records, 3600);                        
            return await records;
        }

        //return cachedData
        return cachedData;
    }

    clearResults(response) {
        if (response == null) {
            return;
        }

        //base requirement for any movie on imdb
        var records = response.results.filter(record => {
            return record.titleType === 'movie' && record.year;
        });

        return records;
    }
}