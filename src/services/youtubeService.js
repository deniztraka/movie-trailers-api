"use strict";

import HttpService from './httpservice';
import dotenv from 'dotenv';


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
        }, 'youtube_videos_', 3600);
    }
};