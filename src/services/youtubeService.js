"use strict";

import HttpService from './httpservice';
import dotenv from 'dotenv';
import {
    YoutubeVideoMapper
} from '../mappers/youtubeVideoMapper';

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

    async sendRequest(qs) {
        var cacheKey = qs.q.replace(/ /g, '').toLowerCase();

        var cachedData = await this.getCache(cacheKey);
        if (cachedData == null) {
            //console.log("going to youtube service");
            var response = await super.sendRequest(qs);
            var records = [];
            response.items.forEach(youtubeVideo => {
                records.push(YoutubeVideoMapper.map(youtubeVideo));
            });
            this.setCache(cacheKey, records, 3600);
            return await records;
        }

        return cachedData;
    }
}