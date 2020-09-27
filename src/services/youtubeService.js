"use strict";

import HttpService from './httpservice';
import dotenv from 'dotenv';
import {
    YoutubeVideoMapper
} from '../mappers/youtubeVideoMapper';

/**
 * Youtube Video Service
 */

export default class YoutubeService extends HttpService {
    constructor() {
        dotenv.config();

        super({
            uri: encodeURI('https://' + process.env.YOUTUBE_API_HOST + '/youtube/v3/search'),
            json: true,
            method: 'GET',
            qs: {
                key: process.env.YOUTUBE_API_KEY
            }
        }, true, 'youtube_videos_', 3600);
    }

    /**
     * Makes async service call to the youtube data api
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

            // going to youtube service since there is no cached data if we are here
            var response = await super.sendRequest(qs);
            var records = [];
            response.items.forEach(youtubeVideo => {
                // map results to our domain model
                records.push(YoutubeVideoMapper.map(youtubeVideo));
            });
            
            // set data to cache
            this.setCache(cacheKey, records, 3600);
            return await records;
        }

        return cachedData;
    }
}