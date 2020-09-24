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
        });
    }
}