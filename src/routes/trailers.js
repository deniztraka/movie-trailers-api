"use strict";

import express from 'express';
import authMiddleware from '../auth/okta';
import LocalServiceRegistery from '../utils/localServiceRegistry';
import dotenv from 'dotenv';

const router = express.Router();

router.get('/v1/trailers', authMiddleware, async (req, res) => {
    dotenv.config();

    var searchPhrase = req.query.q;
    var localServiceRegistery = new LocalServiceRegistery();

    // movie search service request
    var movieSearchService = localServiceRegistery.get(process.env.MOVIE_SEARCH_SERVICE);
    var movieSearchServiceResponse = await movieSearchService.sendRequest({
        q: searchPhrase
    });
    console.log(movieSearchServiceResponse);

    //video serch service request
    var videoSearchService = localServiceRegistery.get(process.env.VIDEO_SEARCH_SERVICE);
    var videoSearchServiceResponse = await videoSearchService.sendRequest({
        q: searchPhrase,
        part: 'snippet,id',
        maxResults: 25,
        topicId: '/m/02vxn'

    });
    console.log(videoSearchServiceResponse);


    await res.json({
        code: 200,
        msg: "Success",
        records: []
    });
});

export default router;