"use strict";

import HttpService from '../services/httpservice';
import dotenv from 'dotenv';


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
        var cachedData = await this.getCache(qs.q);
        if (cachedData == null) {
            var response = await super.sendRequest(qs);
            //get rid of unwanted results
            var clearResults = this.clearResults(response);
            this.setCahce(qs.q, 60, clearResults);
            return await clearResults;
        }
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