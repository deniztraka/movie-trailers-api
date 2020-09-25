"use strict";

import HttpService from '../services/httpservice';
import dotenv from 'dotenv';
import { ImdbMovieMapper } from '../mappers/imdbMovieMapper';

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
        }, 'imdb_movies_', 3600);
    }

    async sendRequest(qs) {
        var cacheKey = qs.q.replace(/ /g,'').toLowerCase();

        var cachedData = await this.getCache(cacheKey);
        if (cachedData == null) {
            //console.log("going to imdb service");
            var response = await super.sendRequest(qs);
            console.log(response.results.length + ' movies found for search term ' + qs.q + ' from imdb service');
            //get rid of unwanted results
            var clearResults = this.clearResults(response);
            var records = [];
            clearResults.forEach(movie => {
                records.push(ImdbMovieMapper.map(movie));
            });

            this.setCache(cacheKey, records, 3600);
            return await records;
        }

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