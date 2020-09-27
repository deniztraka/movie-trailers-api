"use strict";
/**
 * Trailers Endpoint for API
 * Version: v1
 */
import express from 'express';
import dotenv from 'dotenv';
import LocalServiceRegistry from '../utils/localServiceRegistry';
import authMiddleware from '../middlewares/auth';
import inputValidationMiddleware from '../middlewares/inputValidationMiddleware';

const router = express.Router();
// first check for if the input given is correct
// then check auth
router.get('/api/v1/trailers', inputValidationMiddleware, authMiddleware, async (req, res) => {
    dotenv.config();

    // get search phrase
    var searchPhrase = req.query.q;

    // building the service
    var localServiceRegistery = new LocalServiceRegistry();
    var videoSearchService = localServiceRegistery.get(process.env.VIDEO_SEARCH_SERVICE);

    // search request to video data service
    var records = await videoSearchService.sendRequest({
        q: searchPhrase,
        part: 'snippet,id',
        maxResults: 25, //there is no paging implemented for now
        topicId: '/m/02vxn', // topic Movies
        type: 'video',
        videoDuration: 'short', //get only videos at max 4min duration
        videoEmbeddable: true,
        videoSyndicated: true
    });

    //set response
    res.json({
        status: 200,
        msg: "Success",
        records: records
    });
});

export default router;